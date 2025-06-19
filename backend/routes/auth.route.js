import express from 'express';
import { SignUp,LogIn,LogOut,UpdateProfile,isAuth,VerfierEmail,pendingUserCancel} from '../controllers/auth.controller.js';
import { protectRoute } from '../midleware/auth.midleware.js';

const router=express.Router();

router.post('/signUp',SignUp);
router.post('/logIn',LogIn);
router.post('/logOut',LogOut);
router.put('/UpdateProfile', protectRoute ,UpdateProfile);
router.post('/verify',VerfierEmail); 
router.post('/pendingUserCancel', pendingUserCancel);
router.get('/isAuth',protectRoute,isAuth);


export default router;