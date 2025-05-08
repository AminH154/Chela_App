import express from 'express';
import { SignUp,LogIn,LogOut,UpdateProfile} from '../controllers/auth.controller.js';
import { protectRoute } from '../midleware/auth.midleware.js';

const router=express.Router();

router.post('/signUp',SignUp);
router.post('/logIn',LogIn);
router.post('/logOut',LogOut);
router.put('/UpdateProfile', protectRoute ,UpdateProfile);



export default router;