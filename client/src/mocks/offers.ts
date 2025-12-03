import type { FullOffer } from '../types/offer';

export const offers: FullOffer[] = [
  {
    id: 'bbb86a0e-3f92-446d-9a68-cb64b5d38e2b',
    title: 'Wood and stone place',
    description: 'A new spacious villa, one floor. All commodities, jacuzzi and beautiful scenery. Ideal for families or friends.',
    type: 'apartment',
    price: 370,
    images: [
      'img/apartment-01.jpg',
      'img/apartment-02.jpg',
      'img/apartment-03.jpg',
      'img/room.jpg',
      'img/studio-01.jpg',
      'img/apartment-01.jpg'
    ],
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
    goods: [
      'Heating',
      'Wi-Fi',
      'Fridge',
      'Laptop friendly workspace',
      'Baby seat',
      'Air conditioning',
      'Washer',
      'Towels',
      'Dishwasher',
      'Kitchen',
      'Washing machine',
      'Breakfast',
      'Coffee machine'
    ],
    host: {
      isPro: true,
      name: 'Angelina',
      avatarUrl: 'img/avatar-angelina.jpg'
    },
    isPremium: false,
    isFavorite: true,
    rating: 4.9,
    bedrooms: 2,
    maxAdults: 3
  },
  {
    id: 'ccc86a0e-3f92-446d-9a68-cb64b5d38e3c',
    title: 'Beautiful & luxurious studio at great location',
    description: 'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.',
    type: 'apartment',
    price: 120,
    images: [
      'img/room.jpg',
      'img/apartment-01.jpg',
      'img/apartment-02.jpg',
      'img/apartment-03.jpg',
      'img/studio-01.jpg'
    ],
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
    goods: [
      'Wi-Fi',
      'Washing machine',
      'Towels',
      'Heating',
      'Coffee machine',
      'Baby seat',
      'Kitchen',
      'Dishwasher',
      'Cabel TV',
      'Fridge'
    ],
    host: {
      isPro: true,
      name: 'Angelina',
      avatarUrl: 'img/avatar-angelina.jpg'
    },
    isPremium: true,
    isFavorite: false,
    rating: 4.8,
    bedrooms: 3,
    maxAdults: 4
  },
  {
    id: 'ddd86a0e-3f92-446d-9a68-cb64b5d38e4d',
    title: 'Canal View Prinsengracht',
    description: 'Canal view apartment in historical center.',
    type: 'apartment',
    price: 132,
    images: [
      'img/apartment-02.jpg',
      'img/apartment-03.jpg'
    ],
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
    goods: [
      'Wi-Fi',
      'Kitchen',
      'Dishwasher',
      'Fridge',
      'Heating'
    ],
    host: {
      isPro: true,
      name: 'Oliver',
      avatarUrl: 'img/avatar-angelina.jpg'
    },
    isPremium: false,
    isFavorite: true,
    rating: 4.2,
    bedrooms: 2,
    maxAdults: 3
  },
  {
    id: 'eee86a0e-3f92-446d-9a68-cb64b5d38e5e',
    title: 'Nice, cozy, warm big bed apartment',
    description: 'Premium apartment with big bed and great view.',
    type: 'apartment',
    price: 180,
    images: [
      'img/apartment-03.jpg',
      'img/apartment-01.jpg'
    ],
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
    goods: [
      'Wi-Fi',
      'Washing machine',
      'Towels',
      'Heating',
      'Coffee machine',
      'Kitchen',
      'Dishwasher',
      'Fridge',
      'Air conditioning'
    ],
    host: {
      isPro: true,
      name: 'Angelina',
      avatarUrl: 'img/avatar-angelina.jpg'
    },
    isPremium: true,
    isFavorite: true,
    rating: 5.0,
    bedrooms: 4,
    maxAdults: 6
  }
];