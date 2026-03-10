import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { FullOffer } from '../../types/offer';
import { Review } from '../../types/review';
import { fetchOfferAction, fetchOfferCommentsAction, postCommentAction } from '../../store/api-action';
import PageNotFound from '../page-not-found/page-not-found';
import LoadingScreen from '../../components/loading-page/loading-page';
import { ReviewForm } from '../../components/review-form/review-form';
import { ReviewsList } from '../../components/reviews-list/reviews-list';
import { Map } from '../../components/map/map';
import { NearbyPlacesList } from '../../components/nearby-places-list/nearby-places-list';
import { AppRoute, AuthorizationStatus } from '../../const';

type OfferProps = {
  offers: FullOffer[];
};

function OfferPage({ offers }: OfferProps): JSX.Element {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  
  const currentOffer = useAppSelector((state) => state.currentOffer);
  const offerComments = useAppSelector((state) => state.offerComments);
  const isOfferLoading = useAppSelector((state) => state.isOfferLoading);
  const authorizationStatus = useAppSelector((state) => state.authorizationStatus);
  const allOffers = useAppSelector((state) => state.offers);
  
  const [currentReviews, setCurrentReviews] = useState<Review[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (id) {
      dispatch(fetchOfferAction(id));
      dispatch(fetchOfferCommentsAction(id));
    }
  }, [id, dispatch]);

  useEffect(() => {
    setCurrentReviews(offerComments || []); // Добавлена защита от undefined
  }, [offerComments]);

  useEffect(() => {
    if (!isOfferLoading && !currentOffer && id) {
      navigate('/404');
    }
  }, [isOfferLoading, currentOffer, id, navigate]);

  const handleAddReview = async (newReviewData: { comment: string; rating: number }) => {
    if (!id) return;
    
    setIsSubmitting(true);
    try {
      await dispatch(postCommentAction({
        offerId: id,
        comment: newReviewData
      })).unwrap();
      
      dispatch(fetchOfferCommentsAction(id));
    } catch (error) {
      console.error('Failed to post comment:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isOfferLoading) {
    return <LoadingScreen />;
  }

  // Если нет currentOffer, ищем в переданных offers
  const offer = currentOffer || offers.find((item) => item.id === id);

  if (!offer) {
    return <PageNotFound />;
  }

  // Защита от undefined для всех полей
  const images = offer.images || [];
  const goods = offer.goods || [];
  const nearbyOffers = allOffers
    .filter((item) => item.id !== offer.id && item.city?.name === offer.city?.name)
    .slice(0, 3);

  const pointsForMap = [...nearbyOffers, offer].filter(Boolean);

  return (
    <div className="page page--gray page--offer">
      <main className="page__main page__main--offer">
        <section className="offer">
          {offer.isPremium && (
            <div className="offer__mark">
              <span>Premium</span>
            </div>
          )}

          {/* ГАЛЕРЕЯ - с защитой от undefined */}
          <div className="offer__gallery-container container">
            <div className="offer__gallery">
              {images.map((item) => (
                <div key={item} className="offer__image-wrapper">
                  <img
                    className="offer__image"
                    src={item.startsWith('http') ? item : `http://localhost:5000${item}`}
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
                  <span style={{ width: `${(offer.rating || 0) * 20}%` }}></span>
                  <span className="visually-hidden">Rating</span>
                </div>
                <span className="offer__rating-value rating__value">
                  {offer.rating || 0}
                </span>
              </div>

              <ul className="offer__features">
                <li className="offer__feature offer__feature--entire">
                  {offer.type || 'Apartment'}
                </li>
                <li className="offer__feature offer__feature--bedrooms">
                  {offer.bedrooms || 0} Bedrooms
                </li>
                <li className="offer__feature offer__feature--adults">
                  Max {offer.maxAdults || 0} adults
                </li>
              </ul>

              <div className="offer__price">
                <b className="offer__price-value">&euro;{offer.price || 0}</b>
                <span className="offer__price-text">&#47;&nbsp;night</span>
              </div>

              {/* WHAT'S INSIDE - с защитой от undefined */}
              <div className="offer__inside">
                <h2 className="offer__inside-title">What's inside</h2>
                <ul className="offer__inside-list">
                  {goods.map((good) => (
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
                      src={offer.host?.avatarUrl?.startsWith('http') ? offer.host.avatarUrl : `http://localhost:5000${offer.host?.avatarUrl || ''}`}
                      width="74"
                      height="74"
                      alt="Host avatar"
                    />
                  </div>
                  <span className="offer__user-name">{offer.host?.name || 'Host'}</span>
                  {offer.host?.isPro && (
                    <span className="offer__user-status">Pro</span>
                  )}
                </div>
                <div className="offer__description">
                  <p className="offer__text">{offer.description || ''}</p>
                </div>
              </div>
            </div>
          </div>

          {/* КАРТА */}
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
            <ReviewsList reviews={currentReviews} />
            {authorizationStatus === AuthorizationStatus.Auth && (
              <ReviewForm 
                onAddReview={handleAddReview} 
                isSubmitting={isSubmitting}
              />
            )}
          </section>
        </section>

        {/* NEARBY PLACES */}
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
  );
}

export default OfferPage;