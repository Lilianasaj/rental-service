import {AxiosInstance} from 'axios';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {AppDispatch, State} from '../types/state.js';
import { FullOffer, OffersList } from '../types/offer';
import { Review } from '../types/review';
import { 
  offersCityList, 
  requireAuthorization, 
  setError, 
  setOffersDataLoadingStatus,
  setUser,
  setCurrentOffer,
  setOfferComments,
  setOfferLoadingStatus,
  setFavoriteOffers
} from './action';
import {saveToken, dropToken} from '../services/token';
import {APIRoute, AuthorizationStatus, TIMEOUT_SHOW_ERROR } from '../const';
import {AuthData, UserData} from '../types/user-data';
import { store } from './index';

// Тип для данных комментария
export type CommentData = {
  comment: string;
  rating: number;
};

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
    description: '',
    bedrooms: 1,
    goods: [],
    host: {
      name: 'Host',
      avatarUrl: '/img/avatar.svg',
      isPro: false,
    },
    images: [offer.previewImage],
    maxAdults: 1,
    previewImage: offer.previewImage,
  };
};

// 1. FETCH ALL OFFERS
export const fetchOffersAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchOffers',
  async (_arg, {dispatch, extra: api}) => {
    try {
      dispatch(setOffersDataLoadingStatus(true));
      const {data} = await api.get<OffersList[]>(APIRoute.Offers);
      
      const fullOffers: FullOffer[] = data.map(adaptOfferToFullOffer);
      
      dispatch(setOffersDataLoadingStatus(false));
      dispatch(offersCityList(fullOffers));
    } catch (error) {
      dispatch(setOffersDataLoadingStatus(false));
      console.error('Error fetching offers:', error);
    }
  },
);

// 2. FETCH SINGLE OFFER
export const fetchOfferAction = createAsyncThunk<void, string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchOffer',
  async (offerId, { dispatch, extra: api, rejectWithValue }) => {
    try {
      dispatch(setOfferLoadingStatus(true));
      const { data } = await api.get<FullOffer>(`${APIRoute.Offers}/${offerId}`);
      dispatch(setCurrentOffer(data));
      dispatch(setOfferLoadingStatus(false));
    } catch (error) {
      dispatch(setOfferLoadingStatus(false));
      return rejectWithValue('Offer not found');
    }
  },
);

// 3. FETCH COMMENTS
export const fetchOfferCommentsAction = createAsyncThunk<void, string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchOfferComments',
  async (offerId, { dispatch, extra: api }) => {
    try {
      const { data } = await api.get<Review[]>(`${APIRoute.Comments}/${offerId}`);
      dispatch(setOfferComments(data));
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  },
);

// 4. POST COMMENT
export const postCommentAction = createAsyncThunk<void, { offerId: string; comment: CommentData }, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/postComment',
  async ({ offerId, comment }, { dispatch, extra: api, rejectWithValue }) => {
    try {
      await api.post<Review>(`${APIRoute.Comments}/${offerId}`, comment);
      
      // Обновляем список комментариев после успешной отправки
      const { data } = await api.get<Review[]>(`${APIRoute.Comments}/${offerId}`);
      dispatch(setOfferComments(data));
    } catch (error) {
      return rejectWithValue('Failed to post comment');
    }
  },
);

// 5. FETCH FAVORITE OFFERS
export const fetchFavoriteOffersAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchFavoriteOffers',
  async (_arg, { dispatch, extra: api }) => {
    try {
      const { data } = await api.get<FullOffer[]>(APIRoute.Favorite);
      // Обновляем статус isFavorite в основном списке
      dispatch(fetchOffersAction());
    } catch (error) {
      console.error('Error fetching favorite offers:', error);
    }
  },
);

// 6. TOGGLE FAVORITE
export const toggleFavoriteAction = createAsyncThunk<void, { offerId: string; status: number }, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/toggleFavorite',
  async ({ offerId, status }, { dispatch, extra: api }) => {
    try {
      await api.post(`${APIRoute.Favorite}/${offerId}/${status}`);
      // Обновляем списки после изменения
      dispatch(fetchOffersAction());
      dispatch(fetchFavoriteOffersAction());
    } catch (error) {
      console.error('Error toggling favorite:', error);
    }
  },
);

// 7. CHECK AUTH
export const checkAuthAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/checkAuth',
  async (_arg, {dispatch, extra: api}) => {
    try {
      const { data } = await api.get<UserData>(APIRoute.Login);
      dispatch(requireAuthorization(AuthorizationStatus.Auth));
      dispatch(setUser(data));
    } catch {
      dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
      dispatch(setUser(null));
    }
  },
);

// 8. LOGIN
export const loginAction = createAsyncThunk<
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
      dispatch(setUser(data));
      return data;
    } catch (err) {
      dropToken();
      dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
      dispatch(setUser(null));
      return rejectWithValue('Login failed');
    }
  }
);

// 9. LOGOUT
export const logoutAction = createAsyncThunk<void, undefined, {
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
      dispatch(setUser(null));
      // Обновляем список предложений (сбрасываем избранное)
      dispatch(fetchOffersAction());
    } catch (error) {
      console.error('Logout error:', error);
    }
  },
);

// 10. CLEAR ERROR
export const clearErrorAction = createAsyncThunk(
  'clearError',
  () => {
    setTimeout(
      () => store.dispatch(setError(null)),
      TIMEOUT_SHOW_ERROR,
    );
  },
);