import { faker } from '@faker-js/faker';
import { AuthorizationStatus, CITIES_LOCATION } from '../const';
import type { InitialState } from '../store/reducer';
import type { FullOffer, OffersList } from '../types/offer';
import type { Review } from '../types/review';
import type { UserData } from '../types/user-data';

function makeFakeCity(index = 0) {
  const city = CITIES_LOCATION[index];

  return {
    name: city.name,
    location: {
      latitude: city.location.latitude,
      longitude: city.location.longitude,
      zoom: city.location.zoom,
    },
  };
}

export function makeFakeOffer(): OffersList {
  return {
    id: faker.string.uuid(),
    title: faker.lorem.words(3),
    type: 'apartment',
    price: faker.number.int({ min: 50, max: 500 }),
    city: makeFakeCity(),
    location: {
      latitude: faker.number.float({ min: 48, max: 49 }),
      longitude: faker.number.float({ min: 2, max: 3 }),
      zoom: 13,
    },
    isFavorite: faker.datatype.boolean(),
    isPremium: faker.datatype.boolean(),
    rating: faker.number.float({ min: 1, max: 5, fractionDigits: 1 }),
    previewImage: faker.image.url(),
  };
}

export function makeFakeFullOffer(): FullOffer {
  const offer = makeFakeOffer();

  return {
    id: offer.id,
    title: offer.title,
    type: offer.type,
    price: offer.price,
    city: offer.city,
    location: offer.location,
    isFavorite: offer.isFavorite,
    isPremium: offer.isPremium,
    rating: offer.rating,
    description: faker.lorem.paragraph(),
    bedrooms: faker.number.int({ min: 1, max: 5 }),
    goods: [faker.commerce.productName(), faker.commerce.productName()],
    host: {
      name: faker.person.fullName(),
      avatarUrl: faker.image.avatar(),
      isPro: faker.datatype.boolean(),
    },
    images: [faker.image.url(), faker.image.url()],
    maxAdults: faker.number.int({ min: 1, max: 10 }),
  };
}

export function makeFakeReview(): Review {
  return {
    id: faker.string.uuid(),
    comment: faker.lorem.sentence(),
    rating: faker.number.int({ min: 1, max: 5 }),
    date: new Date().toISOString(),
    user: {
      name: faker.person.fullName(),
      avatarUrl: faker.image.avatar(),
      isPro: faker.datatype.boolean(),
    },
  };
}

export function makeFakeUserData(): UserData {
  return {
    id: faker.number.int({ min: 1, max: 10000 }),
    email: faker.internet.email(),
    username: faker.internet.username(),
    avatar: faker.image.avatar(),
    isPro: faker.datatype.boolean(),
    token: faker.string.alphanumeric(32),
  };
}

export function makeFakeStore(
  overrides: Partial<InitialState> = {}
): InitialState {
  return {
    city: makeFakeCity(),
    offers: [],
    favoriteOffers: [],
    currentOffer: null,
    reviews: [],
    userData: null,
    authorizationStatus: AuthorizationStatus.NoAuth,
    error: null,
    isOffersDataLoading: false,
    isFavoritesDataLoading: false,
    isOfferDataLoading: false,
    isReviewSending: false,
    isOfferNotFound: false,
    ...overrides,
  };
}