import  { FavoriteCard } from '../favorite-card/favorite-card';
import type { OffersList } from '../../types/offer';

type FavoriteCardListProps = {
  offersList: OffersList[];
};

function FavoriteCardList({ offersList }: FavoriteCardListProps) {
  return (
    <ul className="favorites__list">
      {offersList.map((item) => (
        <li key={item.id} className="favorites__locations-items">
          <div className="favorites__places">
            <FavoriteCard
              id={item.id}
              title={item.title}
              type={item.type}
              price={item.price}
              previewImage={item.previewImage}
              rating={item.rating}
              isPremium={item.isPremium}
            />
          </div>
        </li>
      ))}
    </ul>
  );
}

export { FavoriteCardList };