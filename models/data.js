const { default: mongoose } = require("mongoose");

const dataSchema = new mongoose.Schema({
    user_id: {
        type: Number,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    plan: {
        type: String,
        required: true,
        enum: ["Basic", "Standard", "Silver", "Gold", "Premium"]
    },
    last_updated: {
        type: Date,
        required: true
    }
});

module.exports = mongoose.model("Data", dataSchema);