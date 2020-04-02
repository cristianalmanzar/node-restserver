require('./config/config');
require('./routes/user');
const express = require('express');
const mongoose = require('mongoose');
const request = require('body-parser');
const app = express();

// Route Config
app.use( require('./routes/index'))

// Body Parser
app.use(request.urlencoded({ extended: false }))
app.use(request.json())
 
// Database Connection
mongoose.connect('mongodb://localhost:27017/coffe', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}, (err,res) => {
    if(err) throw err;
    console.log("Database connected")
});

 
app.listen(process.env.PORT, () => {
    console.log('Listening PORT', process.env.PORT);
})