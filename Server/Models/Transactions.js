import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
    transactionId: {
        type: String,
        unique: true,
        required: true,
    },
    senderUserId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    receiverUserId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    senderBankAccountId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "UserBank",
        required: true,
    },
    senderBankAccountNumber:{
        type: String,
        required: true,
    },
    receiverBankAccountId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "UserBank",
        required: true,
    },
    receiverBankAccountNumber:{
        type: String,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    currency: {
        type: String,
        default: "PHP",
        required: true,
    },
    status: {
        type: String,
        enum: ["pending", "completed", "failed"],
        default: "pending",
        required: true,
    },
    transactionType: {
        type: String,
        enum: ["transfer", "deposit", "withdrawal"],
        required: true,
    },
    timestamp: {
        type: Date,
        default: Date.now,
    },
    description: {
        type: String,
        maxlength: 250,
    },
});

transactionSchema.index({ timestamp: -1 });

const Transaction = mongoose.model("Transaction", transactionSchema);
export default Transaction;