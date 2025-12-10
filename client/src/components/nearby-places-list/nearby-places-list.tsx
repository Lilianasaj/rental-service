// src/components/nearby-places-list/nearby-places-list.tsx
import { CitiesCard } from '../cities-card/cities-card';  // ← Используйте named import
import { FullOffer } from '../../types/offer';

type NearbyPlacesListProps = {
  offers: FullOffer[];
};

function NearbyPlacesList({ offers }: NearbyPlacesListProps): JSX.Element {
  return (
    <div className="near-places__list places__list">
      {offers.map((offer) => (
        <CitiesCard
          key={offer.id}
          id={offer.id}
          title={offer.title}
          type={offer.type}
          price={offer.price}
          previewImage={offer.images[0]} // первое фото как preview
          isPremium={offer.isPremium}
          rating={offer.rating}
        />
      ))}
    </div>
  );
}

export { NearbyPlacesList };