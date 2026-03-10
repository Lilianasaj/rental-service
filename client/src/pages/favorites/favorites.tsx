import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FavoriteCardList } from '../../components/favorite-card-list/favorite-card-list';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { fetchFavoriteOffersAction } from '../../store/api-action';
import LoadingScreen from '../../components/loading-page/loading-page';
import { AppRoute } from '../../const';

function FavoritesPage(): JSX.Element {
  const dispatch = useAppDispatch();
  const favoriteOffers = useAppSelector((state) => 
    state.offers.filter((offer) => offer.isFavorite)
  );
  const isLoading = useAppSelector((state) => state.isOffersDataLoading);

  useEffect(() => {
    dispatch(fetchFavoriteOffersAction());
  }, [dispatch]);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div className="page page--favorites">
      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          <section className="favorites">
            <h1 className="favorites__title">Saved listing</h1>
            
            {favoriteOffers.length === 0 ? (
              <div className="favorites__status-wrapper">
                <b className="favorites__status">Nothing yet saved.</b>
                <p className="favorites__status-description">
                  Save properties to narrow down search or plan your future trips.
                </p>
              </div>
            ) : (
              <FavoriteCardList offersList={favoriteOffers} />
            )}
          </section>
        </div>
      </main>
      <footer className="footer container">
        <Link className="footer__logo-link" to={AppRoute.Main}>
          <img
            className="footer__logo"
            src="img/logo.svg"
            alt="6 cities logo"
            width="64"
            height="33"
          />
        </Link>
      </footer>
    </div>
  );
}

export default FavoritesPage;