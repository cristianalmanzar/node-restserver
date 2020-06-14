const express = require('express');
const app = express();

let Product = require('../models/product');
const { verifyToken } = require('../middleware/authentication');

app.get('/products', verifyToken, (req, res) => {

    let from  = Number(req.query.from) || 0;
    let limit = Number(req.query.to) || 10;

    Product.find({})
           .sort('name')
           .skip(from)
           .limit(limit)
           .populate('user', 'name')
           .populate('category', 'name')
           .exec((err, products) => {
               if(err){
                   return res.status(500).json({
                        ok: false,
                        err
                   });
               }

               if(!products) {
                   return res.status(400).json({
                        ok: false,
                        err
                   });
               }

               Product.count({status: 1}, (err, count) => {
                   res.json({
                       ok: true,
                       products,
                       count
                   })
               })
           })
})

app.post('/products', verifyToken, (req, res) => {
    let body = req.body;
    let [name, description, price, stock, category, user] = body;

    let product = new Product({
        name,
        description,
        price,
        stock,
        category,
        user
    })

    product.save( (err, products) => {
        if(err){
            return res.status(500).json({
                ok: false,
                err
            })
        }

        if(!products) {
            return res.status.json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            products
        });
    })

})

app.put('/products/:id', verifyToken, (req,res) => {
    let id = req.params.id;
    let body = req.body;

    Product.findByIdAndUpdate(id, body, {new: true,  runValidators: true }, (err, productDB) => {
        if(err){
            return res.status(500).json({
                ok: false,
                err
            })
        }

        if(!productDB){
            return res.status(400).json({

            });
        }
        
        res.json({
            ok: true,
            product: productDB,
        })

    })
})

app.delete('/products/:id', verifyToken, (req, res) => {
    let id = req.params.id;

    Product.findByIdAndDelete(id, (err, productDB) => {
        if(err){
            return res.status(500).json({
                ok: false,
                err
            })
        }

        if(!productDB){
            return res.status(400).json({

            });
        }
        
        res.json({
            ok: true,
            product: productDB,
            message: "Product deleted"
        })

    })
})


module.exports = app;

