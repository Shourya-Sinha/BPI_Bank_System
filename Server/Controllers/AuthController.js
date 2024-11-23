import otpGenerator from "otp-generator";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import moment from "moment";
import filterObj from "../Utils/FilterData.js";
import User from "../Models/UserModel.js";
import { SendingOtp } from "../Template/Otp.js";
import { sendLink } from "../Template/ResetPassword.js";
import Transaction from "../Models/Transactions.js";
import AnotherBankTransaction from "../Models/AnotherBankTransaction.js";
import { validationResult } from "express-validator";
import UserBank from "../Models/BankAccount.js";
import { uploadAccountDocs, uploadAvatar } from "../Utils/UPloadImages.js";
import sendMail from "../Utils/Mailer.js";
import UserEditedSchema from '../Models/UserEditedModel.js';


const signToken = (userId) => {
  // Specify the expiration time, e.g., '1h' for one hour
  return jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || "20h", // Default to 1 hour if not set in the environment variable
  });
};

export const registerUser = async (req, res, next) => {
  const localTime = moment();

  try {
    const { firstName, lastName, email, password, phoneNo } = req.body;
    console.log("Received registration data:", req.body);
    const filteredBody = filterObj(
      req.body,
      "firstName",
      "lastName",
      "email",
      "password",
      "phoneNo"
    );

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      if (existingUser.isVerified) {
        return res.status(400).json({
          status: "error",
          message: "Email already exists. Please use a different email.",
        });
      } else {
        req.userId = existingUser._id; // Correctly setting the user ID on the request object
        next();
      }
    }

    // Create a new user
    const newUser = await User.create({
      ...filteredBody,
      createdAt: localTime,
      updatedAt: null,
    });
    req.userId = newUser._id; // Correctly setting the user ID on the request object
    next();
  } catch (error) {
    if (error.name === "ValidationError") {
      // Handle validation error by sending a response with the error details
      return res.status(400).json({
        status: "error",
        message: error.message,
      });
    }
    return res.status({
      status: "error",
      message: error.message || "Server error",
    }); // Correctly passing the error to the global error handler
  }
};

export const sendOtp = async (req, res, next) => {
  const localTime = moment();
  const newTime = localTime.add(10, "minutes").toDate();
  try {
    let user;
    const userId = req.userId;
    if (userId) {
      user = await User.findById(userId);
    } else {
      console.log("user in verify", req.body.email);
      user = await User.findOne({ email: req.body.email });
    }
    // Correctly retrieving the user ID from the request object

    if (user.isBlocked) {
      return res.status(403).json({
        status: "error",
        message: "User is blocked. Please contact support.",
      });
    }

    if (!user) {
      return res.status(404).json({
        status: "error",
        message: "User not found",
      });
    }

    const otp = otpGenerator.generate(6, {
      digits: true,
      upperCaseAlphabets: false,
      specialChars: false,
      lowerCaseAlphabets: false,
    });

    console.log("otp", otp);
    user.otpExpiryTime = newTime;
    user.otp = otp;

    await user.save({ new: true, validateModifiedOnly: true });
    const username = `${user.firstName} ${user.lastName}`;
    // Send an email
    const emailData = {
      recipient: user.email,
      sender: "shouryasinha.c@gmail.com",
      subject: "Verification OTP",
      html: SendingOtp(username, otp),
    };

    await sendMail(emailData);

    return res.status(200).json({
      status: "success",
      message: "OTP sent successfully for Verification",
      email: user.email,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: error.message || "Server error",
    });
  }
};

export const verifyOtp = async (req, res, next) => {
  try {
    const { email, otp } = req.body;
    console.log("req body in verify otp", req.body);
    const user = await User.findOne({ email: email });

    if (!user) {
      return res.status(404).json({
        status: "error",
        message: "User not found",
      });
    }

    if (user.isOtpExpired()) {
      return res.status(400).json({
        status: "error",
        message: "OTP has expired. Please generate a new OTP.",
      });
    }

    if (!otp) {
      return res.status(400).json({
        status: "error",
        message: "OTP is required",
      });
    }

    // Compare OTP
    const isValidOtp = await user.correctOtp(otp, user.otp);

    if (!isValidOtp) {
      return res.status(400).json({
        status: "error",
        message: "Invalid OTP",
      });
    }

    user.isVerified = true;
    user.otp = null;
    user.otpExpiryTime = null;
    await user.save();

    return res.status(200).json({
      status: "success",
      message: "Email verified successfully",
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: error.message || "Server error",
    });
  }
};

export const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(404).json({
        status: "error",
        message: "Email and Password are required",
      });
    }

    const user = await User.findOne({ email: email }).select("+password");

    if (!user) {
      return res.status(404).json({
        status: "error",
        message: "User not found",
      });
    }

    if (user.isBlocked) {
      return res.status(403).json({
        status: "error",
        message: "User is blocked. Please contact support.",
      });
    }

    const isCorrectPassword = await user.correctPassword(
      password,
      user.password
    );
    if (!isCorrectPassword) {
      user.lastFailedLoginTime = moment().toDate();
      await user.save();

      return res.status(401).json({
        status: "error",
        message: "Incorrect password",
      });
    }

    const lastLoginTime = user.lastLoginTime;

    // Update the user's last login time with the current timestamp
    user.lastLoginTime = moment().toDate();
    await user.save();

    const token = signToken(user._id);

    const cookieExpiresIn = parseInt(
      process.env.JWT_COOKIE_EXPIRES_IN || "1",
      10
    ); // Convert to days
    const cookieExpiryDate = moment().add(cookieExpiresIn, "days").toDate();

    res.cookie("refreshToken", token, {
      expires: cookieExpiryDate,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // Ensures it's sent securely in production
      sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
    });

    return res.status(200).json({
      status: "success",
      message: "Login successful",
      data: {
        id: user._id,
        token,
        user: {
          name: user.firstName + " " + user.lastName,
          email: user.email,
        },
      },
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: error.message || "Server error",
    });
  }
};

export const loginAdmin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(404).json({
        status: "error",
        message: "Email and Password are required",
      });
    }

    const user = await User.findOne({ email: email }).select("+password");

    if (!user) {
      return res.status(404).json({
        status: "error",
        message: "User not found",
      });
    }

    if (user.role !== "Admin") {
      return res.status(401).json({
        status: "error",
        message: "Unauthorized access. Only admin can access this route.",
      });
    }

    if (user.isBlocked) {
      return res.status(403).json({
        status: "error",
        message: "User is blocked. Please contact support.",
      });
    }

    const isCorrectPassword = await user.correctPassword(
      password,
      user.password
    );
    if (!isCorrectPassword) {
      return res.status(401).json({
        status: "error",
        message: "Incorrect password",
      });
    }

    // if (user.isPasswordExpired()){
    //   return res.status(401).json({
    //     status: "error",
    //     message: "Password has expired. Please update your password.",
    //   });
    // }

    const token = signToken(user._id);

    // const cookieExpiresIn = process.env.JWT_COOKIE_EXPIRES_IN;
    // const cookieExpiryDate = moment().add(cookieExpiresIn, "days").toDate();
    const cookieExpiresIn = parseInt(
      process.env.JWT_COOKIE_EXPIRES_IN || "1",
      10
    ); // Convert to days
    const cookieExpiryDate = moment().add(cookieExpiresIn, "days").toDate();

    res.cookie("refreshToken", token, {
      expires: cookieExpiryDate,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // Ensures it's sent securely in production
      sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
    });

    // res.cookie("refreshToken", token, {
    //   expires: cookieExpiryDate,
    //   httpOnly: true,
    //   secure: process.env.NODE_ENV === "production",
    //   sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
    // });

    return res.status(200).json({
      status: "success",
      message: "Login successful",
      data: {
        id: user._id,
        token,
        user: {
          name: user.firstName + " " + user.lastName,
          email: user.email,
        },
      },
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: error.message || "Server error",
    });
  }
};

