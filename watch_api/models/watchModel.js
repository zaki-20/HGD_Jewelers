const mongoose = require("mongoose");

const watchSchema = mongoose.Schema({
    seller: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true,
    },
    name: {
        type: String,
        required: [true, "Please Enter watch Name"],
        trim: true,
    },
    description: {
        type: String,
        required: [true, "Please Enter watch Description"],
    },
    brand: {
        type: String,
        required: [true, "Please Enter watch Brand"],
    },
    price: {
        type: Number,
        required: [true, "Please Enter watch Price"],
    },
    images: [
        {
            type: String,
        },
    ],
    stock: {
        type: Number,
        required: [true, "Please Enter product Stock"],
        default: 1,
    },
    condition: {
        type: String,
        required: true,
        enum: ['excellent', 'good', 'fair', 'bad'],
    },

}, {
    timestamps: true,
});

module.exports = mongoose.model("Watch", watchSchema);