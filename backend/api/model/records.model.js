const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const exercisesSchema = new Schema({
    id: {
        type: Number,
        unique: true,
    },
    name: {
        type: String,
    },
    type: {
        type: String,
    },
    quantity: {
        done: {
            type: Number,
        },
        goal: {
            type: Number,
        },
        classifier: {
            type: String,
        }
    },
    startTime: {
        type: String,
    },
    duration: {
        type: Number,
    },
    calories: {
        type: Number,
    },
    description: {
        type: String,
    },
    atDate: {
        type: String,
    }
}, {
    timestamps: true,
});

const Records = mongoose.model('records', exercisesSchema);
module.exports = Records;