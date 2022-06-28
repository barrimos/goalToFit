const express = require('express');

const forgotPassRouter = express.Router();

forgotPassRouter.get('/forgot_password', (req, res, next) => {
    res.status(200).send();
});

module.exports = forgotPassRouter;