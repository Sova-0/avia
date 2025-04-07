import { debounce } from 'lodash';

const initialState = {
  sortType: 'САМЫЙ ДЕШЕВЫЙ',
  transfers: {
    all: false,
    'no-transfers': false,
    'one-transfers': false,
    'two-transfers': false,
    'three-transfers': false,
  },
  tickets: [],
  filteredTickets: [],
  loading: false,
  visibleTickets: 5,
};

function ticketsReducer(state = initialState, action) {
  switch (action.type) {
    case 'SET_SORT_TYPE':
      return { ...state, sortType: action.payload, visibleTickets: 5 };
    case 'TOGGLE_TRANSFERS_OPRION': {
      const updeteTransfers = {
        ...state.transfers,
        [action.payload]: !state.transfers[action.payload],
      };
      if (action.payload === 'all') {
        const filtredTransfers = Object.entries(updeteTransfers).filter(
          ([key]) => key !== 'all'
        );
        const setTo = updeteTransfers.all;

        const newTransfers = filtredTransfers.reduce((acc, [key]) => {
          acc[key] = setTo;
          return acc;
        }, {});
        return {
          ...state,
          transfers: { ...newTransfers, all: setTo },
          visibleTickets: 5,
        };
      }

      const allChecked = checkedAllTransfers(updeteTransfers);
      return {
        ...state,
        transfers: { ...updeteTransfers, all: allChecked },
        visibleTickets: 5,
      };
    }
    case 'SET_SEARCH_ID':
      return { ...state, searchId: action.payload };
    case 'ADD_TICKETS':
      return { ...state, tickets: [...state.tickets, ...action.payload] };
    case 'SET_FILTERED_TICKETS': {
      return { ...state, filteredTickets: action.payload, visibleTickets: 5 };
    }
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_VISIBLE_TICKETS':
      return { ...state, visibleTickets: state.visibleTickets + 5 };
    default:
      return state;
  }
}

// ЕСЛИ ВСЕ ГАЛКИ СТОЯТ ТО ALL: TRUE
function checkedAllTransfers(transfers) {
  const filtredTransfers = Object.entries(transfers).filter(
    ([key]) => key !== 'all'
  );
  return filtredTransfers.every(([key, value]) => value === true);
}

const apiBase = 'https://aviasales-test-api.kata.academy';
const fetchOptions = {
  method: 'GET',
  headers: {
    accept: 'application/json',
  },
};
// ЗАПРОС НА ПОЛУЧЕНИЕ ID И ПЕРЕДАЧА В РЕДУКТОР
const fetchSearchId = () => async (dispatch) => {
  const result = await fetch(`${apiBase}/search`, fetchOptions);
  const data = await result.json();
  console.log('SEARCH ID', data.searchId);

  dispatch({
    type: 'SET_SEARCH_ID',
    payload: data.searchId,
  });
};
// ЗАПРОС НА ПОЛУЧЕНИЕ БИЛЕТОВ И отправка в РЕДУКТОР
const fetchTickets = () => async (dispatch, getState) => {
  const searchId = getState().tickets.searchId;

  let stop = false;
  while (!stop) {
    try {
      const result = await fetch(`${apiBase}/tickets?searchId=${searchId}`);
      if (!result.ok) {
        if (result.status === 500) {
          console.warn('ошибка 500, повтор запроса...');
          continue;
        }
        throw new Error(`HTTP error, status: ${result.status}`);
      }
      const data = await result.json();

      dispatch({
        type: 'ADD_TICKETS',
        payload: data.tickets,
      });
      stop = data.stop;
    } catch (error) {
      console.warn('Ошибка при получении билетов:', error.message);
      continue;
    }
  }
};

// ДЕЛАЮ СОРТИРОВКУ ПО КНОПКАМ
const sortTicketsButton = (tickets, sortType) => {
  if (sortType === 'САМЫЙ ДЕШЕВЫЙ') {
    return [...tickets].sort((a, b) => a.price - b.price);
  } else if (sortType === 'САМЫЙ БЫСТРЫЙ') {
    return [...tickets].sort(
      (a, b) =>
        a.segments[0].duration +
        a.segments[1].duration -
        (b.segments[0].duration + b.segments[1].duration)
    );
  }
  return [...tickets].sort((a, b) => {
    const aDuration = a.segments[0].duration + a.segments[1].duration;
    const bDuration = b.segments[0].duration + b.segments[1].duration;
    const aSroce = a.price + aDuration * 10;
    const bSrcoe = b.price + bDuration * 10;
    return aSroce - bSrcoe;
  });
};

// ДЕЛАЮ СОРТИРОВКУ СНАЧАЛА ПО CHECKBOX А ПОТОМ ПО КНОПКАМ
let debouncedFn = null;
const setFiltredTickets = () => async (dispatch, getState) => {
  dispatch({
    type: 'SET_LOADING',
    payload: true,
  });
  if (!debouncedFn) {
    debouncedFn = debounce((dispatch, getState) => {
      const { tickets, transfers, sortType } = getState().tickets;
      const filtered = filteredTransfers(tickets, transfers);
      const sorted = sortTicketsButton(filtered, sortType);

      dispatch({
        type: 'SET_FILTERED_TICKETS',
        payload: sorted,
      });

      dispatch({
        type: 'SET_LOADING',
        payload: false,
      });
    }, 500);
  }
  debouncedFn(dispatch, getState);
};

// ПЕРЕКЛЮЧЕНИЕ КНОПОК САМЫЙ БЫСТРЫЙ, ДЕШЁВЫЙ, ОПТИМАЛЬНЫЙ
const setSortType = (sortType) => (dispatch) => {
  dispatch({
    type: 'SET_SORT_TYPE',
    payload: sortType,
  });
  dispatch(setFiltredTickets());
};

const filteredTransfers = (tickets, transfers) => {
  const filterArray = [];
  if (transfers['no-transfers']) {
    filterArray.push(0);
  }
  if (transfers['one-transfers']) {
    filterArray.push(1);
  }
  if (transfers['two-transfers']) {
    filterArray.push(2);
  }
  if (transfers['three-transfers']) {
    filterArray.push(3);
  }
  if (filterArray.length === 0) return [];

  return tickets.filter((ticket) => {
    const stopsTo = ticket.segments[0].stops.length;
    const stopsFrom = ticket.segments[1].stops.length;
    return filterArray.includes(stopsTo) && filterArray.includes(stopsFrom);
  });
};

// ПЕРЕКЛЮЧЕНИЕ МЕЖДУ CHECKBOX
const toggleTransfersOption = (optionId) => (dispatch) => {
  dispatch({
    type: 'TOGGLE_TRANSFERS_OPRION',
    payload: optionId,
  });
  dispatch(setFiltredTickets());
};

const setVisibleTickets = () => (dispatch) => {
  dispatch({
    type: 'SET_VISIBLE_TICKETS',
  });
};

export {
  setSortType,
  toggleTransfersOption,
  fetchSearchId,
  fetchTickets,
  setVisibleTickets,
};
export default ticketsReducer;
