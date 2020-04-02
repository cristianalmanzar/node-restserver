const express = require('express');
const bcrypt = require('bcrypt');

const User = require('../models/user');
const app = express();


app.post('/login',(req, res) => {

    res.json({
        ok: true
    });
});







module.exports = app;