const db = require('../db/db');

const postSchema = new db.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true,
    }
}, {
    timestamps: true
});


const Post = db.model('post', postSchema);



module.exports = Post;