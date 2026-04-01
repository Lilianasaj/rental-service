import { createAction } from '@reduxjs/toolkit';
import { CityOffer, FullOffer, OffersList } from '../types/offer';
import { Review } from '../types/review';
import { AuthorizationStatusType } from '../types/authorization-status';
import { UserData } from '../types/user-data';

export const changeCity = createAction('offers/changeCity', (city: CityOffer) => ({
  payload: city,
}));

export const offersCityList = createAction('offers/offersCityList', (offers: OffersList[]) => ({
  payload: offers,
}));

export const setFavoriteOffers = createAction<OffersList[]>('favorite/setFavoriteOffers');
export const updateOfferFavoriteStatus = createAction<{ offerId: string; isFavorite: boolean }>('favorite/updateOfferFavoriteStatus');
export const setCurrentOffer = createAction<FullOffer | null>('offer/setCurrentOffer');
export const setOfferNotFoundStatus = createAction<boolean>('offer/setOfferNotFoundStatus');
export const setReviews = createAction<Review[]>('reviews/setReviews');
export const setUserData = createAction<UserData | null>('user/setUserData');
export const requireAuthorization = createAction<AuthorizationStatusType>('user/requireAuthorization');

export const setError = createAction('data/setError', (error: string | null) => ({
  payload: error,
}));

export const setOffersDataLoadingStatus = createAction<boolean>('data/setOffersDataLoadingStatus');
export const setFavoritesDataLoadingStatus = createAction<boolean>('data/setFavoritesDataLoadingStatus');
export const setOfferDataLoadingStatus = createAction<boolean>('data/setOfferDataLoadingStatus');
export const setReviewSendingStatus = createAction<boolean>('data/setReviewSendingStatus');
