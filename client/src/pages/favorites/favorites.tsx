import { Logo } from '../../components/logo/logo';
import { FavoriteCardList } from '../../components/favorite-card-list/favorite-card-list';
import type { OffersList } from '../../types/offer';

type FavoritesPageProps = {
  offersList: OffersList[];
};

function FavoritesPage({ offersList }: FavoritesPageProps): React.JSX.Element {
  return (
    <div className="page page--favorites">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Logo />
            </div>
          </div>
        </div>
      </header>

      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          <section className="favorites">
            <h1 className="favorites__title">Saved listing</h1>

            <FavoriteCardList offersList={offersList} />

          </section>
        </div>
      </main>
    </div>
  );
}

export default FavoritesPage;