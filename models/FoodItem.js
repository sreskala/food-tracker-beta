const mongoose = require("mongoose");

const FoodItemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true 
    },
    isPerishable: {
        type: Boolean,
        default: true
    },
    expirationDate: {
        type: Date
    },
    individualPrice: {
        type: Number,
        required: true
    },
    storedIn: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'storagePlace'
    }
})

module.exports = FoodItem = mongoose.model('foodItem', FoodItemSchema);