import { createReducer } from '@reduxjs/toolkit';
import { OffersList, CityOffer, FullOffer } from '../types/offer';
import { Review } from '../types/review';
import { getCity } from '../utils';
import {
  changeCity,
  offersCityList,
  requireAuthorization,
  setCurrentOffer,
  setError,
  setFavoriteOffers,
  setFavoritesDataLoadingStatus,
  setOfferDataLoadingStatus,
  setOfferNotFoundStatus,
  setOffersDataLoadingStatus,
  setReviews,
  setReviewSendingStatus,
  setUserData,
  updateOfferFavoriteStatus,
} from './action';
import { AuthorizationStatus, CITIES_LOCATION } from '../const';
import { AuthorizationStatusType } from '../types/authorization-status';
import { UserData } from '../types/user-data';

const defaultCity = getCity('Paris', CITIES_LOCATION);

export type InitialState = {
  city: CityOffer | undefined;
  offers: OffersList[];
  favoriteOffers: OffersList[];
  currentOffer: FullOffer | null;
  reviews: Review[];
  userData: UserData | null;
  authorizationStatus: AuthorizationStatusType;
  error: string | null;
  isOffersDataLoading: boolean;
  isFavoritesDataLoading: boolean;
  isOfferDataLoading: boolean;
  isReviewSending: boolean;
  isOfferNotFound: boolean;
}

const initialState: InitialState = {
  city: defaultCity,
  offers: [],
  favoriteOffers: [],
  currentOffer: null,
  reviews: [],
  userData: null,
  authorizationStatus: AuthorizationStatus.Unknown,
  error: null,
  isOffersDataLoading: false,
  isFavoritesDataLoading: false,
  isOfferDataLoading: false,
  isReviewSending: false,
  isOfferNotFound: false,
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCity, (state, action) => {
      state.city = action.payload;
    })
    .addCase(offersCityList, (state, action) => {
      state.offers = action.payload;
    })
    .addCase(setFavoriteOffers, (state, action) => {
      state.favoriteOffers = action.payload;
    })
    .addCase(updateOfferFavoriteStatus, (state, action) => {
      const { offerId, isFavorite } = action.payload;

      state.offers = state.offers.map((offer) => (
        offer.id === offerId ? { ...offer, isFavorite } : offer
      ));

      state.favoriteOffers = state.favoriteOffers.filter((offer) => offer.id !== offerId);

      const favoriteOffer = state.offers.find((offer) => offer.id === offerId);
      if (isFavorite && favoriteOffer) {
        state.favoriteOffers.unshift({ ...favoriteOffer, isFavorite: true });
      }

      if (state.currentOffer?.id === offerId) {
        state.currentOffer = { ...state.currentOffer, isFavorite };
      }
    })
    .addCase(setCurrentOffer, (state, action) => {
      state.currentOffer = action.payload;
    })
    .addCase(setOfferNotFoundStatus, (state, action) => {
      state.isOfferNotFound = action.payload;
    })
    .addCase(setReviews, (state, action) => {
      state.reviews = action.payload;
    })
    .addCase(setUserData, (state, action) => {
      state.userData = action.payload;
    })
    .addCase(requireAuthorization, (state, action) => {
      state.authorizationStatus = action.payload;
    })
    .addCase(setError, (state, action) => {
      state.error = action.payload;
    })
    .addCase(setOffersDataLoadingStatus, (state, action) => {
      state.isOffersDataLoading = action.payload;
    })
    .addCase(setFavoritesDataLoadingStatus, (state, action) => {
      state.isFavoritesDataLoading = action.payload;
    })
    .addCase(setOfferDataLoadingStatus, (state, action) => {
      state.isOfferDataLoading = action.payload;
    })
    .addCase(setReviewSendingStatus, (state, action) => {
      state.isReviewSending = action.payload;
    });
});

export { reducer };
