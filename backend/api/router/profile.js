const express = require('express');
const UserPersonal = require('../model/users.model');

const profileRouter = express.Router();

// get all user to check email is exist or not
profileRouter.get('/', (req, res, next) => {
    UserPersonal.find({},{'id': 1, '_id': 0})
        .then(users => res.status(200).json(users))
        .catch(err => res.status(400).json('Error: ' + err));
});

profileRouter.get('/authen', (req, res, next) => {
    const uid = req.body.uid;
    const upw = req.body.upw;
    UserPersonal.findOne(
            {'$and':
                [
                    {
                        'email': {'$eq': uid},
                        'password': {'$eq': upw}
                    }
                ]
            }, {'email': 1, 'password': 1, '_id': 0}
        )
        .then(users => res.status(200).json(users))
        .catch(err => res.status(400).json('Error: ' + err));
});


profileRouter.get('/user/:username', (req, res, next) => {
    const username = req.params['username'];
    // console.log(username);
    UserPersonal.findOne({'username': username})
        .then(user => {
            if(user){
                res.status(200).send(user);
            } else {
                res.status(404).send('User not found');
            }
        })
        .catch(err => console.error('Error: ' + err));
});


profileRouter.get('/edit', (req, res, next) => {
    const userId = req.query['id'];
    const username = req.query['username'];

    console.log(userId, username)

    UserPersonal.findOne({'$and':
        [
            {'id': {'$eq': userId}},
            {'username': {'$eq': username}}
        ]
    })
        .then(user => {
            if(user){
                res.status(200).send(user);
            } else {
                res.status(404).send('User not found');
            }
        })
        .catch(err => res.status(400).json('Error: ' + err));
})


// profileRouter.put('/:id/edit', (req, ress, next) => {
//     const userId = req.params['id'];
// });

module.exports = profileRouter;