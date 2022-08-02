const db = require('../db/db');

const userSchema = new db.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
    }
}, {
    timestamps: true
});


const User = db.model('User', userSchema);



module.exports = User;