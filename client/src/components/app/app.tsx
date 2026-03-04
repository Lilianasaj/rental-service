import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useAppSelector } from '../../hooks';
import MainPage from '../../pages/main-page/main-page';
import Login from '../../pages/login/login';
import Favorites from '../../pages/favorites/favorites';
import OfferPage from '../../pages/offer/offer';
import PageNotFound from '../../pages/page-not-found/page-not-found';
import { PrivateRoute } from '../private-route/private-route';
import LoadingScreen from '../loading-page/loading-page';
import { AuthorizationStatus, AppRoute } from '../../const';

function App(): JSX.Element {
  const authorizationStatus = useAppSelector((state) => state.authorizationStatus);
  const isOffersDataLoading = useAppSelector((state) => state.isOffersDataLoading);
  const offers = useAppSelector((state) => state.offers); // ПОЛУЧАЕМ offers

  if (authorizationStatus === AuthorizationStatus.Unknown || isOffersDataLoading) {
    return <LoadingScreen />;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path={AppRoute.Main} element={<MainPage />} />
        <Route path={AppRoute.Login} element={<Login />} />
        <Route
          path={AppRoute.Favorites}
          element={
            <PrivateRoute authorizationStatus={authorizationStatus}>
              <Favorites />
            </PrivateRoute>
          }
        />
        {/* ПЕРЕДАЕМ offers В OfferPage */}
        <Route path={AppRoute.Offer} element={<OfferPage offers={offers} />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;