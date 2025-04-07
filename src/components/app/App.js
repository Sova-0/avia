import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSearchId, fetchTickets } from '../../store/ticketsReducer';
import HeaderLogo from '../header-logo/Header-logo';
import TransfersNumber from '../TransfersNumber/transfers-number';
import TicketsSide from '../tickets-side/tickets-side';

import styles from './App.module.scss';
import mainStyles from './Main.module.scss';

function App() {
  const dispatch = useDispatch();
  const searchId = useSelector((state) => state.tickets.searchId);

  useEffect(() => {
    dispatch(fetchSearchId());
  }, [dispatch]);
  useEffect(() => {
    if (searchId) {
      dispatch(fetchTickets());
    }
  }, [searchId, dispatch]);
  return (
    <div className={styles.App}>
      <HeaderLogo />
      <main className={mainStyles.main}>
        <TransfersNumber />
        <TicketsSide />
      </main>
    </div>
  );
}

export default App;