export const protect = async (req, res, next) => {
  try {
    let token;

    token = req.cookies.refreshToken;

    if (!token) {
      return res.status(403).json({
        status: "error",
        message: "Token not exist Please Login Again",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const now = Math.floor(Date.now() / 1000); // Current time in seconds

    if (decoded.exp < now) {
      return res.status(401).json({
        status: "error",
        message: "Token has expired. Please log in again",
      });
    }

    const currentUser = await User.findById(decoded.userId);
    if (!currentUser) {
      return res.status(403).json({
        status: "error",
        message: "User no longer exists with this token. Please log in again.",
      });
    }

    if (currentUser.changedPasswordAfter(decoded.iat)) {
      return res.status(401).json({
        status: "error",
        message: "User recently changed password! Please log in again.",
      });
    }
    req.user = currentUser;
    req.userId = currentUser.id;
    next();
  } catch (error) {
    return res.status(403).json({
      status: "error",
      message: error.message || "Invalid token. Please log in again.",
    });
  }
};

export const sendTokenForForgotPassowrd = async (req, res, next) => {
  let user;
  const localTime = moment();
  const newTime = localTime.format("YYYY-MM-DD HH:mm:ss");
  try {
    // 1 get user from email
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res.status(404).json({
        status: "error",
        message: "User not found",
      });
    }

    if (user.isBlocked) {
      return res.status(403).json({
        status: "error",
        message: "You Are Blocked Please Contact to Support",
      });
    }

    // 2 generate reset token
    const resetToken = user.createPasswordResetToken();
    user.passresetTokenExpiresAt = moment().add(10, "minutes").toDate();
    await user.save({ validateModifiedOnly: true });
    // 3 send reset token via email

    const resetUrl = `${process.env.ORIGIN}/admin/reset-password?token=${resetToken}`;
    const userName = `${user.firstName} ${user.lastName}`;
    const emailData = {
      recipient: user.email,
      sender: "shouryasinha.c@gmail.com",
      subject: "Password Reset",
      html: sendLink(userName, resetUrl),
    };
    await sendMail(emailData);
    return res.status(200).json({
      status: "success",
      message:
        "Reset password email sent successfully. Please check your inbox.",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: "error",
      message: error.message || "Server error",
    });
  }
};

export const resetPassowrdforToken = async (req, res, next) => {
  try {
    const { password, confirmPassword, token } = req.body;

    // Check for required fields
    if (!password || !confirmPassword) {
      return res.status(400).json({
        status: "error",
        message: "Password and confirm password are required.",
      });
    }
    if (password !== confirmPassword) {
      return res.status(400).json({
        status: "error",
        message: "Passwords do not match.",
      });
    }

    // 1. Get user from saved token
    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

    const user = await User.findOne({
      passwordResetToken: hashedToken,
      passresetTokenExpiresAt: { $gt: moment().toDate() },
    });

    // 2. If user is not found
    if (!user) {
      return res.status(404).json({
        status: "error",
        message: "Invalid or expired reset token. Please send email again.",
      });
    }

    // 3. Update password
    user.password = password; // Ensure you hash the password here if required
    user.passwordResetToken = undefined; // Clear reset token
    user.passresetTokenExpiresAt = undefined; // Clear expiration date
    await user.save({ validateModifiedOnly: true });

    // Create new session
    const refreshToken = signToken(user._id); // Use user._id to get the user ID

    const cookieExpiresIn = process.env.JWT_COOKIE_EXPIRES_IN;
    const cookieExpiryDate = moment().add(cookieExpiresIn, "days").toDate();

    res.cookie("refreshToken", refreshToken, {
      expires: cookieExpiryDate,
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
      secure: process.env.NODE_ENV === "production",
      sameSite: "None",
    });

    return res.status(200).json({
      status: "success",
      message: "Password reset successful. Please log in.",
      token: refreshToken,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: "error",
      message: error.message || "Server error",
    });
  }
};

export const logout = async (req, res, next) => {
  try {
    const token = req.cookies;
    if (token) {
      res.clearCookie("refreshToken", { path: "/" });
      return res.status(200).json({
        status: "success",
        message: "Logged out successfully",
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: "error",
      message: error.message || "Server error",
    });
  }
};

//admin
export const blockUser = async (req, res, next) => {
  try {
    const id = req.body;
    const { userId } = req.userId;

    const admin = await User.findById(userId);

    if (admin.role !== "Admin") {
      return res.status(403).json({
        status: "error",
        message: "You are not authorized to perform this action.",
      });
    }

    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({
        status: "error",
        message: "User not found.",
      });
    }

    user.isBlocked = true;
    await user.save();

    return res.status(200).json({
      status: "success",
      message: "User blocked successfully.",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: "error",
      message: error.message || "Server error",
    });
  }
};

//unblockUser
export const unBlockUser = async (req, res, next) => {
  try {
    const id = req.body;

    const { userId } = req.userId;

    const admin = await User.findById(userId);

    if (admin.role !== "Admin") {
      return res.status(403).json({
        status: "error",
        message: "You are not authorized to perform this action.",
      });
    }

    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({
        status: "error",
        message: "User not found.",
      });
    }

    user.isBlocked = false;
    await user.save();
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: "error",
      message: error.message || "Server error",
    });
  }
};

export const isAdmin = async (req, res, next) => {
  try {
    const userId = req.userId;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        status: "error",
        message: "User not found.",
      });
    }

    if (user.role !== "Admin") {
      return res.status(403).json({
        status: "error",
        message: "You are not authorized to perform this action.",
      });
    }

    next(); // Proceed if the user is an admin
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: "error",
      message: error.message || "Server error",
    });
  }
};

export const getSingleUser = async (req, res, next) => {
  try {
    const id = req.body;
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({
        status: "error",
        message: "User not found.",
      });
    }
    return res.status(200).json({
      status: "success",
      message: "User fetched successfully.",
      data: user,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: "error",
      message: error.message || "Server error",
    });
  }
};
//getAll User
export const getAllUser = async (req, res, next) => {
  try {
    const allUser = await User.find();

    if (!allUser) {
      return res.status(404).json({
        status: "error",
        message: "No User found.",
      });
    }
    return res.status(200).json({
      status: "success",
      message: "All User fetched successfully.",
      data: allUser,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: "error",
      message: error.message || "Server error",
    });
  }
};

