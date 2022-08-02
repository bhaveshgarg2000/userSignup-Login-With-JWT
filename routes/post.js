const express = require('express')
const router = express.Router()
const Post = require('../models/post')
const checkAuth = require('../middleware/auth');

router.use(express.json())

router.post('/post/new', checkAuth, (req, res) => {
    const post = new Post(req.body)
    post.save()
        .then(result => {
            // res.sendStatus(200)
            res.status(201).send('Created')
            console.log(result);
        }).catch(err => {
            res.status(500).send(err)
        })

});

module.exports = router;