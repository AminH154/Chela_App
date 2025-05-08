import express from 'express'
import { protectRoute } from '../midleware/auth.midleware.js'
import { GetUsers } from '../controllers/message.controller.js';

const router=express.Router();

router.get('/getUsers',protectRoute,GetUsers)

export default router;