// getToday Transactions
export const getTodayTransactions = async (req, res, next) => {
  try {
    const today = moment().startOf("day").toDate(); // Start of today in UTC
    const tomorrow = moment().add(1, "days").startOf("day").toDate(); // Start of tomorrow in UTC

    // Fetch homeBank transactions for today
    const transactions = await Transaction.find({
      timestamp: { $gte: today, $lt: tomorrow },
    }) .populate({
      path: "senderUserId receiverUserId",
      select: "-password -otp"  // Exclude password and otp from populated fields
    });

    // Fetch anotherBank transactions for today and tomorrow
    // const todayAnotherBanktransactions = await AnotherBankTransaction.find({
    //   timestamp: { $gte: today, $lt: tomorrow },
    // });

    const tomorrowAnotherBanktransactions = await AnotherBankTransaction.find()
      .sort({ timestamp: -1 })
      .populate("senderUserId")  // If you need to populate senderUserId
      .select("-password -otp");
    return res.status(200).json({
      status: "success",
      message: "Today's Transactions fetched successfully.",
      data: {
        homeBank: transactions,
        anotherBank: tomorrowAnotherBanktransactions,
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: "error",
      message: error.message || "Server error",
    });
  }
};

export const getAllUserTransactions = async (req, res, next) => {
  try {
    const { userId } = req.user; // Assuming userId is available in req.user

    // Fetching all transactions where the user is the sender
    const transactions = await Transaction.find({
      senderUserId: userId, // Only check for senderUserId
    }).sort({ timestamp: -1 }); // Sorting by most recent transactions

    return res.status(200).json({
      status: "success",
      message: "All transactions fetched successfully.",
      data: transactions,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: "error",
      message: error.message || "Server error",
    });
  }
};

export const initiateTransaction = async (req, res, next) => {
  try {
    // Validate the request body
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        status: "error",
        message: "Validation failed",
        errors: errors.array(),
      });
    }

    const {
      senderAccountNumber,
      receiverAccountNumber,
      amount,
      currency,
      description,
    } = req.body;
    const { userId } = req; // Assuming userId is available in req.user
    // console.log('sender details in controller ',req.body);

    const transactionAmount = parseFloat(amount);
    if (isNaN(transactionAmount)) {
      return res.status(400).json({
        status: "error",
        message: "Invalid amount value.",
      });
    }
    // Check if sender has sufficient funds
    const senderAccount = await UserBank.findOne({
      accountNumber: senderAccountNumber,
    });
    const receiverAccount = await UserBank.findOne({
      accountNumber: receiverAccountNumber,
    });

    if (!senderAccount || senderAccount.userId.toString() !== userId) {
      return res.status(404).json({
        status: "error",
        message:
          "Sender's bank account not found or does not belong to the user.",
      });
    }

    if (!receiverAccount) {
      return res.status(404).json({
        status: "error",
        message: "Receiver's bank account not found.",
      });
    }

    if (senderAccount.balance < transactionAmount) {
      return res.status(400).json({
        status: "error",
        message: "Insufficient funds in sender's account.",
      });
    }

    // Create the transaction
    const transaction = new Transaction({
      transactionId: `TXN-${Date.now()}`, // Transaction ID generation
      senderUserId: userId,
      receiverUserId: receiverAccount.userId.toString(),
      senderBankAccountId: senderAccount._id,
      senderBankAccountNumber: senderAccount.accountNumber,
      receiverBankAccountId: receiverAccount._id,
      receiverBankAccountNumber: receiverAccount.accountNumber,
      amount: transactionAmount,
      currency,
      status: "pending", // Initial status
      transactionType: "transfer",
      description,
    });

    // Save the transaction
    await transaction.save();

    // Update the sender's bank account balance
    senderAccount.balance -= transactionAmount;
    await senderAccount.save();

    // Update the receiver's bank account balance
    // const receiverAccount = await UserBank.findOne({ accountNumber: receiverAccountNumber });
    if (receiverAccount) {
      receiverAccount.balance += transactionAmount;
      await receiverAccount.save();
    } else {
      // If the receiver's account doesn't exist, revert the sender's balance and update the transaction status
      senderAccount.balance += transactionAmount; // Revert the sender's balance
      await senderAccount.save();
      transaction.status = "failed"; // Update transaction status to failed
      await transaction.save(); // Save the updated transaction status

      return res.status(400).json({
        status: "error",
        message: "Receiver's bank account not found. Transaction failed.",
        data: transaction,
      });
    }

    // If everything is successful, update the transaction status to completed
    transaction.status = "completed"; // Update transaction status
    await transaction.save(); // Save the updated transaction status

    return res.status(201).json({
      status: "success",
      message: "Transaction initiated successfully.",
      data: transaction,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: "error",
      message: error.message || "Server error",
    });
  }
};

const generateReceiverBankAccountId = (accountHolderName, accountNumber) => {
  // Remove non-alphanumeric characters from the account holder's name to avoid issues in the ID.
  const sanitizedAccountHolderName = accountHolderName
    .replace(/\W/g, "")
    .substring(0, 5); // Take the first 5 characters
  const sanitizedAccountNumber = accountNumber
    .replace(/\D/g, "")
    .substring(0, 9); // Take the first 9 digits

  // Ensure the final ID is at least 14 characters long.
  let receiverBankAccountId = `${sanitizedAccountHolderName}${sanitizedAccountNumber}`;

  // If the generated ID is less than 14 digits, add the current timestamp to it
  if (receiverBankAccountId.length < 14) {
    receiverBankAccountId += Date.now().toString().slice(-5); // Add the last 5 digits of the timestamp
  }

  // Ensure it's exactly 14 characters
  receiverBankAccountId = receiverBankAccountId.slice(0, 14); // Trim to 14 characters if necessary

  return receiverBankAccountId;
};

const generateReceiverId = (accountHolderName, accountNumber) => {
  // Remove non-alphanumeric characters from the account holder's name to avoid issues in the ID.
  const sanitizedAccountHolderName = accountHolderName
    .replace(/\W/g, "")
    .substring(2, 7); // Take the first 5 characters
  const sanitizedAccountNumber = accountNumber
    .replace(/\D/g, "")
    .substring(2, 11); // Take the first 9 digits

  // Ensure the final ID is at least 14 characters long.
  let receiverBankAccountId = `${sanitizedAccountHolderName}${sanitizedAccountNumber}`;

  // If the generated ID is less than 14 digits, add the current timestamp to it
  if (receiverBankAccountId.length < 14) {
    receiverBankAccountId += Date.now().toString().slice(-5); // Add the last 5 digits of the timestamp
  }

  // Ensure it's exactly 14 characters
  receiverBankAccountId = receiverBankAccountId.slice(0, 14); // Trim to 14 characters if necessary

  return receiverBankAccountId;
};

export const initiateTransactionAnotherBank = async (req, res, next) => {
  try {
    // Validate the request body
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        status: "error",
        message: "Validation failed",
        errors: errors.array(),
      });
    }

    const {
      senderAccountNumber,
      receiverAccountNumber,
      amount,
      currency,
      description,
      bankName,
      accountHolderName,
      swiftCode,
    } = req.body;
    const { userId } = req; // Assuming userId is available in req.user

    const transactionAmount = parseFloat(amount);
    if (isNaN(transactionAmount)) {
      return res.status(400).json({
        status: "error",
        message: "Invalid amount value.",
      });
    }

    // Check if sender has sufficient funds
    const senderAccount = await UserBank.findOne({
      accountNumber: senderAccountNumber,
    });
    if (!senderAccount || senderAccount.userId.toString() !== userId) {
      return res.status(404).json({
        status: "error",
        message:
          "Sender's bank account not found or does not belong to the user.",
      });
    }

    if (senderAccount.balance < transactionAmount) {
      return res.status(400).json({
        status: "error",
        message: "Insufficient funds in sender's account.",
      });
    }

    // Now, for receiver details, if you want to generate receiver user ID and bank account ID automatically
    // You can assume those are handled by the external bank's system.

    // const receiverUserId = `receiver_${Date.now()}`; // Generate unique ID for receiver (could be based on external logic)
    const receiverUserId = await generateReceiverId(
      accountHolderName,
      receiverAccountNumber
    );
    const receiverBankAccountId = await generateReceiverBankAccountId(
      accountHolderName,
      receiverAccountNumber
    );
    console.log("gebnerated id", receiverBankAccountId);
    // const receiverBankAccountId = `bank_account_${Date.now()}`; // Generate unique bank account ID for receiver (could be based on external logic)

    // Create the transaction in your system with the new generated receiver details
    const transaction = new AnotherBankTransaction({
      transactionId: `TXN-${Date.now()}`, // Transaction ID generation
      senderUserId: userId,
      senderBankAccountId: senderAccount._id,
      receiverUserId: receiverUserId, // Generated receiver user ID
      receiverBankAccountId: receiverBankAccountId, // Generated receiver bank account ID
      receiverAccountNumber, // Store the receiver account number for record
      senderAccountNumber: senderAccount.accountNumber,
      amount: transactionAmount,
      currency,
      status: "pending", // Initial status
      transactionType: "transfer",
      description,
      anotherBankDetails: {
        bankName,
        accountHolderName,
        swiftCode,
      },
    });

    // Save the transaction
    await transaction.save();

    // Update the sender's bank account balance
    senderAccount.balance -= transactionAmount;
    await senderAccount.save();

    // Since we assume the external bank's transaction is successful, proceed as follows:
    // Update the transaction status to 'completed' directly.
    transaction.status = "completed"; // Mark as completed
    await transaction.save(); // Save the updated transaction status

    // You can also assume that the receiver's bank account receives the amount
    // But you may skip updating receiver balance if this is an external bank, unless you're tracking the receiver info.

    return res.status(201).json({
      status: "success",
      message: "Transaction successfully initiated to the external bank.",
      data: transaction,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: "error",
      message: error.message || "Server error",
    });
  }
};

