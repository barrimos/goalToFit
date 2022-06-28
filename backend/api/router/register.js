const express = require('express');
const UserPersonal = require('../model/users.model');
const UserAuthen = require('../model/users.emailPass.model');

const registerRouter = express.Router();

registerRouter.post('/authentication_regis', (req, res, next) => {
    const dataEmailPass = req.body;
    const userDataEmailPass = new UserAuthen(dataEmailPass);
    console.log(userDataEmailPass);

    UserPersonal.findOne({'email': {'$eq': dataEmailPass.email}})
        .then(email => {
            if(email){
                throw new Error();
            } else {
                userDataEmailPass.save()
                    .then(() => res.json('Your register completed !! you account is ready'))
                    .catch(err => res.status(400).json('Error:' + err));
            }
        })
        .catch(err => res.status(404).json('Error:' + err))
});


registerRouter.post('/personal_regis', (req, res, next) => {
    const dataPersonal = req.body;
    const userDataPersonal = new UserAuthen(dataPersonal);

    userDataPersonal.save()
        .then(() => res.json('Your register completed !! you account is ready'))
        .catch(err => res.status(400).json('Error:' + err));
});

module.exports = registerRouter;