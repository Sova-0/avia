import React from 'react';
import style from './show-more.module.scss';

function ShowMore({ moreTickets }) {
  return (
    <button className={style['show-more']} onClick={moreTickets}>
      ПОКАЗАТЬ ЕЩЁ 5 БИЛЕТОВ!
    </button>
  );
}

export default ShowMore;
