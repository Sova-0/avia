import { configureStore } from '@reduxjs/toolkit';
import { thunk } from 'redux-thunk';
import ticketsReducer from './ticketsReducer';

export const store = configureStore({
  reducer: {
    tickets: ticketsReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});