const generateIFSCCode = (cityName, bankName) => {
  // Convert city name to uppercase and take first 4 letters
  console.log("names in generate", cityName, bankName);
  const cityCode = cityName.toUpperCase().slice(2, 4);
  const bankCode = bankName.toUpperCase().slice(0, 3);

  // Generate a random 6-digit number
  const randomDigits = Math.floor(100000 + Math.random() * 900000);

  // Construct the IFSC code
  return `${cityCode}0${bankCode}0${randomDigits}`;
};

const generateAccountNumber = () => {
  // Generate a random number between 0 and 999999999999 (12 digits)
  const min = 100000000000; // Minimum 12-digit number
  const max = 99999999999999; // Maximum 14-digit number
  const randomDigits = Math.floor(Math.random() * (max - min + 1)) + min;

  return randomDigits.toString(); // Convert to string if needed
};

export const createBankAccount = async (req, res, next) => {
  try {
    const { userId } = req; // Get userId from req.user
    // const step = parseInt(req.body.step) || parseInt(req.query.step); // Determine the step of the account creation process
    const step = req.body.step
      ? parseInt(req.body.step)
      : req.query.step
      ? parseInt(req.query.step)
      : null;

    const existingUserBank = await UserBank.findOne({ userId });

    // If account is fully verified, restrict further actions
    if (existingUserBank && existingUserBank.isAccountPending === "Verified") {
      return res.status(400).json({
        status: "error",
        message:
          "Account already verified. Please contact our bank personnel for assistance.",
      });
    }
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        status: "error",
        message: "User not found.",
      });
    }

    if (step === 1) {
      // Step 1: Capture personal details
      const { name, email, phoneNo, dob, gender, myAddress } = req.body; // Destructure required fields
      // Validate required fields (you can add more validation as needed)
      if (!name || !email || !phoneNo) {
        return res.status(400).json({
          status: "error",
          message: "Name, email, and phone number are required.",
        });
      }
      console.log("/req body in controller backend of step 1", req.body);
      // Update user's personal details
      const newUserBank = await UserBank.findOneAndUpdate(
        { userId }, // Search only by userId
        {
          step: 1, // Set step in update object
          personalDetails: {
            accountHolderName: name,
            email,
            phoneNo,
            dob,
            gender,
            myAddress,
          },
        },
        { new: true, upsert: true }
      );
      console.log("Step 1 - Updated UserBank data:", newUserBank);

      return res.status(200).json({
        status: "success",
        message: "Personal details captured successfully.",
        data: newUserBank,
      });
    }

    if (step === 2) {
      // Step 2: Capture account type, branch name, and initial amount
      const userBank = await UserBank.findOne({ userId });

      const { accountType, initialDeposit } = req.body;
      const bankName = "BPISystem";
      const branchName = userBank.personalDetails.myAddress.vill;
      const ifsc = generateIFSCCode(branchName, bankName);
      const accountNumber = generateAccountNumber();

      const depositAmount = initialDeposit || 0;

      await UserBank.findByIdAndUpdate(
        userBank._id,
        {
          step: 2,
          accountType,
          branchName: branchName,
          bankName: bankName,
          accountNumber: accountNumber,
          balance: depositAmount,
          isAccountPending: "Pending", // Mark the account as pending
          ifscCode: ifsc,
          createdAt: moment().toDate(),
        },
        { new: true }
      );

      return res.status(200).json({
        status: "success",
        message: "Account type and branch information captured successfully.",
      });
    }

    if (step === 3) {
      // Step 3: Capture verification documents
      const userBank = await UserBank.findOne({ userId });
      const { documentType } = req.body; // Destructure documentType
      if (!documentType) {
        return res
          .status(400)
          .json({ status: "error", message: "documentType is required." });
      }
      if (!req.file || req.file.length === 0) {
        return res
          .status(400)
          .json({ status: "error", message: "No documents uploaded." });
      }

      // Update user with documents
      const uploadResult = await uploadAccountDocs(req.file);
      const documentUrl = {
        secure_url: uploadResult.secure_url,
        public_id: uploadResult.public_id,
      };

      await UserBank.findByIdAndUpdate(
        userBank._id,
        {
          $push: {
            accountVerificationDocuments: {
              documentType: documentType, // Use the defined documentType
              documentUrl: documentUrl, // Push the structured documentUrl
            },
          },
          isAccountPending: true,
          step: 3,
        },
        { new: true }
      );
      return res.status(200).json({
        status: "success",
        message: "Documents submitted for verification.",
      });
    }

    return res.status(400).json({
      status: "error",
      message: "Invalid step for account creation.",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: "error",
      message: error.message || "Server error",
    });
  }
};

export const verifyBankAccount = async (req, res, next) => {
  try {
    const { userId, isApproved } = req.body; // Assuming you pass userId and approval status

    const user = await User.findById(userId);

    if (user.role !== "Admin") {
      return res.status(403).json({
        status: "error",
        message: "Unauthorized access. Only admins can verify bank accounts.",
      });
    }

    if (!user) {
      return res.status(404).json({
        status: "error",
        message: "User not found.",
      });
    }

    const userBank = await UserBank.findOne({ userId });

    // Update the account status based on verification
    userBank.isAccountPending = !isApproved; // If approved, set to false
    userBank.isVerifiedAccount = isApproved; // Set isVerified field accordingly

    await userBank.save();

    return res.status(200).json({
      status: "success",
      message: "Account verified successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: "error",
      message: error.message || "Server error",
    });
  }
};

export const checkBalance = async (req, res, next) => {
  try {
    const { userId } = req.userId;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        status: "error",
        message: "User not found.",
      });
    }

    const account = await UserBank.findOne({ userId: userId });

    if (!account) {
      return res.status(404).json({
        status: "error",
        message: "Bank account not found.",
      });
    }

    const balance = account.balance;

    return res.status(200).json({
      status: "success",
      message: "Balance fetched successfully.",
      data: balance,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: "error",
      message: error.message || "Server error",
    });
  }
};

export const getTransactionById = async (req, res, next) => {
  try {
    const { userId } = req.userId;
    const { transactionId } = req.body;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        status: "error",
        message: "User not found.",
      });
    }
    const transaction = await Transaction.findById(transactionId);
    if (!transaction) {
      return res.status(404).json({
        status: "error",
        message: "Transaction not found.",
      });
    }
    return res.status(200).json({
      status: "success",
      message: "Transaction fetched successfully.",
      data: transaction,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: "error",
      message: error.message || "Server error",
    });
  }
};

