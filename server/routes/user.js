const express = require('express');


const bcrypt = require('bcrypt');
const _ = require('underscore');

const User = require('../models/user');
const { verifyToken } = require('../middleware/authentication')

const app = express();

app.get('/users', verifyToken, (req, res) => {

    let from = Number(req.query.from) || 0;
    let limit = Number(req.query.to) || 10;

    User.find({ status: true })
        .skip(from)
        .limit(limit)
        .exec( (err, users) => {
            if(err){
                return res.status(400).json({
                    ok: false,
                    err
                });
            }

            User.count({ status: true }, (err,count) =>{
                res.json({
                    ok: true,
                    users,
                    count
                })
            })
        });
})
  
app.post('/users',  (req, res) => {
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
  
app.put('/users/:id', verifyToken, (req, res) => {
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

app.delete('/users/:id', verifyToken , (req, res) => {
    let id = req.params.id;

    User.findByIdAndUpdate(id, {status: false}, {new: true, runValidators: true}, (err, userDB) => {
        if(err){
            res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            user: userDB
        });
    })
    // User.findByIdAndRemove(id, (err, userDeleted) => {

    //     if (!userDeleted){
    //         return res.status(400).json({
    //             ok: false,
    //             err: 'User does not exists'
    //         })
    //     }
        
    //     if(err)
    //     {
    //         return res.status(400).json({
    //             ok: false,
    //             err
    //         })
    //     }

    //     res.json({
    //         ok: true,
    //         user: userDeleted
    //     })
    // });
})

module.exports = app;