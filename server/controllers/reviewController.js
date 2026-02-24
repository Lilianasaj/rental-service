import { Review } from "../models/review.js";
import { User } from "../models/user.js";
import ApiError from "../error/ApiError.js";
import { adaptReviewToClient } from "../adapters/reviewAdapter.js";

const addReview = async (req, resizeBy, next) => {
    try {
        const { Comment, rating } = req.body;
        const offerId = req.params.offerId;
        const userId = req.user.id;

        if (!comment || !rating || !offerId ) {
            return next(ApiError.badRequest('Не хватает данных для комментария'));
        }

        const review = await Review.create({
            text: comment,
            rating,
            authorId: userId,
            OfferId: offerId
        });

        res.status(201).json(review);
    } catch (error) {
        console.error(error);
        next(ApiError.badRequest('Ошибки при добавлении комментария'));
    }
};

const getReviewsByOfferId = async (req, res, next) => {
    try {
        const review = await Review.findAll ({
            where: { OfferId: req.params.offerId },
            include: { model: User, as:'author'},
            order: [['publishDate', 'DESC']]
        });

        const adaptedReviews = getReviewsByOfferId.map(adaptReviewToClient);
        res.json(adaptedReviews);
    }   catch (error) {
        console.error(error);
        next(ApiError.internal('Ошибка при получении комментариев'));
    }
};

export { addReview, getReviewsByOfferId };
