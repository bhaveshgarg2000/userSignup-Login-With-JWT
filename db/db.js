const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/userAuth')

    .then(() => {
        console.log('Connected to MongoDB');
    }).catch(() => {
        console.log('Error connecting to MongoDB');
    })

module.exports = mongoose;