import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AppRoute, AuthorizationStatus, Setting } from '../../const';
import MainPage from '../../pages/main-page/main-page';
import LoginPage from '../../pages/login-page/login-page';
import OfferPage from '../../pages/offer-page/offer-page';
import NotFoundPage from '../../pages/not-found-page/not-found-page';
import { PrivateRoute } from '../private-route/private-route';
import type { FullOffer, OffersList } from '../../types/offer';
import FavoritesPage from '../../pages/favorites-page/favorites-page';

type AppMainPageProps = {
  rentalOffersCount: number;
  offersList: OffersList[];
  offers: FullOffer[];
};

function App({ rentalOffersCount, offersList, offers }: AppMainPageProps): React.JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={AppRoute.Main}
          element={<MainPage rentalOffersCount={rentalOffersCount} offersList={offersList} />}
        />
        <Route
          path={AppRoute.Login}
          element={<LoginPage />}
        />
        <Route
          path={`${AppRoute.Offer}/:id`}
          element={<OfferPage offers={offers} />}
        />
        <Route
          path={AppRoute.Favorites}
          element={
            <PrivateRoute
              authorizationStatus={AuthorizationStatus.NoAuth}
            >
              <FavoritesPage offersList={offersList.filter((offer) => offer.isFavorite)} />
            </PrivateRoute>
          }
        />
        <Route
          path="*"
          element={<NotFoundPage />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;