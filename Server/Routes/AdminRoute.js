import { Router } from "express";
import {
  approveDepositRequest,
  blockUser,
  createCreditEditedHistoryForUser,
  createEditedHistoryForUser,
  deleteAllUserInfoAdmin,
  deleteUserEditedHistory,
  getAdminDepositRequests,
  getAdminDetails,
  getAllTransactionsAdmin,
  getAllUser,
  getAllUserForAdmin,
  getAllUsersExceptAdmin,
  getAllUserTransactions,
  getEditedHistoryOfUser,
  getMonthlyTransactions,
  getRecentUsers,
  getSingleUser,
  getSingleUserData,
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

router.patch('/approve-deposit/:transactionId',protect,isAdmin,approveDepositRequest);
router.get('/get-user-deposite-request',protect,isAdmin,getAdminDepositRequests);

router.post('/createEdited-transaction',protect,isAdmin,createEditedHistoryForUser);
router.post('/create-creditEdited-transaction',protect,isAdmin,createCreditEditedHistoryForUser);

router.get('/get-sigle-user/:userId',protect,isAdmin,getSingleUserData);
router.get('/getAll-user-for-admin',protect,isAdmin,getAllUserForAdmin);
router.delete('/delete-user-edited-history/:userId/:editedHistoryId', protect, isAdmin, deleteUserEditedHistory);
router.post('/delete-user-recorded-history/:userId',protect,isAdmin,deleteAllUserInfoAdmin);
router.get('/getuser-edited-data',protect,isAdmin,getEditedHistoryOfUser);
export default router;
