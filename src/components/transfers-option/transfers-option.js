import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleTransfersOption } from '../../store/ticketsReducer';
import style from './transfers-option.module.scss';

function TransfersOption({ id, label }) {
  const dispatch = useDispatch();
  const isChecked = useSelector((state) => state.tickets.transfers[id]);
  return (
    <li className={style.transfersNumberItem}>
      <label>
        <input
          type="checkbox"
          id={id}
          checked={isChecked}
          onChange={() => dispatch(toggleTransfersOption(id))}
        />
        <span className={style.checkmark}></span>
        {label}
      </label>
    </li>
  );
}

export default TransfersOption;
