import { Router } from "express";
import {
  checkBalance,
  createBankAccount,
  depositMoney,
  getTransactionById,
  getTransactionHistory,
  getUserBankDetails,
  getUserDepositRequests,
  getUserDetails,
  getUserEditedHistories,
  getUserLoginDetails,
  initiateTransaction,
  initiateTransactionAnotherBank,
  protect,
  sendDepositRequest,
  updateDetails,
  uploadUserAvatar,
  verifyBankAccount,
  withdrawMoney,
} from "../Controllers/AuthController.js";
import {
  handleFileSizeError,
  uploadDocuments,
  uploadPhoto,
} from "../Utils/UPloadImages.js";

const router = Router();

router.post("/create-new-transaction", protect, initiateTransaction);
router.post('/create-transaction-anotherbank',protect,initiateTransactionAnotherBank);
router.post(
  "/create-bank-account",
  protect,
  uploadDocuments.single("files"),
  createBankAccount
);
router.post("/verify-account", protect, verifyBankAccount);
router.post("/check-balance", protect, checkBalance);

router.get("/get-my-Transc", protect, getTransactionById);
router.post("/deposite-money", protect, depositMoney);
router.post("/withdraw-money", protect, withdrawMoney);
router.get("/get-myTransaction", protect, getTransactionHistory);

router.post("/update-details", protect, updateDetails);
router.get('/get-my-details',protect,getUserDetails);
// router.get("/get-bank-details", protect, getUserBankDetails);
router.get("/get-bank-details", protect, getUserBankDetails);
router.post("/send-request-deposite", protect,sendDepositRequest);
router.get('/get-my-deposite',protect,getUserDepositRequests);
router.get('/get-login-details',protect,getUserLoginDetails);

router.post(
  "/update-image",
  protect,
  uploadPhoto.single("avatar"),
  handleFileSizeError,
  uploadUserAvatar
);

router.get('/edited-transaction-history',protect,getUserEditedHistories);

export default router;
