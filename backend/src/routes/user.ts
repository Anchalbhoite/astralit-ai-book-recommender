import { Router } from 'express';
import auth from '../middleware/auth';
import { getProfile, updatePreferences, addToReadingList, getReadingList, syncLocalData } from '../controllers/userController';


const router = Router();


router.get('/profile', auth, getProfile);
router.put('/preferences', auth, updatePreferences);
router.post('/reading-list', auth, addToReadingList);
router.get('/reading-list', auth, getReadingList);
router.post('/sync', auth, syncLocalData);


export default router;