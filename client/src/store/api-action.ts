import {AxiosInstance} from 'axios';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {AppDispatch, State} from '../types/state.js';
import { FullOffer, OffersList } from '../types/offer'; // импортируем оба типа
import {offersCityList, requireAuthorization, setError, setOffersDataLoadingStatus} from './action';
import {saveToken, dropToken} from '../services/token';
import {APIRoute, AuthorizationStatus, TIMEOUT_SHOW_ERROR } from '../const';
import {AuthData, UserData} from '../types/user-data';
import { store } from './index';

// Функция для преобразования OffersList в FullOffer
const adaptOfferToFullOffer = (offer: OffersList): FullOffer => {
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
    description: '', // Заглушка, нужно будет получить с сервера
    bedrooms: 1, // Заглушка
    goods: [], // Заглушка
    host: {
      name: 'Host',
      avatarUrl: '/img/avatar.svg',
      isPro: false,
    },
    images: [offer.previewImage], // Используем previewImage как основное изображение
    maxAdults: 1, // Заглушка
    previewImage: offer.previewImage,
  };
};

const fetchOffersAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchOffers',
  async (_arg, {dispatch, extra: api}) => {
    try {
      dispatch(setOffersDataLoadingStatus(true));
      const {data} = await api.get<OffersList[]>(APIRoute.Offers);
      
      // Преобразуем OffersList[] в FullOffer[]
      const fullOffers: FullOffer[] = data.map(adaptOfferToFullOffer);
      
      dispatch(setOffersDataLoadingStatus(false));
      dispatch(offersCityList(fullOffers)); // отправляем FullOffer[]
    } catch (error) {
      dispatch(setOffersDataLoadingStatus(false));
      console.error('Error fetching offers:', error);
    }
  },
);

const checkAuthAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/checkAuth',
  async (_arg, {dispatch, extra: api}) => {
    try {
      await api.get(APIRoute.Login);
      dispatch(requireAuthorization(AuthorizationStatus.Auth));
    } catch {
      dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
    }
  },
);

const loginAction = createAsyncThunk<
  UserData,       
  AuthData,       
  { dispatch: AppDispatch; state: State; extra: AxiosInstance }
>(
  'user/login',
  async ({ email, password }, { dispatch, extra: api, rejectWithValue }) => {
    try {
      const { data } = await api.post<UserData>(APIRoute.Login, { email, password });
      saveToken(data.token);
      dispatch(requireAuthorization(AuthorizationStatus.Auth));
      return data;
    } catch (err) {
      dropToken();
      dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
      return rejectWithValue('Login failed');
    }
  }
);

const logoutAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/logout',
  async (_arg, {dispatch, extra: api}) => {
    try {
      await api.delete(APIRoute.Logout);
      dropToken();
      dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
    } catch (error) {
      console.error('Logout error:', error);
    }
  },
);

export const clearErrorAction = createAsyncThunk(
  'clearError',
  () => {
    setTimeout(
      () => store.dispatch(setError(null)),
      TIMEOUT_SHOW_ERROR,
    );
  },
);

export { fetchOffersAction, checkAuthAction, loginAction, logoutAction };