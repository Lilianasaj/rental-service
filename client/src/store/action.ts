import { createAction } from '@reduxjs/toolkit';
import { CityOffer, FullOffer } from '../types/offer';
import { AuthorizationStatusType } from '../types/authorization-status';
import { UserData } from '../types/user-data';
import { Review } from '../types/review';

const changeCity = createAction('offers/changeCity', (city: CityOffer) => ({
  payload: city,
}));

const setOffersDataLoadingStatus = createAction<boolean>('data/setOffersDataLoadingStatus');

const offersCityList = createAction('offers/offersCityList', (offers: FullOffer[]) => ({
  payload: offers,
}));

const setError = createAction('setError', (error: string | null) => ({
    payload: error
}));

const requireAuthorization = createAction<AuthorizationStatusType>('user/requireAuthorization');

const setUser = createAction('user/setUser', (user: UserData | null) => ({
  payload: user
}));

const setCurrentOffer = createAction('offer/setCurrentOffer', (offer: FullOffer | null) => ({
  payload: offer
}));

const setOfferComments = createAction('offer/setOfferComments', (comments: Review[]) => ({
  payload: comments
}));

const setOfferLoadingStatus = createAction<boolean>('offer/setOfferLoadingStatus');

const setFavoriteOffers = createAction('offers/setFavoriteOffers', (offers: FullOffer[]) => ({
  payload: offers
}));

export { 
  changeCity, 
  offersCityList, 
  requireAuthorization, 
  setError, 
  setOffersDataLoadingStatus,
  setUser,
  setCurrentOffer,
  setOfferComments,
  setOfferLoadingStatus,
  setFavoriteOffers
};