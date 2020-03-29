const express = require('express');
const request = require('body-parser');

const bcrypt = require('bcrypt');

const User = require('../models/user');

const app = express();

app.use(request.urlencoded({ extended: false }))
app.use(request.json())

app.get('/users', function (req, res) {
    res.json('get user')
})
  
app.post('/users', function (req, res) {
    let body = req.body

    let user = new User({
        name: body.name,
        email: body.email,
        password: bcrypt.hashSync(body.password,10),
        role: body.role
    })


    user.save( (error, userDB) => {
        if ( error ) {
             return res.status(400).json({
                ok: false,
                error
            })
        }

        res.json({
            ok: true,
            user: userDB
        });
    })
})
  
app.put('/users/:id', function (req, res) {
    let id = req.params.id;
})

app.delete('/users', function (req, res) {
    res.json('delete user')
})

module.exports = app;