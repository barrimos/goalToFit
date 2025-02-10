const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const config = require('../config');
const morgan = require('morgan')

require('dotenv').config();

const app = express();
const PORT = config.port;

app.use(morgan('tiny'))
app.use(express.json());
app.use(express.urlencoded({extended: true}));

const corsOptions = {
  origin: ['https://goaltofitapp.vercel.app', 'http://localhost:3000'],
  methods: 'GET,POST,DELETE,OPTIONS,PATCH,PUT'
}

app.use(cors(corsOptions));
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