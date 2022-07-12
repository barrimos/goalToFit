const express = require('express');
const UserPersonal = require('../model/users.model');

const registerRouter = express.Router();

registerRouter.post('/personal_regis', (req, res, next) => {
    const dataPersonal = req.body;
    const newUser = new UserPersonal(dataPersonal);
    newUser.save()
        .then(() => res.json('Your register completed !! you account is ready'))
        .catch(err => res.status(400).json('Error:' + err));
});

module.exports = registerRouter;