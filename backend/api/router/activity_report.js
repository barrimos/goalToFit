const express = require('express');
const Records = require('../model/records.model');
// Get router
const allReportRouter = express.Router();

// GET TO SHOW - REPORT PAGE
allReportRouter.get('/records', async (req, res, next) => {
    Records.find()
        .then(user => res.status(200).json(user))
        .catch(err => res.status(404).json('Error: ' + err))
});

// DELETE ACTIVITIES - REPORT PAGE
allReportRouter.delete('/delete/:id', (req, res, next) => {
    Records.deleteOne({'id': {'$eq': req.params.id}})
        .then(() => res.json('Exercise deleted.'))
        .catch(err => console.error('Error: ' + err))
});

// PUT UPDATE RECORDS - REPORT PAGE
allReportRouter.put('/update/:id', (req, res, next) => {
    // console.log(req.body.data);
    Records.findOne({'id': {'$eq': req.params.id}})
        .then((ac) => {
            ac.atDate = req.body.data.atDate;
            ac.startTime = req.body.data.startTime;
            ac.duration = req.body.data.duration;
            ac.quantity.done = req.body.data.quantity.done ? req.body.data.quantity.done : 0;
            ac.quantity.goal = req.body.data.quantity.goal;
            ac.description = req.body.data.description;

            ac.save()
                .then(() => res.json('Exercise updated!'))
                .catch(err => console.error('Error: ' + err))
        })
        .catch(err => console.error('Error: ' + err));
});

module.exports = allReportRouter;