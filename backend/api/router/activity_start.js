const express = require('express');
const Records = require('../model/records.model');

const activityStartRouter = express.Router();

// GET LAST ITEM TO GEN NEXT ID - START PAGE
activityStartRouter.get('/activity', (req, res, next) => {
    Records.find()
        .then(activity => res.status(200).json(activity))
        .catch(err => res.status(404).json("Error: " + err));
});

// SAVE ACTIVITIES - START PAGE
activityStartRouter.post('/activity', (req, res, next) => {
    const activities = req.body;
    const newRecords = new Records(activities);

    newRecords.save()
        .then(() => res.json('Your set activities was added'))
        .catch(err => res.status(400).json('Created set not successful! Error: ' + err))
});

module.exports = activityStartRouter;