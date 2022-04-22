import { Router } from 'express';
import * as userCtrl from '../controllers/user.controller';

const router = Router();

router.get('/users', userCtrl.user);

export default router;
