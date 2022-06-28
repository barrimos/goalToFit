const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    // id: {
    //     type: String,
    //     unique: true
    // },
    // email: {
    //     type: String,
    //     required: true,
    //     unique: true,
    // },
    // password: {
    //     type: String,
    //     required: true,
    // },
    username: {
        type: String,
        required: true,
        unique: true,
    },
    img: {
        type: String,
        default: 'https://www.finearts.cmu.ac.th/wp-content/uploads/2021/07/blank-profile-picture-973460_1280-1.png',
    },
    gender: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        required: true,
    },
    weight: {
        type: Number,
        required: true,
    },
    height: {
        type: Number,
        required: true,
    },
    score: Number,
    goal: String,
    achievement: Object,
    setDayAndTime: Object,
    last_activityAndDuration: Object,
    favActivities: Array,
}, {
    timestamps: true,
});


const UserPersonal = mongoose.model('Personal', userSchema, 'users');
module.exports = UserPersonal;