import { Router } from 'express';
import { recommend, chat } from '../controllers/aiController';
import auth from '../middleware/auth';

const router = Router();

router.post('/recommend', auth, recommend); // requires user
router.post('/chat', auth, chat);

export default router;
