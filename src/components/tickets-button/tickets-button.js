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
        className={style['button-cheap']}
        onClick={() => dispatch(setSortType('САМЫЙ ДЕШЕВЫЙ'))}
        style={{
          backgroundColor: sortType === 'САМЫЙ ДЕШЕВЫЙ' ? '#2196F3' : '#FFFFFF',
          color: sortType === 'САМЫЙ ДЕШЕВЫЙ' ? '#FFFFFF' : '#4A4A4A',
        }}
      >
        САМЫЙ ДЕШЕВЫЙ
      </button>
      <button
        className={style['button-fast']}
        onClick={() => dispatch(setSortType('САМЫЙ БЫСТРЫЙ'))}
        style={{
          backgroundColor: sortType === 'САМЫЙ БЫСТРЫЙ' ? '#2196F3' : '#FFFFFF',
          color: sortType === 'САМЫЙ БЫСТРЫЙ' ? '#FFFFFF' : '#4A4A4A',
        }}
      >
        САМЫЙ БЫСТРЫЙ
      </button>
      <button
        className={style['button-optimal']}
        onClick={() => dispatch(setSortType('ОПТИМАЛЬНЫЙ'))}
        style={{
          backgroundColor: sortType === 'ОПТИМАЛЬНЫЙ' ? '#2196F3' : '#FFFFFF',
          color: sortType === 'ОПТИМАЛЬНЫЙ' ? '#FFFFFF' : '#4A4A4A',
        }}
      >
        ОПТИМАЛЬНЫЙ
      </button>
    </div>
  );
}

export default TicketsButton;
