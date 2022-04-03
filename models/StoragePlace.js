const mongoose = require('mongoose');

const StoragePlaceSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
   name: {
       type: String,
       required: true 
   },
   storageType: {
       type: String,
       enum: ['Dry', 'Refrigerated/Frozen', 'Alcohol'],
       default: 'Dry'
   },
   storageCapacity: {
       type: Number,
       required: true
   },
   currentCapacity: {
       type: Number,
       default: 0 
   },
   isFull: {
       type: Boolean
   },
   storageLocation: {
       type: String,
       required: true 
   },
   date: {
       type: Date,
       default: Date.now
   }
});

module.exports = StoragePlace = mongoose.model('storagePlace', StoragePlaceSchema);