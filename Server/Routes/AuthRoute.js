import { Router } from "express";
import { loginUser, logout, registerUser, resetPassowrdforToken, sendOtp, sendTokenForForgotPassowrd, verifyOtp } from "../Controllers/AuthController.js";

const router = Router();

router.post('/register',registerUser,sendOtp);
router.post('/send-otp',sendOtp);
router.post('/verify-otp',verifyOtp);
router.post('/login',loginUser);
router.post('/send-token',sendTokenForForgotPassowrd);
router.post('/reset-passwword',resetPassowrdforToken);
router.post('/logout',logout);

export default router;