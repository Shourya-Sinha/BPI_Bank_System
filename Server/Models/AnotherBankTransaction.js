import mongoose from "mongoose";

const anotherBankTransactionSchema = new mongoose.Schema({
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
        type: String,
        required: function() {
            return this.transactionType !== "deposit";
        }
    },
    senderBankAccountId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "UserBank",
        required: true,
    },
    senderAccountNumber:{
        type: String,
        required: true,
    },
    receiverBankAccountId: {
        type: String,
        required: function() {
            return this.transactionType !== "deposit";
        }
    },
    receiverAccountNumber:{
        type: String,
        required: function() {
            return this.transactionType !== "deposit";
        }
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
        enum: ["pending", "completed", "failed","approved","rejected"],
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
    anotherBankDetails:{
        bankName: { type: String },
        accountNumber: { type: String },
        accountHolderName: { type: String },
        swiftCode: { type: String },
    }
});

anotherBankTransactionSchema.index({ timestamp: -1 });

const AnotherBankTransaction = mongoose.model("AnotherBankTransaction", anotherBankTransactionSchema);
export default AnotherBankTransaction;