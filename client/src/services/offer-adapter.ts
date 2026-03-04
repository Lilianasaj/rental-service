// src/services/offer-adapter.ts
import { FullOffer, CityOffer, HostOffer, OfferLocation } from '../types/offer';

export const adaptOfferToClient = (offer: any): FullOffer => {
  // Создаем location на основе данных из offer
  const location: OfferLocation = {
    latitude: offer.latitude || 0,
    longitude: offer.longitude || 0,
    zoom: 12,
  };

  // Создаем city на основе города из offer
  const city: CityOffer = {
    name: offer.city || '',
    location: {
      latitude: offer.latitude || 0,
      longitude: offer.longitude || 0,
      zoom: 12,
    },
  };

  // Создаем host (нужно будет получать из данных или использовать заглушку)
  const host: HostOffer = {
    name: offer.host?.name || 'Host',
    avatarUrl: offer.host?.avatarUrl || '/img/avatar.svg',
    isPro: offer.host?.isPro || false,
  };

  return {
    id: offer.id.toString(),
    title: offer.title || '',
    type: offer.type || '',
    price: offer.price || 0,
    city,
    location,
    isFavorite: offer.isFavorite || false,
    isPremium: offer.isPremium || false,
    rating: offer.rating || 0,
    description: offer.description || '',
    bedrooms: offer.rooms || 1,
    goods: offer.features || [],
    host,
    images: offer.photos || [],
    maxAdults: offer.guests || 1,
  };
};