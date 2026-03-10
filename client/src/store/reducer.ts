import { createReducer } from '@reduxjs/toolkit';
import { offersList } from '../mocks/offers-list';
import { getCity } from '../utils';
import { 
  changeCity, 
  offersCityList, 
  requireAuthorization, 
  setError, 
  setOffersDataLoadingStatus,
  setUser,
  setCurrentOffer,
  setOfferComments,
  setOfferLoadingStatus
} from './action';
import { CITIES_LOCATION, AuthorizationStatus } from '../const';
import { CityOffer, FullOffer } from '../types/offer';
import { AuthorizationStatusType } from '../types/authorization-status';
import { UserData } from '../types/user-data';
import { Review } from '../types/review';

const defaultCity = getCity('Paris', CITIES_LOCATION);

export type InitialState = {
  city: CityOffer | undefined;
  offers: FullOffer[];
  currentOffer: FullOffer | null;      
  offerComments: Review[];              
  authorizationStatus: AuthorizationStatusType;
  user: UserData | null;                
  error: string | null;
  isOffersDataLoading: boolean;
  isOfferLoading: boolean;              
}

const initialState: InitialState = {
  city: defaultCity,
  offers: [],
  currentOffer: null,
  offerComments: [],
  authorizationStatus: AuthorizationStatus.Unknown,
  user: null,
  error: null,
  isOffersDataLoading: false,
  isOfferLoading: false,
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCity, (state, action) => {
      state.city = action.payload;
    })
    .addCase(offersCityList, (state, action) => {
      state.offers = action.payload;
    })
    .addCase(requireAuthorization, (state, action) => {
      state.authorizationStatus = action.payload;
    })
    .addCase(setUser, (state, action) => {          // НОВОЕ
      state.user = action.payload;
    })
    .addCase(setCurrentOffer, (state, action) => {  // НОВОЕ
      state.currentOffer = action.payload;
    })
    .addCase(setOfferComments, (state, action) => { // НОВОЕ
      state.offerComments = action.payload;
    })
    .addCase(setOfferLoadingStatus, (state, action) => { // НОВОЕ
      state.isOfferLoading = action.payload;
    })
    .addCase(setError, (state, action) => {
      state.error = action.payload;
    })
    .addCase(setOffersDataLoadingStatus, (state, action) => {
      state.isOffersDataLoading = action.payload;
    });
});

export { reducer };