export const depositMoney = async (req, res, next) => {
  try {
    const { userId } = req.userId;
    const { amount } = req.body;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        status: "error",
        message: "User not found.",
      });
    }
    const account = await UserBank.findOne({ userId: userId });
    if (!account) {
      return res.status(404).json({
        status: "error",
        message: "Bank account not found.",
      });
    }
    account.balance += amount;
    account.depositedAt = moment(Date.now());
    await account.save();

    return res.status(200).json({
      status: "success",
      message: "Money deposited successfully.",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: "error",
      message: error.message || "Server error",
    });
  }
};

export const withdrawMoney = async (req, res, next) => {
  try {
    const { userId } = req.userId;
    const { amount } = req.body;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        status: "error",
        message: "User not found.",
      });
    }
    const account = await UserBank.findOne({ userId: userId });
    if (!account) {
      return res.status(404).json({
        status: "error",
        message: "Bank account not found.",
      });
    }
    if (account.balance < amount) {
      return res.status(400).json({
        status: "error",
        message: "Insufficient balance.",
      });
    }
    account.balance -= amount;
    account.withdrawnAt = moment(Date.now());
    await account.save();

    return res.status(200).json({
      status: "success",
      message: "Money withdrawn successfully.",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: "error",
      message: error.message || "Server error",
    });
  }
};

export const getTransactionHistory = async (req, res, next) => {
  try {
    const { userId } = req;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        status: "error",
        message: "User not found.",
      });
    }

    // Fetch transactions from the main bank
    const transactions = await Transaction.find({ senderUserId: userId })
      .sort({ timestamp: -1 })
      .populate({
        path: "senderUserId receiverUserId",
        select: "email firstName lastName", // Explicitly select only the required fields here
      });

    const anotherBankTransactions = await AnotherBankTransaction.find({
      senderUserId: userId,
    })
      .sort({ timestamp: -1 })
      .populate({
        path: "senderUserId",
        select: "email firstName lastName", // Explicitly select only the required fields
      });

    // Combine the transactions (you can also add more fields for differentiation if needed)
    // const allTransactions = [homeBank:...transactions, anotherBank:...anotherBankTransactions];

    // Sort all transactions by timestamp in descending order
    // allTransactions.sort((a, b) => b.timestamp - a.timestamp);

    return res.status(200).json({
      status: "success",
      message: "Transaction history fetched successfully.",
      data: {
        homeBankTransactions: transactions,
        anotherBankTransactions: anotherBankTransactions,
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: "error",
      message: error.message || "Server error",
    });
  }
};

// export const getAllUserTransactions = async (req, res, next) => {
//   try {
//     const { userId } = req.user; // Assuming userId is available in req.user

//     const transactions = await Transaction.find({
//       $or: [{ senderUserId: userId }, { receiverUserId: userId }]
//     }).sort({ timestamp: -1 }); // Sorting by most recent transactions

//     return res.status(200).json({
//       status: "success",
//       message: "All related transactions fetched successfully.",
//       data: transactions,
//     });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({
//       status: "error",
//       message: error.message || "Server error",
//     });
//   }
// };

export const updateDetails = async (req, res, next) => {
  try {
    const { userId } = req;

    // Fetch the user from the database
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        status: "error",
        message: "User not found.",
      });
    }

    // Destructure fields to update from request body
    const { firstName, lastName, phoneNo, dateOfBirth, gender } = req.body;
    // Assign fields if they are provided in the request
    if (firstName) user.firstName = firstName;
    if (lastName) user.lastName = lastName;
    if (phoneNo) user.phoneNo = phoneNo;
    if (dateOfBirth) user.dateOfBirth = dateOfBirth;
    if (gender) user.gender = gender;

    // Save the updated user document
    await user.save();

    // Respond with success and updated user details
    return res.status(200).json({
      status: "success",
      message: "Details updated successfully.",
      data: user, // Return the updated user document
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: "error",
      message: error.message || "Server error",
    });
  }
};

export const getUserDetails = async (req, res, next) => {
  try {
    const { userId } = req;

    const user = await User.findById(userId).select("-password");
    const userBank = await UserBank.findOne({ userId }).select(
      "accountNumber balance"
    );

    if (!user) {
      return res.status(404).json({
        status: "error",
        message: "User not found.",
      });
    }

    return res.status(200).json({
      status: "success",
      message: "User details fetched successfully.",
      data: {
        user: user,
        bankAccount: userBank,
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: "error",
      message: error.message || "Server error",
    });
  }
};

export const uploadUserAvatar = async (req, res, next) => {
  try {
    const { userId } = req;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        status: "error",
        message: "User not found.",
      });
    }

    if (req.file) {
      const existingPublicId = user.avatar ? user.avatar.public_id : null; // Retrieve existing public_id
      const avatar = await uploadAvatar(req.file, existingPublicId); // Pass the existing public_id to delete it
      user.avatar = avatar; // Update with new avatar data
    }

    user.updatedAt = moment().toDate();

    await user.save();
    return res.status(200).json({
      status: "success",
      message: "User updated successfully.",
      data: user,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: "error",
      message: error.message || "Server error",
    });
  }
};

export const getAllUsersExceptAdmin = async (req, res) => {
  try {
    // Fetch all users excluding Admin
    const users = await User.find({ role: { $ne: "Admin" } });

    // Fetch associated user bank details for each user
    const userPromises = users.map(async (user) => {
      const userBank = await UserBank.findOne({ userId: user._id });

      // Create a copy of the user data and add bank details under 'bankDetails'
      const userWithBankDetails = user.toObject();
      userWithBankDetails.bankDetails = userBank || null; // Attach bank details or null

      return userWithBankDetails;
    });

    // Wait for all promises to resolve
    const usersWithBanks = await Promise.all(userPromises);

    // Send response with users and their bank details (or null)
    res.status(200).json({
      success: true,
      data: usersWithBanks, // Send users with bank details (or null)
    });
  } catch (error) {
    return res
      .status(500)
      .json({ error: error.message || "Failed to fetch users" });
  }
};

export const getRecentUsers = async (req, res) => {
  try {
    // Get the start of the current week (Monday)
    const today = new Date();
    const dayOfWeek = today.getDay();
    const diffToMonday = (dayOfWeek + 6) % 7; // Adjust so Monday is the start (dayOfWeek: 1)
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - diffToMonday);
    startOfWeek.setHours(0, 0, 0, 0); // Set to start of day

    // Query users created after the start of this week
    const recentUsers = await User.find({
      createdAt: { $gte: startOfWeek },
      role: { $ne: "Admin" }, // Exclude Admin users
    }).sort({ createdAt: -1 });

    // Fetch associated user bank details for each recent user
    const userPromises = recentUsers.map(async (user) => {
      const userBank = await UserBank.findOne({ userId: user._id });

      // Create a copy of the user data and add bank details under 'bankDetails'
      const userWithBankDetails = user.toObject();
      userWithBankDetails.bankDetails = userBank || null; // Attach bank details or null

      return userWithBankDetails;
    });

    // Wait for all promises to resolve
    const recentUsersWithBanks = await Promise.all(userPromises);

    return res
      .status(200)
      .json({ status: "success", recentUsers: recentUsersWithBanks });
  } catch (error) {
    return res
      .status(500)
      .json({ error: error.message || "Failed to fetch users" });
  }
};

