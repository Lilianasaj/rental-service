import * as React from 'react';
import { createRoot } from 'react-dom/client';
import App from './components/app/app';
import { Setting } from './const';
import { offers } from './mocks/offers';
import { offersList } from './mocks/offers-list';   // ← ДОБАВИЛИ ЭТО

const container = document.getElementById('root') as HTMLElement;
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <App
      rentalOffersCount={Setting.rentOffersCount}
      offers={offers}
      offersList={offersList}   // ← ТЕПЕРЬ РАБОТАЕТ
    />
  </React.StrictMode>
);