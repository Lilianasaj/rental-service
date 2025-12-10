import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { FullOffer } from '../../types/offer';
import PageNotFound from '../page-not-found/page-not-found';
import { Logo } from '../../components/logo/logo';
import { ReviewForm } from '../../components/review-form/review-form';
import { ReviewsList } from '../../components/reviews-list/reviews-list';
import { reviews } from '../../mocks/reviews';
import { Map } from '../../components/map/map';
import { NearbyPlacesList } from '../../components/nearby-places-list/nearby-places-list';
import { AppRoute } from '../../const';

type OfferProps = {
  offers: FullOffer[];
};

function OfferPage({ offers }: OfferProps): JSX.Element {
  const params = useParams();
  const offer = offers.find((item) => item.id === params.id);

  if (!offer) {
    return <PageNotFound />;
  }

  // ДЕБАГ: Выведем данные в консоль
  console.log('=== OFFER PAGE DEBUG ===');
  console.log('Current offer:', offer);
  console.log('Offer city:', offer.city);
  console.log('Offer location:', offer.location);

  // Nearby (берём 3 других оффера того же города)
  const nearbyOffers = offers
    .filter((item) => item.id !== offer.id && item.city.name === offer.city.name)
    .slice(0, 3);

  console.log('Nearby offers:', nearbyOffers);
  console.log('All offers:', offers);
  console.log('=======================');

  // Создаем массив точек для карты: nearby + текущий оффер
  const pointsForMap = [...nearbyOffers, offer];

  return (
    <div className="page page--gray page--offer">
      <div className="page">
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
                    <span className="header__user-name user__name">
                      Myemail@gmail.com
                    </span>
                    <Link
                      to={AppRoute.Favorites}
                      className="header__nav-link header__nav-link--profile"
                    >
                      <span className="header__favorite-count">2</span>
                    </Link>
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

        {/* ОСНОВНОЙ КОНТЕНТ */}
        <main className="page__main page__main--offer">
          <section className="offer">
            {offer.isPremium && (
              <div className="offer__mark">
                <span>Premium</span>
              </div>
            )}

            {/* ГАЛЕРЕЯ */}
            <div className="offer__gallery-container container">
              <div className="offer__gallery">
                {offer.images.map((item) => (
                  <div key={item} className="offer__image-wrapper">
                    <img
                      className="offer__image"
                      src={item}
                      alt={offer.title}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* ИНФОРМАЦИЯ ОБ ОФФЕРЕ */}
            <div className="offer__container container">
              <div className="offer__wrapper">
                <div className="offer__name-wrapper">
                  <h1 className="offer__name">{offer.title}</h1>
                </div>

                <div className="offer__rating rating">
                  <div className="offer__stars rating__stars">
                    <span style={{ width: `${offer.rating * 20}%` }}></span>
                    <span className="visually-hidden">Rating</span>
                  </div>
                  <span className="offer__rating-value rating__value">
                    {offer.rating}
                  </span>
                </div>

                <ul className="offer__features">
                  <li className="offer__feature offer__feature--entire">
                    {offer.type}
                  </li>
                  <li className="offer__feature offer__feature--bedrooms">
                    {offer.bedrooms} Bedrooms
                  </li>
                  <li className="offer__feature offer__feature--adults">
                    Max {offer.maxAdults} adults
                  </li>
                </ul>

                <div className="offer__price">
                  <b className="offer__price-value">&euro;{offer.price}</b>
                  <span className="offer__price-text">&#47;&nbsp;night</span>
                </div>

                <div className="offer__inside">
                  <h2 className="offer__inside-title">What's inside</h2>
                  <ul className="offer__inside-list">
                    {offer.goods.map((good) => (
                      <li key={good} className="offer__inside-item">
                        {good}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="offer__host">
                  <h2 className="offer__host-title">Meet the host</h2>
                  <div className="offer__host-user user">
                    <div className="offer__avatar-wrapper user__avatar-wrapper">
                      <img
                        className="offer__avatar user__avatar"
                        src={offer.host.avatarUrl}
                        width="74"
                        height="74"
                        alt="Host avatar"
                      />
                    </div>
                    <span className="offer__user-name">{offer.host.name}</span>
                    {offer.host.isPro && (
                      <span className="offer__user-status">Pro</span>
                    )}
                  </div>
                  <div className="offer__description">
                    <p className="offer__text">{offer.description}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* КАРТА (для оффера и nearby) */}
            <section className="offer__map map-container">
              <Map
                className="offer__map"
                city={offer.city}
                points={pointsForMap}
                selectedPoint={offer}
              />
            </section>

            {/* ОТЗЫВЫ */}
            <section className="offer__reviews reviews">
              <ReviewsList reviews={reviews} />
              <ReviewForm />
            </section>
          </section>

          {/* БЛОК "Other places in the neighbourhood" */}
          <section className="near-places places">
            <div className="near-places__container container">
              <h2 className="near-places__title">
                Other places in the neighbourhood
              </h2>
              {nearbyOffers.length > 0 ? (
                <NearbyPlacesList offers={nearbyOffers} />
              ) : (
                <p className="near-places__empty">
                  No other places in this area
                </p>
              )}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

export default OfferPage;