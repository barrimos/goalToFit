const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const config = require('../config');
const morgan = require('morgan')

require('dotenv').config();

const app = express();
const PORT = config.port;

app.use(morgan('tiny'))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(cors());
app.use(express.json());

if (config.isVercel) {
  app.use( async (req, res, next) => {
    await mongoose.connect(config.mongoUri, config.mongoOptions)
    return next();
  })
}

const registerRouter = require('./router/register');
app.use('/register', registerRouter);


const profileRouter = require('./router/profile');
app.use('/profile', profileRouter);


const allReportRouter = require('./router/activity_report');
app.use('/report', allReportRouter);


const activityCreateRouter = require('./router/activity_create');
app.use('/create', activityCreateRouter);


const activityStartRouter = require('./router/activity_start');
app.use('/start', activityStartRouter);


module.exports = app;