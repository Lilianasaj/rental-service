import { BrowserRouter, Routes, Route } from 'react-router-dom';

import MainPage from '../../pages/main-page/main-page';
import Login from '../../pages/login/login';
import Favorites from '../../pages/favorites/favorites';
import OfferPage from '../../pages/offer/offer';
import PageNotFound from '../../pages/page-not-found/page-not-found';
import { PrivateRoute } from '../private-route/private-route';
import { AuthorizationStatus } from '../../const';
import type { FullOffer } from '../../types/offer';
import type { OffersList } from '../../types/offer';




import { AppRoute } from '../../const';

type AppMainPageProps = {
  rentalOffersCount: number;
  offers: FullOffer[];
  offersList: OffersList[];
};



function App({ rentalOffersCount, offers, offersList }: AppMainPageProps)  {
  return (
    <BrowserRouter>
      <Routes>

        {/* Главная */}
<Route
  path={AppRoute.Main}
  element={
    <MainPage
      rentalOffersCount={rentalOffersCount}
      offersList={offersList}
    />
  }
/>


        {/* Login */}
        <Route
          path={AppRoute.Login}
          element={<Login />}
        />

        {/* Favorites */}
<Route
  path={AppRoute.Favorites}
  element={
    <PrivateRoute authorizationStatus={AuthorizationStatus.NoAuth}>
      <Favorites offersList={offersList} />
    </PrivateRoute>
  }
/>



<Route
  path={`${AppRoute.Offer}`}
  element={<OfferPage offers={offers} />}
/>



        {/* 404 */}
        <Route
          path="*"
          element={<PageNotFound />}
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;