import { Router } from "express";
import {
  blockUser,
  getAdminDetails,
  getAllTransactionsAdmin,
  getAllUser,
  getAllUsersExceptAdmin,
  getAllUserTransactions,
  getMonthlyTransactions,
  getRecentUsers,
  getSingleUser,
  getTodayTransactions,
  getWeeklyTransactions,
  getYearlyTransactions,
  isAdmin,
  loginAdmin,
  protect,
  unBlockUser,
  updateAccountStatus,
} from "../Controllers/AuthController.js";

const router = Router();

router.post("/block-user", protect, blockUser);
router.post("/unblock-user", protect, unBlockUser);
router.post("/get-singleUser", protect, isAdmin, getSingleUser);
router.post("/get-allUser", protect, isAdmin, getAllUser);
router.post("/login-admin", loginAdmin);

router.get("/today-transactions", protect, isAdmin, getTodayTransactions);
router.get("/get-all-user-transa", protect, isAdmin, getAllTransactionsAdmin);

router.get("/users/non-admin",protect,isAdmin, getAllUsersExceptAdmin);
router.get("/users/recent", protect, isAdmin, getRecentUsers);
router.get("/transactions/weekly", protect, isAdmin, getWeeklyTransactions);
router.get("/transactions/monthly", protect, isAdmin, getMonthlyTransactions);
router.get("/transactions/yearly", protect, isAdmin, getYearlyTransactions);
router.post('/update-account-status',protect,isAdmin,updateAccountStatus);
router.get('/get-admin-details',protect,isAdmin,getAdminDetails);

export default router;
