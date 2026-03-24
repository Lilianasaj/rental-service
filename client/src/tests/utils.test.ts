import { describe, it, expect } from 'vitest';
import { getOffersByCity, sortOffersByType, getCity } from '../utils';
import { makeFakeOffer } from './mocks';
import { CITIES_LOCATION } from '../const';

describe('getCity', () => {
  it('возвращает город по названию', () => {
    const result = getCity('Paris', CITIES_LOCATION);
    expect(result.name).toBe('Paris');
    expect(result.location.latitude).toBe(48.85661);
  });

  it('возвращает первый город, если город не найден', () => {
    const result = getCity('Tokyo', CITIES_LOCATION);
    expect(result.name).toBe('Paris');
  });
});

describe('getOffersByCity', () => {
  it('возвращает только объявления указанного города', () => {
    const paris = CITIES_LOCATION[0];
    const cologne = CITIES_LOCATION[1];
    const parisOffer = { ...makeFakeOffer(), city: paris };
    const cologneOffer = { ...makeFakeOffer(), city: cologne };

    const result = getOffersByCity('Paris', [parisOffer, cologneOffer]);

    expect(result).toHaveLength(1);
    expect(result[0].city.name).toBe('Paris');
  });

  it('возвращает все предложения, если cityName не указан', () => {
    const offers = [makeFakeOffer(), makeFakeOffer()];
    const result = getOffersByCity(undefined, offers);
    expect(result).toHaveLength(2);
  });

  it('возвращает пустой массив, если город не найден', () => {
    const offers = [makeFakeOffer(), makeFakeOffer()];
    expect(getOffersByCity('Tokyo', offers)).toHaveLength(0);
  });

  it('возвращает пустой массив при пустом списке предложений', () => {
    expect(getOffersByCity('Paris', [])).toEqual([]);
  });
});

describe('sortOffersByType', () => {
  it('сортирует от дешёвых к дорогим (PriceToHigh)', () => {
    const offers = [
      { ...makeFakeOffer(), price: 300 },
      { ...makeFakeOffer(), price: 100 },
      { ...makeFakeOffer(), price: 200 },
    ];

    // Передаем КЛЮЧ 'PriceToHigh', а не значение
    const result = sortOffersByType([...offers], 'PriceToHigh');

    expect(result[0].price).toBe(100);
    expect(result[2].price).toBe(300);
  });

  it('сортирует от дорогих к дешёвым (PriceToLow)', () => {
    const offers = [
      { ...makeFakeOffer(), price: 100 },
      { ...makeFakeOffer(), price: 300 },
    ];

    const result = sortOffersByType([...offers], 'PriceToLow');

    expect(result[0].price).toBe(300);
  });

  it('сортирует по рейтингу (TopRated)', () => {
    const offers = [
      { ...makeFakeOffer(), rating: 3 },
      { ...makeFakeOffer(), rating: 5 },
      { ...makeFakeOffer(), rating: 4 },
    ];

    const result = sortOffersByType([...offers], 'TopRated');

    expect(result[0].rating).toBe(5);
    expect(result[2].rating).toBe(3);
  });

  it('сохраняет исходный порядок для Popular', () => {
    const offers = [
      { ...makeFakeOffer(), price: 300 },
      { ...makeFakeOffer(), price: 100 },
      { ...makeFakeOffer(), price: 200 },
    ];

    const result = sortOffersByType([...offers], 'Popular');

    expect(result[0].price).toBe(300);
    expect(result[1].price).toBe(100);
    expect(result[2].price).toBe(200);
  });

  it('не изменяет исходный массив', () => {
    const offers = [
      { ...makeFakeOffer(), price: 100 },
      { ...makeFakeOffer(), price: 200 },
    ];

    const copy = [...offers];

    sortOffersByType(offers, 'PriceToHigh');

    expect(offers).toEqual(copy);
  });

  it('корректно работает при пустом массиве', () => {
    const result = sortOffersByType([], 'PriceToHigh');
    expect(result).toEqual([]);
  });
});