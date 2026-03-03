import { Offer } from '../models/offer.js';
import ApiError from '../error/ApiError.js';
import { adaptOfferToClient } from '../adapters/offerAdapter.js';
import { User } from '../models/user.js';
import { adaptFullOfferToClient } from '../adapters/offerAdapter.js';

async function getAllOffers(req, res, next) {
    try{
        const offers = await Offer.findAll();
        const adaptOffers = offers.map(adaptOfferToClient);
        res.status(200).json(adaptOffers);
    }   catch (error) {
        console.error('Ошибка:', error);
        next(ApiError.internal('Не удалось получить список предложений:'));    
    }
}

export async function getFullOffer(req, res, next) {
    try {
        const { id } = req.params; // получаем ID из URL

        // Ищем предложение вместе с автором
        const offer = await Offer.findByPk(id, {
            include: {
                model: User,
                as: 'author' // ассоциация, указанная в моделях
            }
        });

        // Если оффер не найден – ошибка 400
        if (!offer) {
            return next(ApiError.badRequest('Offer not found'));
        }

        // Преобразуем в клиентский формат с помощью адаптера
        const adaptedOffer = adaptFullOfferToClient(offer, offer.author);

        // Отправляем ответ
        res.status(200).json(adaptedOffer);
    } catch (error) {
        console.error('Ошибка в getFullOffer:', error);
        next(ApiError.internal('Не удалось получить предложение'));
    }
}

export async function createOffer(req, res, next) {
 try {
      const {
     title, description, publishDate, city,
     isPremium, isFavorite, rating, type, rooms, guests, price,
     features, commentsCount, latitude, longitude, userId
   } = req.body;


   if (!req.files?.previewImage || req.files.previewImage.length === 0) {
     return next(ApiError.badRequest('Превью изображение обязательно для загрузки'));
   }


   const previewImagePath = `/static/${req.files.previewImage[0].filename}`;


   let processedPhotos = [];
   if (req.files?.photos) {
     processedPhotos = req.files.photos.map(file => `/static/${file.filename}`);
   }


   let parsedFeatures = [];
   if (features) {
     try {
       parsedFeatures = typeof features === 'string' ? JSON.parse(features) : features;
     } catch {
       parsedFeatures = features.split(',');
     }
   }


   const offer = await Offer.create({
     title,
     description,
     publishDate,
     city,
     previewImage: previewImagePath,
     photos: processedPhotos,
     isPremium,
     isFavorite,
     rating,
     type,
     rooms,
     guests,
     price,
     features: parsedFeatures,
     commentsCount,
     latitude,
     longitude,
     authorId: userId
   });


   return res.status(201).json(offer);
 } catch (error) {
   next(ApiError.internal('Не удалось добавить предложение: ' + error.message));
 }
}
export const getFavoriteOffers = async (req, res, next) => {
  try {
    const favoriteOffers = await Offer.findAll({
      where: { isFavorite: true }
    });

    const adaptedOffers = favoriteOffers.map(adaptOfferToClient);
    res.json(adaptedOffers);
  } catch (error) {
    console.error(error);
    next(ApiError.internal('Ошибка при получении избранных предложений'));
  }
};
export const toggleFavorite = async (req, res, next) => {
  try {
    const { offerId, status } = req.params;

    const offer = await Offer.findByPk(offerId);
    if (!offer) {
      return next(ApiError.notFound('Предложение не найдено'));
    }

    offer.isFavorite = status === '1';
    await offer.save();

    const adaptedOffer = adaptOfferToClient(offer);
    res.json(adaptedOffer);
  } catch (error) {
    console.error(error);
    next(ApiError.internal('Ошибка при обновлении статуса избранного'));
  }
};
export { getAllOffers };