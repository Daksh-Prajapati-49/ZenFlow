const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
    },
    phone:{
        type: String,
        required: true,
    },
    batchId: {
        type: String,
        required: true,
    },
    month:{
        type: Number,
        required: true,
    },
    year:{
        type: Number,
        required: true,
    },
    enrolledDate:{
        type: Date,
        default: Date.now,
    },
});

UserSchema.index({ email: 1, batchId: 1 }, { unique: true });
const User = mongoose.model("user", UserSchema);

module.exports = User;