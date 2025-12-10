// src/components/nearby-places-list/nearby-places-list.tsx
import CitiesCard from '../cities-card/cities-card';
import type { FullOffer } from '../../types/offer';

type NearbyPlacesListProps = {
  offers: FullOffer[];
};

function NearbyPlacesList({ offers }: NearbyPlacesListProps): React.JSX.Element {
  return (
    <div className="near-places__list places__list">
      {offers.map((offer) => (
        <CitiesCard
          key={offer.id}
          id={offer.id}
          title={offer.title}
          type={offer.type}
          price={offer.price}
          isPremium={offer.isPremium}
          previewImage={offer.images[0]} // используем первую картинку как превью
          rating={offer.rating}
        />
      ))}
    </div>
  );
}

export { NearbyPlacesList };