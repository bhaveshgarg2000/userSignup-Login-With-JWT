const express = require('express');
const app = express();
const port = 8080;

//POSTs ROUTE
app.use(require('./routes/post'));
app.use(require('./routes/user'));
app.use(express.json());

// Root route
app.get('/', function (req, res) {
    res.send('Hello World');
});


// TESTING ROUTE
app.get('/test', function (req, res) {
    res.sendStatus(200)
});


//SERVER RUNING LISTENER
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}/`)
});