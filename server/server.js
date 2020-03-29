require('./config/config');
const express = require('express');
const request = require('body-parser');
const app = express();

app.use(request.urlencoded({ extended: false }))

app.use(request.json())
 
app.get('/users', function (req, res) {
  res.json('get user')
})

app.post('/users', function (req, res) {
    let body = req.body
    if(body.name === undefined ) {
        res.status(400).json({
            ok: false,
            message: 'Name is required'
        })
    } else {

        res.json({
            data: body
        })
    }
})

app.put('/users/:id', function (req, res) {
    let id = req.params.id;
})

app.delete('/users', function (req, res) {
    res.json('delete user')
})



 
app.listen(process.env.PORT, () => {
    console.log('Escuchando puerto', process.env.PORT);
})