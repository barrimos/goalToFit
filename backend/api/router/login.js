const express = require('express');

const loginRouter = express.Router();

loginRouter.get('/login', (req, res, next) => {
    res.status(200).send();
});

module.exports = loginRouter;