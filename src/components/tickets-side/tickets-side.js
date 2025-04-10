import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import TicketsButton from '../tickets-button/tickets-button';
import TicketsItem from '../tickets-item/tickets-item';
import ShowMore from '../show-more/show-more';
import style from './tickets-side.module.scss';
import Loader from '../loader/loader';
import { setVisibleTickets } from '../../store/ticketsReducer';

function TicketsSide() {
  const dispatch = useDispatch();
  const ticketsData = useSelector((state) => state.tickets.filteredTickets);
  const loading = useSelector((state) => state.tickets.loading);
  const tickets = useSelector((state) => state.tickets.tickets);
  const visibleTickets = useSelector((state) => state.tickets.visibleTickets);
  const firstFiveTickets = ticketsData.slice(0, visibleTickets);
  const handleShowMore = () => {
    dispatch(setVisibleTickets());
  };
  console.log('FIRST FIVE TICKETS:', firstFiveTickets);
  return (
    <div className={style['tickets-side']}>
      <TicketsButton />
      {loading ? (
        <div className={style.loader}>
          <Loader />
        </div>
      ) : (
        <div className={style['tickets-list']}>
          {ticketsData.length === 0 && tickets.length > 0 ? (
            <div className={style['no-results']}>
              Рейсов, подходящих под заданные фильтры, не найдено
            </div>
          ) : (
            firstFiveTickets.map((ticket) => (
              <TicketsItem key={ticket.id} ticket={ticket} />
            ))
          )}
        </div>
      )}
      <ShowMore moreTickets={handleShowMore} />
    </div>
  );
}

export default TicketsSide;
