import mongoose from "mongoose";

const userEditedSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    editedAmount: {
        type: Number,
        default: 0
    },
    title: {  // Updated field name
        type: String,
    },
    description: {  // Updated field name
        type: String,
    },
    editedTimestamp: {
        type: Date,
    },
    transType:{
        type: String,
        enum: ["credit", "debit"],
    }
});

const UserEditedSchema = mongoose.model("UserEditedSchema",userEditedSchema);

export default UserEditedSchema;