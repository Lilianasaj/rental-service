import React from 'react';
import FavoriteCard from '../favorite-card/favorite-card';
import type { OffersList } from '../../types/offer';

type FavoriteCardListProps = {
  offers: OffersList[];
  cityName: string;
};

function FavoriteCardList({ offers, cityName }: FavoriteCardListProps): React.JSX.Element {
  if (offers.length === 0) {
    return <></>;
  }

  return (
    <li className="favorites__locations-items">
      <div className="favorites__locations locations locations--current">
        <div className="locations__item">
          <a className="locations__item-link" href="#">
            <span>{cityName}</span>
          </a>
        </div>
      </div>
      <div className="favorites__places">
        {offers.map((offer) => (
          <FavoriteCard
            key={offer.id}
            id={offer.id}
            title={offer.title}
            type={offer.type}
            price={offer.price}
            isPremium={offer.isPremium}
            previewImage={offer.previewImage}
            rating={offer.rating}
          />
        ))}
      </div>
    </li>
  );
}

export default FavoriteCardList;