import mongoose from "mongoose";

const userBankSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Reference to the User model
    required: true,
  },
    bankName: {
        type: String,
        // required: true,
    },
    accountNumber: {
        type: String,
        // required: true,
        unique: true,
    },
    balance:{
        type: Number,
        default: 0,
    },
    ifscCode: {
        type: String,
        // required: true,
    },
    branchName: {
        type: String,
        // required: true,
    },
    accountType: {
        type: String,
        // enum: ["savings", "current", "fixed deposit", "recurring deposit"],
        // required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    depositedAt:{
        type: Date,
        default: null,
    },
    withdrawnAt:{
        type: Date,
        default: null,
    },
    personalDetails: {
        accountHolderName: { type: String },
        email: { type: String },
        phoneNo: { type: String },
        dob: { type: Date },
        gender: { type: String },
        myAddress: {
          vill: { type: String },
          fulladdress:{ type: String },
          state: { type: String },
          city: { type: String },
          pincode: { type: String },
          country: { type: String },
          nearBy: { type: String },
          residentialStatus: { type: String },
          occupation: { type: String },
          annualIncome: { type: Number },
        },
      },
      isAccountPending: {
        type: String,
        default: 'Pending', // Initially true when account creation starts
        enum:['Pending','Verified','Rejected','Working']
      },
      accountVerificationDocuments: [
        {
          documentType: { type: String }, // E.g., Aadhar, PAN, etc.
          documentUrl: {
            secure_url: {
              type: String,
            },
            public_id: {
              type: String,
            },
          },
          createdAt: { type: Date, default: Date.now },
        },
      ],
      isVerifiedAccount:{
        type: Boolean,
        default: false, // Initially false until account verification is done
      },
      step:{
        type: Number,
        min: 0,
        max: 3,
      }
});

const UserBank = mongoose.model("UserBank", userBankSchema);
export default UserBank;
