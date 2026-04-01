import { Link } from 'react-router-dom';
import { FavoriteCard } from '../favorite-card/favorite-card';
import { OffersList } from '../../types/offer';
import { AppRoute } from '../../const';
import { useAppDispatch } from '../../hooks';
import { changeCity } from '../../store/action';

type FavoriteCardListProps = {
  offersList: OffersList[];
};

function FavoriteCardList({ offersList }: FavoriteCardListProps): JSX.Element {
  const dispatch = useAppDispatch();

  const groupedByCity: Record<string, OffersList[]> = {};

  offersList.forEach((offer) => {
    if (!groupedByCity[offer.city.name]) {
      groupedByCity[offer.city.name] = [];
    }
    groupedByCity[offer.city.name].push(offer);
  });

  return (
    <>
      {Object.entries(groupedByCity).map(([cityName, cityOffers]) => (
        <li key={cityName} className="favorites__locations-items">
          <div className="favorites__locations locations locations--current">
            <div className="locations__item">
              <Link
                className="locations__item-link"
                to={AppRoute.Main}
                onClick={() => dispatch(changeCity(cityOffers[0].city))}
              >
                <span>{cityName}</span>
              </Link>
            </div>
          </div>
          <div className="favorites__places">
            {cityOffers.map((offer) => (
              <FavoriteCard
                key={offer.id}
                id={offer.id}
                title={offer.title}
                type={offer.type}
                price={offer.price}
                previewImage={offer.previewImage}
                isPremium={offer.isPremium}
                rating={offer.rating}
                isFavorite={offer.isFavorite}
              />
            ))}
          </div>
        </li>
      ))}
    </>
  );
}

export { FavoriteCardList };
