const express = require('express')
const app = express();
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const secret = require('../secret.json');
const checkAuth = require('../middleware/auth');

// User model import from model
const User = require('../models/user');

// GET ALL USERS
router.get('/user', (req, res) => {
    User.find({}).exec()
        .then(users => {
            res.send(users);
        })
        .catch(err => {
            res.status(500).send(err)
        });
})


// USER REGISTRATION API
router.post('/user/register', (req, res) => {
    User.find({
            email: req.body.email
        })
        .exec()
        .then(users => {
            if (users.length >= 1) {
                return res.status(409).json({
                    message: 'Mail exists'
                })
            } else {
                bcrypt.hash(req.body.password, 12, (err, hash) => {
                    if (err) {
                        res.status(500).json({
                            error: err
                        });
                    } else {
                        const user = new User({
                            email: req.body.email,
                            password: hash
                        });
                        user.save()
                            .then(result => {
                                res.status(201).json({
                                    message: 'User created'
                                })
                            }).catch(err => {
                                res.status(500).json({
                                    error: err
                                })
                            });
                    }
                });
            }
        })
        .catch(err => {
            res.status(500).send(err)
        });
});



// USER DELETION API
router.delete('/user/delete/:id', checkAuth, (req, res) => {
    User.deleteOne({
            _id: req.params.id
        })
        .exec()
        .then(response => {
            res.status(200).json({
                message: 'User deleted'
            });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        });
});





// LOGIN API (AUTH)
router.post('/user/login', (req, res) => {
    User.find({
            email: req.body.email
        })
        .exec()
        .then(users => {
            if (users.length < 1) {
                return res.sendStatus(404).json({
                    message: 'User not found'
                });
            }
            bcrypt.compare(req.body.password, users[0].password, (err, result) => {
                if (err) {
                    return res.status(401)
                }
                if (result) {
                    // CREATE TOKEN
                    const token = jwt.sign({
                            email: users[0].email,
                            id: users[0]._id
                        },
                        secret.key, {
                            expiresIn: "24h"
                        }
                    );
                    return res.status(200).json({
                        message: 'Auth successful',
                        token: token
                    });

                }
                res.sendStatus(401);
            });

        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
});


module.exports = router;