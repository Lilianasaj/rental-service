import { Router } from "express";
import upload from "../middleware/upload.js";
import { registration } from '../controllers/userController.js';
import { login, checkAuth, logout } from '../controllers/userController.js';
import { authenticateToken } from '../middleware/authMiddleware.js'; // ← добавить

const router = new Router();

router.post('/login', login);
router.post('/register', upload.single('avatar'), registration);
router.get('/login', authenticateToken, checkAuth);
router.delete('/logout', authenticateToken, logout);

export default router;