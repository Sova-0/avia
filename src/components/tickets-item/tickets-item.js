import React from 'react';
import { format, add } from 'date-fns';
import style from './tickets-item.module.scss';

function TicketsItem({ ticket }) {
  const { price, carrier, segments } = ticket;

  //КАРТИНКА
  const urlImg = `https://pics.avs.io/99/36/${carrier}.png`;

  // КОЛ-ВО ОСТАНОВОК
  const stopsTo = segments[0]?.stops || [];
  const stopsFrom = segments[1]?.stops || [];

  // ПЕРЕВОД ВРЕМЕНИ В ЧАСЫ И МИНУТЫ
  const durationTo = segments[0].duration;
  const durationFrom = segments[1].duration;
  const getDuration = (duration) => {
    const hours = Math.floor(duration / 60);
    const minutes = duration % 60;
    return `${hours}ч ${minutes}м`;
  };

  // ВРЕМЯ ВЫЛЕТА И ПРИЛЁТА
  const countDepactureAndArrivalTime = (countArray) => {
    const depactureDate = new Date(segments[countArray].date);
    const arrivalDate = add(depactureDate, {
      minutes: segments[countArray].duration,
    });
    const timeFormatDepacture = format(depactureDate, 'HH:mm');
    const timeFormatArrival = format(arrivalDate, 'HH:mm');
    return `${timeFormatDepacture} - ${timeFormatArrival}`;
  };
  return (
    <div className={style['ticket-list']}>
      <div className={style['ticket-list-header']}>
        <div className={style['ticket-list-header-price']}>{price} Р</div>
        <div className={style['ticket-list-header-logo']}>
          <img src={urlImg} alt="AVIA" />
        </div>
      </div>
      <div className={style['ticket-list-ToFrom']}>
        <div className={style['ticket-list-to']}>
          <div className={style['ticket-list-cities']}>
            <div className={style['ticket-list-cities-name']}>
              {segments[0].origin} – {segments[0].destination}
            </div>
            <div className={style['ticket-list-cities-time']}>
              {countDepactureAndArrivalTime(0)}
            </div>
          </div>
          <div className={style['ticket-list-way']}>
            <div className={style['ticket-list-way-name']}>В ПУТИ</div>
            <div className={style['ticket-list-way-time']}>
              {getDuration(durationTo)}
            </div>
          </div>
          <div className={style['ticket-list-transfer']}>
            <div className={style['ticket-list-transfer-count']}>
              {stopsTo.length} ПЕРЕСАДКИ
            </div>
            <div className={style['ticket-list-transfer-name']}>
              {stopsTo.join(', ')}
            </div>
          </div>
        </div>
        <div className={style['ticket-list-from']}>
          <div className={style['ticket-list-cities']}>
            <div className={style['ticket-list-cities-name']}>
              {segments[1].origin} – {segments[1].destination}
            </div>
            <div className={style['ticket-list-cities-time']}>
              {countDepactureAndArrivalTime(1)}
            </div>
          </div>
          <div className={style['ticket-list-way']}>
            <div className={style['ticket-list-way-name']}>В ПУТИ</div>
            <div className={style['ticket-list-way-time']}>
              {getDuration(durationFrom)}
            </div>
          </div>
          <div className={style['ticket-list-transfer']}>
            <div className={style['ticket-list-transfer-count']}>
              {stopsFrom.length} ПЕРЕСАДКИ
            </div>
            <div className={style['ticket-list-transfer-name']}>
              {stopsFrom.join(', ')}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TicketsItem;
