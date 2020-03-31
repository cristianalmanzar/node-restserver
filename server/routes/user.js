const express = require('express');
const request = require('body-parser');

const bcrypt = require('bcrypt');
const _ = require('underscore');

const User = require('../models/user');

const app = express();

app.use(request.urlencoded({ extended: false }))
app.use(request.json())

app.get('/users', function (req, res) {
    User.find({})
        .skip(5)
        .limit(5)
        .exec( (err, users) => {
            if(err){
                return res.status(400).json({
                    ok: false,
                    err
                });
            }

            res.json({
                ok: true,
                users
            })
        });
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
    let body = _.pick(req.body,['name','email','img','role','status']);

    User.findByIdAndUpdate( id, body, {new: true, runValidators: true}, (err, userDB) => {
        if( err ) {
            return res.status(400).json({
                ok: false,
                err
            })
        }

        res.json({
            ok: true,
            user: userDB
        })
    })

})

app.delete('/users', function (req, res) {
    res.json('delete user')
})

module.exports = app;