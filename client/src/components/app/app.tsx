// src/components/app/app.tsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from '../../pages/main-page/main-page';
import Login from '../../pages/login/login';
import Favorites from '../../pages/favorites/favorites';
import OfferPage from '../../pages/offer/offer';
import PageNotFound from '../../pages/page-not-found/page-not-found';
import { PrivateRoute } from '../private-route/private-route';
import { AuthorizationStatus, AppRoute } from '../../const';
import { FullOffer } from '../../types/offer';

type AppProps = {
  offers: FullOffer[];
};

function App({ offers }: AppProps): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={AppRoute.Main} element={<MainPage />} />
        <Route path={AppRoute.Login} element={<Login />} />
        <Route
          path={AppRoute.Favorites}
          element={
            <PrivateRoute authorizationStatus={AuthorizationStatus.Auth}>
              <Favorites />
            </PrivateRoute>
          }
        />
        {/* ИСПРАВЬТЕ ЭТУ СТРОКУ: */}
        // ИЗМЕНИТЕ ЭТУ СТРОКУ:
<Route path={AppRoute.Offer} element={<OfferPage offers={offers} />} /> {/* УБРАТЬ /:id */}
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;