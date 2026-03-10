import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './components/app/app';
import { store } from './store';
// import { offers } from './mocks/offers'; // УДАЛИТЕ эту строку
import { ErrorMessage } from './components/error-message/error-message';
import { checkAuthAction } from './store/api-action';
import { fetchOffersAction } from './store/api-action';

store.dispatch(checkAuthAction());
store.dispatch(fetchOffersAction());

const container = document.getElementById('root') as HTMLElement;
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ErrorMessage/>
      <App /> {}
    </Provider>
  </React.StrictMode>
);