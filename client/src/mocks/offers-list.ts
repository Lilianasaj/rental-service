import type { OffersList } from '../types/offer';

export const offersList: OffersList[] = [
  {
    id: 'bbb86a0e-3f92-446d-9a68-cb64b5d38e2b',
    title: 'Wood and stone place',
    type: 'apartment',
    price: 370,
    previewImage: 'img/apartment-01.jpg',
    city: {
      name: 'Paris',
      location: {
        latitude: 48.85661,
        longitude: 2.351499,
        zoom: 13
      }
    },
    location: {
      latitude: 48.868610000000004,
      longitude: 2.342499,
      zoom: 16
    },
    isFavorite: true,
    isPremium: false,
    rating: 4.9
  },
  {
    id: 'ccc86a0e-3f92-446d-9a68-cb64b5d38e3c',
    title: 'Beautiful & luxurious studio at great location',
    type: 'apartment',
    price: 120,
    previewImage: 'img/room.jpg',
    city: {
      name: 'Amsterdam',
      location: {
        latitude: 52.37454,
        longitude: 4.897976,
        zoom: 13
      }
    },
    location: {
      latitude: 52.3909553943508,
      longitude: 4.85309666406198,
      zoom: 16
    },
    isFavorite: false,
    isPremium: true,
    rating: 4.8
  },
  {
    id: 'ddd86a0e-3f92-446d-9a68-cb64b5d38e4d',
    title: 'Canal View Prinsengracht',
    type: 'apartment',
    price: 132,
    previewImage: 'img/apartment-02.jpg',
    city: {
      name: 'Amsterdam',
      location: {
        latitude: 52.37454,
        longitude: 4.897976,
        zoom: 13
      }
    },
    location: {
      latitude: 52.3909553943508,
      longitude: 4.929309666406198,
      zoom: 16
    },
    isFavorite: true,
    isPremium: false,
    rating: 4.2
  },
  {
    id: 'eee86a0e-3f92-446d-9a68-cb64b5d38e5e',
    title: 'Nice, cozy, warm big bed apartment',
    type: 'apartment',
    price: 180,
    previewImage: 'img/apartment-03.jpg',
    city: {
      name: 'Brussels',
      location: {
        latitude: 50.846557,
        longitude: 4.351697,
        zoom: 13
      }
    },
    location: {
      latitude: 50.850557,
      longitude: 4.361697,
      zoom: 16
    },
    isFavorite: true,
    isPremium: true,
    rating: 5.0
  },
  {
    id: 'fff86a0e-3f92-446d-9a68-cb64b5d38e6f',
    title: 'Penthouse with great view',
    type: 'house',
    price: 250,
    previewImage: 'img/apartment-01.jpg',
    city: {
      name: 'Cologne',
      location: {
        latitude: 50.937531,
        longitude: 6.960278,
        zoom: 13
      }
    },
    location: {
      latitude: 50.947531,
      longitude: 6.970278,
      zoom: 16
    },
    isFavorite: false,
    isPremium: true,
    rating: 4.5
  }
];