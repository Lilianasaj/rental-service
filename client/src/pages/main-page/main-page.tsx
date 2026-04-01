import { useEffect, useState } from 'react';
import { Logo } from '../../components/logo/logo';
import { CitiesCardList } from '../../components/cities-card-list/cities-card-list';
import { Map } from '../../components/map/map';
import { CitiesList } from '../../components/cities-list/cities-list';
import { SortOptions } from '../../components/sort-options/sort-options';
import { HeaderUserNav } from '../../components/header-user-nav/header-user-nav';
import { LoadingScreen } from '../../components/loading-screen/loading-screen';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getOffersByCity, sortOffersByType } from '../../utils';
import { SortOffer } from '../../types/sort';
import { fetchOffersAction, logoutAction } from '../../store/api-actions';

function MainPage(): JSX.Element {
  const dispatch = useAppDispatch();
  const selectedCity = useAppSelector((state) => state.city);
  const allOffers = useAppSelector((state) => state.offers);
  const favoriteOffers = useAppSelector((state) => state.favoriteOffers);
  const userData = useAppSelector((state) => state.userData);
  const authorizationStatus = useAppSelector((state) => state.authorizationStatus);
  const isOffersDataLoading = useAppSelector((state) => state.isOffersDataLoading);

  const [activeSort, setActiveSort] = useState<SortOffer>('Popular');
  const [selectedOfferId, setSelectedOfferId] = useState<string | null>(null);

  useEffect(() => {
    if (allOffers.length === 0) {
      dispatch(fetchOffersAction());
    }
  }, [allOffers.length, dispatch]);

  if (isOffersDataLoading) {
    return <LoadingScreen />;
  }

  const selectedCityOffers = getOffersByCity(selectedCity?.name, allOffers);
  const sortedOffers = sortOffersByType(selectedCityOffers, activeSort);
  const isOffersEmpty = sortedOffers.length === 0;
  const selectedOffer = selectedOfferId
    ? allOffers.find((offer) => offer.id === selectedOfferId)
    : undefined;

  const handleCardHover = (offerId: string) => {
    setSelectedOfferId(offerId);
  };

  const handleCardLeave = () => {
    setSelectedOfferId(null);
  };

  const handleLogout = () => {
    dispatch(logoutAction());
  };

  return (
    <div className="page page--gray page--main">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Logo />
            </div>
            <nav className="header__nav">
              <HeaderUserNav
                authorizationStatus={authorizationStatus}
                email={userData?.email}
                favoriteOffersCount={favoriteOffers.length}
                onLogout={handleLogout}
              />
            </nav>
          </div>
        </div>
      </header>

      <main className={`page__main page__main--index${isOffersEmpty ? ' page__main--index-empty' : ''}`}>
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">
            <CitiesList selectedCity={selectedCity} />
          </section>
        </div>
        <div className="cities">
          <div className={`cities__places-container container${isOffersEmpty ? ' cities__places-container--empty' : ''}`}>
            {isOffersEmpty ? (
              <>
                <section className="cities__no-places">
                  <div className="cities__status-wrapper tabs__content">
                    <b className="cities__status">No places to stay available</b>
                    <p className="cities__status-description">
                      We could not find any property available at the moment in {selectedCity?.name}
                    </p>
                  </div>
                </section>
                <div className="cities__right-section"></div>
              </>
            ) : (
              <>
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
              </>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default MainPage;
