import { useState } from 'react';
import { Link } from 'react-router-dom';
import { CitiesCardList } from '../../components/cities-card-list/cities-card-list';
import { Map } from '../../components/map/map';
import { CitiesList } from '../../components/cities-list/cities-list';
import { SortOptions } from '../../components/sort-options/sort-options';
import { useAppSelector } from '../../hooks';
import { getOffersByCity, sortOffersByType } from '../../utils';
import { SortOffer } from '../../types/sort';
import { AppRoute } from '../../const';

function MainPage(): JSX.Element {
  const selectedCity = useAppSelector((state) => state.city);
  const allOffers = useAppSelector((state) => state.offers);
  
  const [activeSort, setActiveSort] = useState<SortOffer>('Popular');
  const [selectedOfferId, setSelectedOfferId] = useState<string | null>(null);

  const selectedCityOffers = getOffersByCity(selectedCity?.name, allOffers);
  const sortedOffers = sortOffersByType(selectedCityOffers, activeSort);
  
  const selectedOffer = selectedOfferId 
    ? allOffers.find((offer) => offer.id === selectedOfferId) 
    : undefined;

  const handleCardHover = (id: string) => {
    setSelectedOfferId(id);
  };

  const handleCardLeave = () => {
    setSelectedOfferId(null);
  };

  return (
    <div className="page page--gray page--main">
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