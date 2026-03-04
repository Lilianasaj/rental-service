import { State } from '../types/state';
import { AuthorizationStatusType } from '../types/authorization-status';

export const getAuthorizationStatus = (state: State): AuthorizationStatusType =>
  state.authorizationStatus;

export const getIsOffersDataLoading = (state: State): boolean =>
  state.isOffersDataLoading;

export const getOffers = (state: State) => state.offers;
export const getCity = (state: State) => state.city;
export const getError = (state: State) => state.error;