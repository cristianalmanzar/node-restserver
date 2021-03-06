const express = require('express');
const request = require('body-parser');

const app = express();

app.use(request.urlencoded({ extended: false }))
app.use(request.json())

app.use( require('./user'))
app.use( require('./login'))
app.use( require('./category'))
app.use( require('./product'))



module.exports = app