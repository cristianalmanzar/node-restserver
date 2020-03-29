require('./config/config');
require('./routes/user');
const express = require('express');
const mongoose = require('mongoose');
const app = express();

app.use( require('./routes/user'))

 

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