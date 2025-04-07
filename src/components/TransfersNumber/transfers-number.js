import React from 'react';
import TransfersOption from '../transfers-option/transfers-option';
import style from './transfers-number.module.scss';

const transfersOptions = [
  { id: 'all', label: 'Все' },
  { id: 'no-transfers', label: 'Без пересадок' },
  { id: 'one-transfers', label: '1 пересадка' },
  { id: 'two-transfers', label: '2 пересадки' },
  { id: 'three-transfers', label: '3 пересадки' },
];

function TransfersNumber() {
  return (
    <div className={style.transfersNumber}>
      <div className={style['transfersNumber-title']}>КОЛИЧЕСТВО ПЕРЕСАДОК</div>
      <ul className={style.transfersNumberList}>
        {transfersOptions.map((option) => (
          <TransfersOption
            key={option.id}
            id={option.id}
            label={option.label}
          />
        ))}
      </ul>
    </div>
  );
}

export default TransfersNumber;
