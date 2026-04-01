import { Router } from 'express';
import upload from '../middleware/upload.js';
import { 
    createOffer, 
    getAllOffers, 
    getFullOffer, 
    getFavoriteOffers, 
    toggleFavorite 
} from '../controllers/offerController.js';
import { authenticateToken } from '../middleware/authMiddleware.js';

const router = new Router();

// Порядок важен! Статические пути перед динамическими (:id)
router.get('/offers', getAllOffers);
router.get('/favorite', getFavoriteOffers); 
router.get('/offers/:id', getFullOffer);

// Маршруты, требующие токен или загрузку файлов
router.post('/favorite/:offerId/:status', authenticateToken, toggleFavorite);

router.post('/offers', upload.fields([
    { name: 'previewImage', maxCount: 1 },
    { name: 'photos', maxCount: 6 }
]), createOffer);


export default router;