export const getWeeklyTransactions = async (req, res) => {
  try {
    // Calculate the start of the current week (e.g., Monday 00:00)
    const today = new Date();
    const dayOfWeek = today.getDay();
    const diffToMonday = (dayOfWeek + 6) % 7;
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - diffToMonday);
    startOfWeek.setHours(0, 0, 0, 0);

    // Retrieve weekly transactions from the Transaction model
    const weeklyTransactions = await Transaction.find({
      createdAt: { $gte: startOfWeek },
    }).sort({ createdAt: -1 });

    const anotherBankTransactions = await AnotherBankTransaction.find({
      timestamp: { $gte: startOfWeek },
    }).sort({ createdAt: -1 });

    // Retrieve accounts created in the current week with an initial deposit
    const newAccountsWithDeposit = await UserBank.find({
      createdAt: { $gte: startOfWeek },
      balance: { $gt: 0 }, // Only include accounts with an initial deposit
    });

    // Combine both transaction sets into a single response
    const combinedTransactions = [
      ...weeklyTransactions,
      ...anotherBankTransactions,
      ...newAccountsWithDeposit.map((account) => ({
        _id: account._id,
        userId: account.userId,
        amount: account.balance,
        createdAt: account.createdAt,
        details: {
          bankName: account.bankName,
          accountNumber: account.accountNumber,
          balance: account.balance,
          depositedAt: account.depositedAt || account.createdAt,
        },
      })),
    ];

    // Calculate the total amount for all transactions (sum of amounts)
    const totalAmount = combinedTransactions.reduce(
      (acc, transaction) => acc + transaction.amount,
      0
    );

    return res.status(200).json({
      status: "success",
      totalAmount: totalAmount, // Total sum of all amounts for the week
      transactions: combinedTransactions, // Array of all weekly transactions with details
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: error.message || "Failed to fetch weekly transactions",
    });
  }
};

export const getMonthlyTransactions = async (req, res) => {
  try {
    const startOfMonth = moment().startOf("month").toDate();
    const endOfMonth = moment().endOf("month").toDate();

    const monthlyTransactions = await Transaction.find({
      createdAt: { $gte: startOfMonth, $lte: endOfMonth },
    }).sort({ createdAt: -1 });

    const newAccountsWithDeposit = await UserBank.find({
      createdAt: { $gte: startOfMonth, $lte: endOfMonth },
      balance: { $gt: 0 },
    });

    const combinedTransactions = [
      ...monthlyTransactions,
      ...newAccountsWithDeposit.map((account) => ({
        _id: account._id,
        userId: account.userId,
        amount: account.balance,
        createdAt: account.createdAt,
        details: {
          bankName: account.bankName,
          accountNumber: account.accountNumber,
          balance: account.balance,
          depositedAt: account.depositedAt || account.createdAt,
        },
      })),
    ];

    const totalAmount = combinedTransactions.reduce(
      (acc, transaction) => acc + transaction.amount,
      0
    );

    return res.status(200).json({
      status: "success",
      totalAmount,
      transactions: combinedTransactions,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: error.message || "Failed to fetch monthly transactions",
    });
  }
};

export const getYearlyTransactions = async (req, res) => {
  try {
    const startOfYear = moment().startOf("year").toDate();
    const endOfYear = moment().endOf("year").toDate();

    const yearlyTransactions = await Transaction.find({
      createdAt: { $gte: startOfYear, $lte: endOfYear },
    }).sort({ createdAt: -1 });

    const newAccountsWithDeposit = await UserBank.find({
      createdAt: { $gte: startOfYear, $lte: endOfYear },
      balance: { $gt: 0 },
    });

    const combinedTransactions = [
      ...yearlyTransactions,
      ...newAccountsWithDeposit.map((account) => ({
        _id: account._id,
        userId: account.userId,
        amount: account.balance,
        createdAt: account.createdAt,
        details: {
          bankName: account.bankName,
          accountNumber: account.accountNumber,
          balance: account.balance,
          depositedAt: account.depositedAt || account.createdAt,
        },
      })),
    ];

    const totalAmount = combinedTransactions.reduce(
      (acc, transaction) => acc + transaction.amount,
      0
    );

    return res.status(200).json({
      status: "success",
      totalAmount,
      transactions: combinedTransactions,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: error.message || "Failed to fetch yearly transactions",
    });
  }
};

// export const getYearlyTransactions = async (req, res) => {
//   try {
//     // Get the start and end of the current year
//     const startOfYear = moment().startOf("year").toDate();
//     const endOfYear = moment().endOf("year").toDate();

//     // Retrieve all transactions within the current year
//     const yearlyTransactions = await Transaction.find({
//       timestamp: { $gte: startOfYear, $lte: endOfYear },
//     });

//     // Calculate the total amount for all yearly transactions
//     const totalAmount = yearlyTransactions.reduce(
//       (acc, transaction) => acc + transaction.amount,
//       0
//     );

//     return res.status(200).json({
//       status: "success",
//       totalAmount: totalAmount, // Total sum of all amounts for the year
//       yearlyTransactions: yearlyTransactions, // Array of all yearly transactions with details
//     });
//   } catch (error) {
//     return res.status(500).json({
//       error: error.message || "Failed to fetch yearly transactions",
//     });
//   }
// };

