import { Offer } from '../models/offer.js';

async function getAllOffers(req, res, next) {
  try {
    const offers = await Offer.findAll();
    return res.status(200).json(offers);
  } catch (error) {
    console.error('Не удалось получить список предложений:', error);
    return res.status(500).json({ message: 'Ошибка сервера' });
  }
}

export { getAllOffers };
