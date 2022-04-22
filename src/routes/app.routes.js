import { Router } from 'express';
import * as favoriteCtrl from '../controllers/favorites.controller';
import { verifyToken } from '../middlewares';

const router = Router();

router.post('/', verifyToken, favoriteCtrl.createFavorite);
router.get('/', verifyToken, favoriteCtrl.getFavorites);
router.get('/:id', verifyToken, favoriteCtrl.getFavoritesById);
router.delete('/:id', verifyToken, favoriteCtrl.deleteFavoriteById);

export default router;
