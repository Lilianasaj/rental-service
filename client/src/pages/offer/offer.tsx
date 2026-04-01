import { useEffect } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks';
import PageNotFound from '../page-not-found/page-not-found';
import { Logo } from '../../components/logo/logo';
import { ReviewForm } from '../../components/review-form/review-form';
import { ReviewsList } from '../../components/reviews-list/reviews-list';
import { Map } from '../../components/map/map';
import { NearbyPlacesList } from '../../components/nearby-places-list/nearby-places-list';
import { LoadingScreen } from '../../components/loading-screen/loading-screen';
import { HeaderUserNav } from '../../components/header-user-nav/header-user-nav';
import { FavoriteButton } from '../../components/favorite-button/favorite-button';
import { AppRoute, AuthorizationStatus } from '../../const';
import { addReviewAction, fetchOfferPageDataAction, fetchOffersAction, logoutAction } from '../../store/api-actions';

function OfferPage(): JSX.Element {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();

  const authorizationStatus = useAppSelector((state) => state.authorizationStatus);
  const offer = useAppSelector((state) => state.currentOffer);
  const reviews = useAppSelector((state) => state.reviews);
  const offers = useAppSelector((state) => state.offers);
  const favoriteOffers = useAppSelector((state) => state.favoriteOffers);
  const userData = useAppSelector((state) => state.userData);
  const isOfferDataLoading = useAppSelector((state) => state.isOfferDataLoading);
  const isOfferNotFound = useAppSelector((state) => state.isOfferNotFound);
  const isReviewSending = useAppSelector((state) => state.isReviewSending);

  useEffect(() => {
    if (id) {
      dispatch(fetchOfferPageDataAction(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (offers.length === 0) {
      dispatch(fetchOffersAction());
    }
  }, [dispatch, offers.length]);

  if (!id || isOfferNotFound) {
    return <Navigate to={AppRoute.NotFound} />;
  }

  if (isOfferDataLoading) {
    return <LoadingScreen />;
  }

  if (!offer) {
    return <PageNotFound />;
  }

  const nearbyOffers = offers
    .filter((item) => item.id !== offer.id && item.city.name === offer.city.name)
    .slice(0, 3);

  const pointsForMap = [...nearbyOffers, offer];

  const handleAddReview = async (reviewData: { comment: string; rating: number }) => {
    await dispatch(addReviewAction({ offerId: id, ...reviewData })).unwrap();
  };

  const handleLogout = () => {
    dispatch(logoutAction());
  };

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

        <main className="page__main page__main--offer">
          <section className="offer">
            {offer.isPremium && (
              <div className="offer__mark">
                <span>Premium</span>
              </div>
            )}

            <div className="offer__gallery-container container">
              <div className="offer__gallery">
                {offer.images.slice(0, 6).map((item) => (
                  <div key={item} className="offer__image-wrapper">
                    <img className="offer__image" src={item} alt={offer.title} />
                  </div>
                ))}
              </div>
            </div>

            <div className="offer__container container">
              <div className="offer__wrapper">
                <div className="offer__name-wrapper">
                  <h1 className="offer__name">{offer.title}</h1>
                  <FavoriteButton offerId={offer.id} isFavorite={offer.isFavorite} variant="offer" />
                </div>

                <div className="offer__rating rating">
                  <div className="offer__stars rating__stars">
                    <span style={{ width: `${Math.round(offer.rating) * 20}%` }}></span>
                    <span className="visually-hidden">Rating</span>
                  </div>
                  <span className="offer__rating-value rating__value">{offer.rating}</span>
                </div>

                <ul className="offer__features">
                  <li className="offer__feature offer__feature--entire">{offer.type}</li>
                  <li className="offer__feature offer__feature--bedrooms">{offer.bedrooms} Bedrooms</li>
                  <li className="offer__feature offer__feature--adults">Max {offer.maxAdults} adults</li>
                </ul>

                <div className="offer__price">
                  <b className="offer__price-value">&euro;{offer.price}</b>
                  <span className="offer__price-text">&#47;&nbsp;night</span>
                </div>

                <div className="offer__inside">
                  <h2 className="offer__inside-title">What&apos;s inside</h2>
                  <ul className="offer__inside-list">
                    {offer.goods.map((good) => (
                      <li key={good} className="offer__inside-item">{good}</li>
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
                    {offer.host.isPro && <span className="offer__user-status">Pro</span>}
                  </div>
                  <div className="offer__description">
                    <p className="offer__text">{offer.description}</p>
                  </div>
                </div>

                <section className="offer__reviews reviews">
                  <ReviewsList reviews={reviews} />
                  {authorizationStatus === AuthorizationStatus.Auth && (
                    <ReviewForm onAddReview={handleAddReview} isSubmitting={isReviewSending} />
                  )}
                </section>
              </div>
            </div>

            <section className="offer__map map-container">
              <Map
                className="offer__map"
                city={offer.city}
                points={pointsForMap}
                selectedPoint={offer}
              />
            </section>
          </section>

          {nearbyOffers.length > 0 && (
            <section className="near-places places">
              <div className="near-places__container container">
                <h2 className="near-places__title">Other places in the neighbourhood</h2>
                <NearbyPlacesList offers={nearbyOffers} />
              </div>
            </section>
          )}
        </main>
      </div>
    </div>
  );
}

export default OfferPage;
