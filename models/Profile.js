const mongoose = require("mongoose");

const ProfileSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    location: {
        type: String 
    },
    status: {
        type: String,
        required: true
    },
    settings: {
        type: [String],
        required: true
    },
    foodPreferences: [
        {
            name: {
                type: String,
                required: true
            },
            rating: {
                type: Number,
                required: true
            }
        }
    ],
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = Profile = mongoose.model('profile', ProfileSchema);