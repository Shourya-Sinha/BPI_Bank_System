import { Router } from "express";
import authRoute from './AuthRoute.js';
import adminRoute from './AdminRoute.js';
import userRoute from './UserRoute.js';

const router = Router();

router.use('/auth/user',authRoute);
router.use('/admin',adminRoute);
router.use('/user',userRoute);

export default router;