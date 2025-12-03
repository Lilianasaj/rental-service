import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';

type CitiesCardProps = {
  id: string;
  title: string;
  type: string;
  price: number;
  isPremium: boolean;
  previewImage: string;
  rating: number;
};

function CitiesCard({ id, title, type, price, previewImage, isPremium, rating }: CitiesCardProps): React.JSX.Element {
  const [, setOfferId] = useState<string>('');

  return (
    <article 
      className="cities__card place-card" 
      onMouseOver={() => setOfferId(id)} 
      onMouseOut={() => setOfferId('')}
    >
      {isPremium && (
        <div className="place-card__mark">
          <span>Premium</span>
        </div>
      )}
      <div className="cities__image-wrapper place-card__image-wrapper">
        <Link to={`${AppRoute.Offer.replace(':id', id)}`}>
          <img
            className="place-card__image"
            src={previewImage}
            width="260"
            height="200"
            alt="Place image"
          />
        </Link>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{ width: `${(rating / 5) * 100}%` }}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={`${AppRoute.Offer.replace(':id', id)}`}>
            {title}
          </Link>
        </h2>
        <p className="place-card__type">{type}</p>
      </div>
    </article>
  );
}

export default CitiesCard;