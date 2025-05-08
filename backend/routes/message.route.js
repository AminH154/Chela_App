import express from 'express'
import { protectRoute } from '../midleware/auth.midleware.js'
import { GetUsers,GetUser } from '../controllers/message.controller.js';

const router=express.Router();

router.get('/getUsers',protectRoute,GetUsers);
router.get('/getUser',protectRoute,GetUser);




export default router;