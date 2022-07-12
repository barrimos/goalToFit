const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    id: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    }
}, {
    timestamps: true,
});


const UserAuthen = mongoose.model('Authen', userSchema, 'users');
module.exports = UserAuthen;