export const updateAccountStatus = async (req, res) => {
  try {
    const { userId, status } = req.body;

    // Validate the status input
    if (!["Pending", "Verified", "Rejected", "Working"].includes(status)) {
      return res.status(400).json({ error: "Invalid status value" });
    }

    // Find and update the user's account status
    const user = await UserBank.findOneAndUpdate(
      { userId },
      { isAccountPending: status, isVerifiedAccount: true },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    return res.status(200).json({
      success: true,
      message: `Account status updated to ${status}`,
      user,
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message || "Failed to update account status",
    });
  }
};

export const getAdminDetails = async (req, res) => {
  try {
    const { userId } = req;

    const user = await User.findById(userId).select("-password -otp");

    if (user.role !== "Admin") {
      return res.status(403).json({ error: "You are not an admin" });
    }

    return res.status(200).json({
      success: true,
      admin: user,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ error: error.message || "Failed to fetch admin details" });
  }
};

export const getUserBankDetails = async (req, res) => {
  try {
    const { userId } = req;
    const userBank = await UserBank.findOne({ userId });

    if (!userBank) {
      return res.status(404).json({ error: "User bank details not found" });
    }
    return res.status(200).json({
      success: true,
      userBank,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ error: error.message || "Failed to fetch user bank details" });
  }
};

export const getAllTransactionsAdmin = async (req, res, next) => {
  try {

    // Fetch homeBank transactions for today
    const transactions = await Transaction.find().populate({
      path: "senderUserId receiverUserId",
      select: "-password -otp"  // Exclude password and otp from populated fields
    });

    const tomorrowAnotherBanktransactions = await AnotherBankTransaction.find()
      .sort({ timestamp: -1 })
      .populate("senderUserId")  // If you need to populate senderUserId
      .select("-password -otp");
    return res.status(200).json({
      status: "success",
      message: "Today's Transactions fetched successfully.",
      data: {
        homeBank: transactions,
        anotherBank: tomorrowAnotherBanktransactions,
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: "error",
      message: error.message || "Server error",
    });
  }
};

export const sendDepositRequest = async (req, res, next) => {
  try {
    const { userId } = req;
    const { amount, accountNumber } = req.body;

    if (!amount || amount <= 0) {
      return res.status(400).json({ message: "Invalid amount specified." });
    }

    const userBank = await UserBank.findOne({ userId, accountNumber });

    if (!userBank) {
      return res.status(404).json({ message: "User bank account not found." });
    }

    const depositRequest = new AnotherBankTransaction({
      transactionId: `TXNDEP-${Date.now()}`,
      senderUserId: userId, // ID of the user making the request
      receiverUserId: null, // Set to null, admin is not tied to a specific user ID
      senderBankAccountId: userBank._id,
      senderAccountNumber: userBank.accountNumber,
      receiverBankAccountId: null, // No specific receiver account ID needed
      receiverAccountNumber: null, // Set to null or leave empty if irrelevant
      amount,
      transactionType: "deposit",
      status: "pending",
      description: "Deposit request for admin approval",
  });

    await depositRequest.save();

    return res.status(201).json({
      status: "success",
      message: "Deposit request sent to admin.",
      data: depositRequest,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

// Controller action to handle status update
export const approveDepositRequest = async (req, res, next) => {
  try {
    const { transactionId } = req.params;
    const { status } = req.body; // "approved" or "rejected"

    if (!["approved", "rejected"].includes(status)) {
      return res.status(400).json({ message: "Invalid status." });
    }

    const transaction = await AnotherBankTransaction.findOne({ transactionId, transactionType: "deposit", status: "pending" });
    
    if (!transaction) {
      return res.status(404).json({ message: "Transaction not found or already processed." });
    }

    transaction.status = status === "approved" ? "completed" : "rejected";
    await transaction.save();

    const userBank = await UserBank.findById(transaction.senderBankAccountId);
    
    if (!userBank) {
      return res.status(404).json({ message: "User bank account not found." });
    }


    if (status === "approved") {
      // Update balance for approval and set a custom description
      userBank.balance += transaction.amount;
      userBank.depositedAt = new Date();
      userBank.description = `Deposit of ${transaction.amount} approved and added to the account.`;
    } else if (status === "rejected") {
      // Set description for rejection
      userBank.description = `Deposit request of ${transaction.amount} rejected.`;
    }

    await userBank.save();

    return res.status(200).json({
      status: "success",
      message: `Deposit request ${status} successfully.`,
      data: transaction,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};


export const getUserDepositRequests = async (req, res, next) => {
  try {
    const { userId } = req;

    // Retrieve all deposit requests for the specific user
    const userRequests = await AnotherBankTransaction.find({
      senderUserId: userId,
      transactionType: "deposit",
      status:"pending"

    }).sort({ timestamp: -1 }); // Sort by latest

    return res.status(200).json({
      status: "success",
      data: userRequests,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

export const getAdminDepositRequests = async (req, res, next) => {
  try {
    const { status } = req.query; // Optional status filter (e.g., pending, completed, failed)

    // Base query to find deposit transactions
    const query = { transactionType: "deposit",status:'pending' };

    // If a status query is provided, add it to the query object
    if (status) {
      query.status = status;
    }

    // Retrieve deposit requests based on the query, sorted by the latest timestamp
    const allRequests = await AnotherBankTransaction.find(query).sort({ timestamp: -1 }).populate('senderUserId').select('-password -otp');

    return res.status(200).json({
      status: "success",
      data: allRequests,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

export const getUserLoginDetails = async (req, res) => {
  try {
    // Get the userId from the request (e.g., from JWT payload or query params)
    const {userId} = req;  // Assuming the user ID is available in req.user after authentication

    // Fetch the user by ID, selecting only the login times
    const user = await User.findById(userId).select("lastLoginTime lastFailedLoginTime");

    if (!user) {
      return res.status(404).json({
        status: "error",
        message: "User not found",
      });
    }

    // Get the last login time and last failed login time
    const lastLoginTime = user.lastLoginTime
      ? moment(user.lastLoginTime).isValid() ? moment(user.lastLoginTime).format("YYYY-MM-DD HH:mm:ss") : "No login recorded"
      : "No login recorded";

    const lastFailedLoginTime = user.lastFailedLoginTime
      ? moment(user.lastFailedLoginTime).isValid() ? moment(user.lastFailedLoginTime).format("YYYY-MM-DD HH:mm:ss") : "No failed login recorded"
      : "No failed login recorded";

    return res.status(200).json({
      status: "success",
      message: "User login details fetched successfully",
      data: {
        lastLoginTime,
        lastFailedLoginTime,
      },
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: error.message || "Server error",
    });
  }
};

export const createEditedHistoryForUser = async (req, res, next) => {
  try {
   

    const { userId, title, description, date, amount } = req.body;
    console.log('req.body in controller',req.body);
    if(!userId || !title || !description || !date || !amount) {
      return res.status(400).json({
        status: "error",
        message: "Anyone Field Empty Please fill all field",
      });
    }
    // Retrieve the user

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        status: "error",
        message: "User not found",
      });
    }

    // Retrieve the user bank account
    const userbank = await UserBank.findOne({ userId });// Add `await` here
    if (!userbank) {
      return res.status(404).json({
        status: "error",
        message: "User bank account not found",
      });
    }
    // Check for sufficient balance
    if (userbank.balance < amount) {
      return res.status(400).json({
        status: "error",
        message: "Insufficient balance to make this transaction",
      });
    }
    // Create a new edited history record
    const numericAmount = parseFloat(amount);
    if (isNaN(numericAmount)) {
      return res.status(400).json({
        status: "error",
        message: "Amount must be a valid number",
      });
    }

    const editedHistory = new UserEditedSchema({
      userId,
      title,
      description,
      editedTimestamp: date,
      editedAmount: numericAmount,
      transType:'debit'
    });
    await editedHistory.save();
        // Deduct the amount from balance and save
        userbank.balance -= numericAmount;
        await userbank.save();

    // Send a success response with the updated balance
    return res.status(200).json({
      status: "success",
      message: "Edited history created successfully",
      remainingBalance: userbank.balance, // Corrected to use `userbank.balance`
      data: editedHistory,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: "error",
      message: error.message || "Server error",
    });
  }
};

export const createCreditEditedHistoryForUser = async (req, res, next) => {
  try {
    const { userId, title, description, date, amount } = req.body;
    // console.log('req.body', req.body);

    // Check if all required fields are present
    if (!userId || !title || !description || !date || !amount) {
      return res.status(400).json({
        status: "error",
        message: "All fields are required",
      });
    }

    // Retrieve the user
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        status: "error",
        message: "User not found",
      });
    }

    // Retrieve the user's bank account
    const userbank = await UserBank.findOne({ userId });
    if (!userbank) {
      return res.status(404).json({
        status: "error",
        message: "User bank account not found",
      });
    }

    // Convert amount to a number
    const numericAmount = parseFloat(amount);
    if (isNaN(numericAmount)) {
      return res.status(400).json({
        status: "error",
        message: "Amount must be a valid number",
      });
    }

    // Create a new edited history record
    const editedHistory = new UserEditedSchema({
      userId,
      title,
      description,
      editedTimestamp: date,
      editedAmount: numericAmount,  // Use numericAmount here
      transType: 'credit',
    });
    await editedHistory.save();

    // Update user bank balance
    userbank.balance += numericAmount;
    await userbank.save();

    // Log and send the success response
    // console.log('log in controller data', editedHistory);
    return res.status(200).json({
      status: "success",
      message: "Edited history created successfully",
      remainingBalance: userbank.balance,
      data: editedHistory,
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: "error",
      message: error.message || "Server error",
    });
  }
};


export const deleteUserEditedHistory = async (req, res) => {
  try {
    const { userId, editedHistoryId } = req.params;

    // Find the user by userId
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ status: "error", message: "User not found" });
    }

    // Check if the history belongs to the user (optional but good practice)
    const editedHistory = await UserEditedSchema.findById(editedHistoryId);

    if (!editedHistory) {
      return res.status(404).json({ status: "error", message: "Edited history not found" });
    }

    // Check if the editedHistory's userId matches the provided userId
    if (String(editedHistory.userId) !== String(userId)) {
      return res.status(403).json({ status: "error", message: "This history does not belong to the user" });
    }

    // Delete the history
    await UserEditedSchema.findByIdAndDelete(editedHistoryId);

    return res.status(200).json({ status: "success", message: "Edited history deleted successfully" });
  } catch (error) {
    console.error("Error deleting edited history:", error);
    return res.status(500).json({ status: "error", message: "Something went wrong", error: error.message });
  }
};

export const getUserEditedHistories = async (req, res) => {
  try {
    const { userId } = req;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ status: "error", message: "User not found" });
    }

    const userEditedHistories = await UserEditedSchema.find({ userId }).sort({ editedTimestamp: -1 });
    return res.status(200).json({
      status: "success",
      message: "User edited histories fetched successfully",
      data: userEditedHistories,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: "error",
      message: error.message || "Failed to fetch user edited histories",
    });
  }
};

export const getSingleUserData = async (req, res) => {
  try {
    const { userId } = req.params;

    // Fetch the user details
    const user = await User.findById(userId).select('firstName lastName email');
    if (!user) {
      return res.status(404).json({ status: "error", message: "User not found" });
    }

    // Fetch the UserBank details based on the userId
    const userbank = await UserBank.findOne({ userId: userId }).select('balance');
    if (!userbank) {
      return res.status(404).json({ status: "error", message: "User bank account not found" });
    }

    const amount = userbank.balance;

    return res.status(200).json({
      status: "success",
      message: "User data fetched successfully",
      data: {
        user: user,
        balance: amount,  // Return `balance` directly from the UserBank document
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: "error",
      message: error.message || "Server error",
    });
  }
};


export const getAllUserForAdmin = async (req, res) => {
  try {
    // Fetch all users
    const allUsers = await User.find().select('firstName lastName email _id');
    if (!allUsers || allUsers.length === 0) {
      return res.status(404).json({ status: "error", message: "No users found" });
    }

    // Use Promise.all to check for UserBank records in parallel
    const usersWithBankRecords = await Promise.all(
      allUsers.map(async (user) => {
        // Fetch the user's bank record with 'isAccountPending' set to 'Verified'
        const userBank = await UserBank.findOne({ 
          userId: user._id,
          isAccountPending: 'Verified' // Filter by 'Verified' status
        }).select('balance');
    
        // Only return the user data with balance if the bank record exists and is verified
        return userBank ? { ...user.toObject(), balance: userBank.balance } : null;
      })
    );

    // Filter out users without a bank record
    const filteredUsers = usersWithBankRecords.filter(user => user !== null);

    if (filteredUsers.length === 0) {
      return res.status(404).json({ status: "error", message: "No users with bank records found" });
    }

    return res.status(200).json({
      status: "success",
      message: "Users with bank records fetched successfully",
      data: filteredUsers,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: "error",
      message: error.message || "Failed to fetch all users",
    });
  }
};

export const getEditedHistoryOfUser = async (req, res, next) => {
  try {
    const { userId } = req.query;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ status: "error", message: "User not found" });
    }

    const userEditedHistories = await UserEditedSchema.find({ userId: userId }).sort({ editedTimestamp: -1 });

    if (!userEditedHistories || userEditedHistories.length === 0) {
      return res.status(404).json({ status: "error", message: "No edited history found" });
    }

    const userbankBalance = await UserBank.findOne({ userId: userId }).select('balance');

    if (!userbankBalance) {
      return res.status(404).json({ status: "error", message: "User bank account not found" });
    }

    return res.status(200).json({
      status: "success",
      message: "Edited history fetched successfully",
      data: userEditedHistories,
      remainingBalance: userbankBalance.balance  // Only send the balance field
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: "error",
      message: error.message || "Failed to fetch edited history",
    });
  }
};

export const deleteAllUserInfoAdmin = async (req, res, next) => {
  try {
    const { userId } = req.params;

    // Validate input
    if (!userId) {
      return res.status(400).json({
        status: "error",
        message: "User ID is required",
      });
    }

    // Check if user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        status: "error",
        message: "User not found",
      });
    }

    // Delete related data
    const userBank = await UserBank.findOneAndDelete({ userId });
    if (!userBank) {
      return res.status(404).json({
        status: "error",
        message: "No bank details found for this user",
      });
    }

    // Delete related transactions
    await Promise.all([
      UserEditedSchema.findOneAndDelete({ userId }),
      AnotherBankTransaction.findOneAndDelete({senderUserId:userId }),
      Transaction.findOneAndDelete({ senderUserId:userId }),
    ]);

    // Delete the user from User model
    await User.findByIdAndDelete(userId);

    const allUsers = await User.find().select('firstName lastName email _id');
    const usersWithBankRecords = await Promise.all(
      allUsers.map(async (user) => {
        const bankRecord = await UserBank.findOne({
          userId: user._id,
          isAccountPending: 'Verified',
        }).select('balance');
        return bankRecord ? { ...user.toObject(), balance: bankRecord.balance } : null;
      })
    );

    const filteredUsers = usersWithBankRecords.filter(user => user !== null);

    // Respond with success
    return res.status(200).json({
      status: "success",
      message: "User and all related information deleted successfully",
      data: filteredUsers,
    });
  } catch (error) {
    console.error("Error deleting user information:", error);
    return res.status(500).json({
      status: "error",
      message: "An error occurred while deleting user information",
    });
  }
};

