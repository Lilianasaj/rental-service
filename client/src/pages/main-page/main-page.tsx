// src/pages/main-page/main-page.tsx
import { useState } from 'react';
import { Link } from 'react-router-dom'; // ← ДОБАВЬТЕ ЭТОТ ИМПОРТ
import { Logo } from '../../components/logo/logo';
import { CitiesCardList } from '../../components/cities-card-list/cities-card-list';
import { Map } from '../../components/map/map';
import { CitiesList } from '../../components/cities-list/cities-list';
import { SortOptions } from '../../components/sort-options/sort-options';
import { useAppSelector } from '../../hooks';
import { getOffersByCity, sortOffersByType } from '../../utils';
import { SortOffer } from '../../types/sort';
import { AppRoute } from '../../const'; // ← ДОБАВЬТЕ ЭТОТ ИМПОРТ

function MainPage(): JSX.Element {
  const selectedCity = useAppSelector((state) => state.city);
  const allOffers = useAppSelector((state) => state.offers);
  
  const [activeSort, setActiveSort] = useState<SortOffer>('Popular');
  const [selectedOfferId, setSelectedOfferId] = useState<string | null>(null);

  // Получаем предложения для выбранного города
  const selectedCityOffers = getOffersByCity(selectedCity?.name, allOffers);
  
  // Сортируем предложения
  const sortedOffers = sortOffersByType(selectedCityOffers, activeSort);
  
  // Получаем выбранное предложение для подсветки на карте
  const selectedOffer = selectedOfferId 
    ? allOffers.find((offer) => offer.id === selectedOfferId) 
    : undefined;
  

  const handleCardHover = (id: string) => {
    setSelectedOfferId(id);
  };

  const handleCardLeave = () => {
    setSelectedOfferId(null);
  };

  const favoriteOffersCount = useAppSelector((state) => 
  state.offers.filter((offer) => offer.isFavorite).length
  );

    return (
    <div className="page page--gray page--main">
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
                    <span className="header__favorite-count">{favoriteOffersCount}</span>
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

      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">
            <CitiesList selectedCity={selectedCity} />
          </section>
        </div>
        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">
                {sortedOffers.length} places to stay in {selectedCity?.name}
              </b>
              <SortOptions activeSorting={activeSort} onChange={setActiveSort} />
              <CitiesCardList 
                offersList={sortedOffers}
                onMouseEnter={handleCardHover}
                onMouseLeave={handleCardLeave}
              />
            </section>
            <div className="cities__right-section">
              <Map
                className="cities__map"
                city={selectedCity!}
                points={selectedCityOffers}
                selectedPoint={selectedOffer}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default MainPage;