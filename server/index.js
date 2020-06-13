require('./config/config');
const express = require('express');
const mongoose = require('mongoose');
const app = express();

// Route Config
app.use( require('./routes/route'))


 
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