// export const deleteAllUserInfoAdmin = async (req, res, next) => {
//   try {
//     const { userId } = req.query;

//     // Validate input
//     if (!userId) {
//       return res.status(400).json({
//         status: "error",
//         message: "User ID is required",
//       });
//     }

//     // Check if user exists
//     const user = await User.findById(userId);
//     if (!user) {
//       return res.status(404).json({
//         status: "error",
//         message: "User not found",
//       });
//     }

//     // Delete related data
//     const userBank = await UserBank.findOneAndDelete({ userId });
//     if (!userBank) {
//       return res.status(404).json({
//         status: "error",
//         message: "No bank details found for this user",
//       });
//     }

//     await Promise.all([
//       UserEditedSchema.findOneAndDelete({ userId }),
//       AnotherBankTransaction.findOneAndDelete({ userId }),
//       Transaction.findOneAndDelete({ userId }),
//     ]);

//     // Respond with success
//     return res.status(200).json({
//       status: "success",
//       message: "User and all related information deleted successfully",
//     });
//   } catch (error) {
//     console.error("Error deleting user information:", error);
//     return res.status(500).json({
//       status: "error",
//       message: "An error occurred while deleting user information",
//     });
//   }
// };


// export const deleteAllUserInfoAdmin = async (req, res, next) => {
//   try {
//     const { userId } = req.query;

//     // Validate input
//     if (!userId) {
//       return res.status(400).json({
//         status: "error",
//         message: "User ID is required",
//       });
//     }

//     // Check if user exists
//     const user = await User.findById(userId);
//     if (!user) {
//       return res.status(404).json({
//         status: "error",
//         message: "User not found",
//       });
//     }

//     // Delete related data
//     const userBank = await UserBank.findOneAndDelete({ userId });
//     if (!userBank) {
//       return res.status(404).json({
//         status: "error",
//         message: "No bank details found for this user",
//       });
//     }

//     // Delete related transactions
//     await Promise.all([
//       UserEditedSchema.findOneAndDelete({ userId }),
//       AnotherBankTransaction.findOneAndDelete({ userId }),
//       Transaction.findOneAndDelete({ userId }),
//     ]);

//     // Delete the user from User model
//     await User.findByIdAndDelete(userId);

//     // Respond with success
//     return res.status(200).json({
//       status: "success",
//       message: "User and all related information deleted successfully",
//     });
//   } catch (error) {
//     console.error("Error deleting user information:", error);
//     return res.status(500).json({
//       status: "error",
//       message: "An error occurred while deleting user information",
//     });
//   }
// };


