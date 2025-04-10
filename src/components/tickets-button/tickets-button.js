import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSortType } from '../../store/ticketsReducer';
import style from './tickets-button.module.scss';

function TicketsButton() {
  const dispatch = useDispatch();
  const sortType = useSelector((state) => state.tickets.sortType);
  return (
    <div className={style['tickets-button']}>
      <button
        className={`${style['button-cheap']} ${sortType === 'САМЫЙ ДЕШЕВЫЙ' ? style.active : ''}`}
        onClick={() => dispatch(setSortType('САМЫЙ ДЕШЕВЫЙ'))}
      >
        САМЫЙ ДЕШЕВЫЙ
      </button>
      <button
        className={`${style['button-fast']} ${sortType === 'САМЫЙ БЫСТРЫЙ' ? style.active : ''}`}
        onClick={() => dispatch(setSortType('САМЫЙ БЫСТРЫЙ'))}
      >
        САМЫЙ БЫСТРЫЙ
      </button>
      <button
        className={`${style['button-optimal']} ${sortType === 'ОПТИМАЛЬНЫЙ' ? style.active : ''}`}
        onClick={() => dispatch(setSortType('ОПТИМАЛЬНЫЙ'))}
      >
        ОПТИМАЛЬНЫЙ
      </button>
    </div>
  );
}

export default TicketsButton;
