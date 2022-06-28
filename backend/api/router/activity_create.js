const express = require('express');
const Activities = require('../model/activities.model');
const PackagesSets = require('../model/packages.model');

const activityCreateRouter = express.Router();

// GET TO SHOW - CREATE PAGE
activityCreateRouter.get('/individual', (req, res, next) => {
    Activities.find()
        .then(activity => res.status(200).json(activity))
        .catch(err => res.status(404).json("Error: " + err));
});
// CAROUSEL COMPONENTS
activityCreateRouter.get('/packset', (req, res, next) => {
    PackagesSets.find()
        .then(activity => res.status(200).json(activity))
        .catch(err => res.status(404).json("Error: " + err));
});

module.exports = activityCreateRouter;