import { createAction } from '@reduxjs/toolkit';
import { CityOffer, FullOffer } from '../types/offer'; // ИЗМЕНИТЕ OffersList на FullOffer
import { AuthorizationStatusType } from '../types/authorization-status';

const changeCity = createAction('offers/changeCity', (city: CityOffer) => ({
  payload: city,
}));

const setOffersDataLoadingStatus = createAction<boolean>('data/setOffersDataLoadingStatus');

const offersCityList = createAction('offers/offersCityList', (offers: FullOffer[]) => ({ // ИЗМЕНИТЕ тип
  payload: offers,
}));

const setError = createAction('setError', (error: string | null) => ({
    payload: error
}));

const requireAuthorization = createAction<AuthorizationStatusType>('user/requireAuthorization');

export { changeCity, offersCityList, requireAuthorization, setError, setOffersDataLoadingStatus };