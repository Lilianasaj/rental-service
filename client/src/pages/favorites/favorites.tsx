// src/pages/favorites/favorites.tsx
import { Link } from 'react-router-dom'; // ← ДОБАВЬТЕ ЭТОТ ИМПОРТ
import { Logo } from '../../components/logo/logo';
import { FavoriteCardList } from '../../components/favorite-card-list/favorite-card-list';
import { useAppSelector } from '../../hooks';
import { AppRoute } from '../../const'; // ← ДОБАВЬТЕ ЭТОТ ИМПОРТ

function FavoritesPage(): JSX.Element {
  const offersList = useAppSelector((state) => state.offers);
  const favoriteOffers = offersList.filter((offer) => offer.isFavorite);

  return (
    <div className="page page--favorites">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Logo />
            </div>
            <nav className="header__nav">
              <ul className="header__nav-list">
                <li className="header__nav-item user">
                    <div className="header__avatar-wrapper user__avatar-wrapper"></div>
                    <span className="header__user-name user__name">Myemail@gmail.com</span>
                    <Link  // ← ИЗМЕНИТЕ <a> НА <Link>
                    to={AppRoute.Favorites}
                    className="header__nav-link header__nav-link--profile"
                  >
                    <span className="header__favorite-count">{favoriteOffers.length}</span>
                  </Link> {/* ← ЗАКРЫВАЕМ Link */}
                </li>
                <li className="header__nav-item">
                  <a className="header__nav-link" href="#">
                    <span className="header__signout">Sign out</span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>

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
    </div>
  );
}

export default FavoritesPage;