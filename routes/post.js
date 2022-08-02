const express = require('express')
const router = express.Router()
const Post = require('../models/post')
const checkAuth = require('../middleware/auth');

router.use(express.json())

// GET ALL POSTS
router.get('/posts', (req, res)=>{
    Post.find({}).exec()
    .then(posts => {
        res.send(posts).status(200).json();
    })
    .catch(err=>{
        res.status(500).send(err)
    })
})





// POST API FOR CREATING A POST
router.post('/posts/new', (req, res) => {
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