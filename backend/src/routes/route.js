import express from 'express';
import { signup, login, logout,updateProfile, checkAuth } from '../controllers/route_controller.js';
import { ProtectRoute } from '../middleware/authenticate.js';
const router = express.Router();


router.post('/signup',signup)
router.post('/login', login)
router.post('/logout',logout)

router.put('/update-profile',ProtectRoute,updateProfile)

router.get('/check',ProtectRoute, checkAuth)

export default router;
