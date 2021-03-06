const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const activitiesSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    classifier: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    id: {
        type: Number,
        unique: true
    }
});

const Activities = mongoose.model('activities', activitiesSchema);
module.exports = Activities;