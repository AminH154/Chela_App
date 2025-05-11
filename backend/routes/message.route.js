import express from 'express'
import { protectRoute } from '../midleware/auth.midleware.js'
import { GetUsers,GetUser,GetMessages,PostMessages } from '../controllers/message.controller.js';

const router=express.Router();

router.get('/getUsers',protectRoute,GetUsers);
router.get('/getUser',protectRoute,GetUser);
router.post('/send/:id',protectRoute,PostMessages);
router.get('/:id',protectRoute,GetMessages);


export default router;