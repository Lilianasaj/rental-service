// src/pages/main-page/main-page.tsx

import { Logo } from '../../components/logo/logo';
import { CitiesCardList } from '../../components/cities-card-list/cities-card-list';
import type{ OffersList } from '../../types/offer';
import { Map } from '../../components/map/map';

type MainPageProps = {
  rentalOffersCount: number;
  offersList: OffersList[];
};

function MainPage({ rentalOffersCount, offersList }: MainPageProps): React.JSX.Element {

  // Берём город у любого оффера — по ЛР-4 ВСЕ в Амстердаме
  const city = offersList[0].city;

  return (
    <div className="page page--gray page--main">

      {/* ---- HEADER ---- */}
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Logo />
            </div>

            {/* ---- ВОССТАНОВЛЕННАЯ ТВОЯ СТАРАЯ НАВИГАЦИЯ ---- */}
            <nav className="header__nav">
              <ul className="header__nav-list">
                <li className="header__nav-item user">
                  <a className="header__nav-link header__nav-link--profile" href="#">
                    <div className="header__avatar-wrapper user__avatar-wrapper"></div>
                    <span className="header__user-name user__name">Myemail@gmail.com</span>
                    <span className="header__favorite-count">3</span>
                  </a>
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

      {/* ---- MAIN ---- */}
      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>

        <div className="cities">
          <div className="cities__places-container container">

            {/* ---- ЛЕВАЯ ЧАСТЬ (список предложений) ---- */}
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>

              <b className="places__found">
                {rentalOffersCount} places to stay in Amsterdam
              </b>

              {/* ---- Список карточек ---- */}
              <CitiesCardList offersList={offersList} />
            </section>

            {/* ---- ПРАВАЯ ЧАСТЬ (КАРТА) ---- */}
            <div className="cities__right-section">
              <Map
                className="cities__map"
                city={city}
                points={offersList}   // точки — сами офферы, у каждого есть location
              />
            </div>

          </div>
        </div>

      </main>
    </div>
  );
}

export default MainPage;