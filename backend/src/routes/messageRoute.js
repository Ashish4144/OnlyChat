import express from 'express';
import { ProtectRoute } from '../middleware/authenticate.js';
import { getUsersForSidebar,getMessages, sendMessage } from '../controllers/message_controller.js';  //Import karo auto nahi hota

const router = express.Router();

router.get('/users',ProtectRoute, getUsersForSidebar);
router.get('/:id',ProtectRoute,getMessages);
router.post('/send/:id',ProtectRoute,sendMessage); 



export default router;