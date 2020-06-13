const express = require('express');
let app = express();

let Category = require('../models/category');
const { verifyToken } = require('../middleware/authentication');

//Show all categories
app.get('/categories', verifyToken, (req, res) => {
    
    let from  = Number(req.query.from) || 0;
    let limit = Number(req.query.to) || 10;

    Category.find()
            .sort('description')
            .skip(from)
            .limit(limit)
            .populate('user', 'name, email')
            .exec( (err, categories) => {
                if(err)
                {
                    return res.status(400).json({
                        ok: false,
                        err
                    })
                }

                if(!categories)
                {
                    return res.status(400).json({
                        ok: false,
                        err
                    })
                }

                Category.count((err, count) => {
                    res.json({
                        ok: true,
                        categories,
                        count
                    })
                })
            })
})


// Store a category
app.post('/categories', verifyToken, (req, res) => {
    let body = req.body;
 
    let category = new Category({
        description: body.description,
        user: req.user._id
    });


    category.save( (err, categoryDB) => {

        if(err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if(!categoryDB){
            return res.status(400).json({
                ok:false,
                err
            })
        }

        res.json({
            ok: true,
            category: categoryDB
        });

    })
    
})


// Find user by ID
app.get('/categories/:id', verifyToken, (req, res) => {
    let id = req.params.id;

    Category.findById(id, (err, category) => {
        if(err)
        {
            return res.status(400).json({
                ok: false, 
                err
            })
        }

        return res.json({
            ok: true,
            category
        })
    })
})


app.put('/category/:id', verifyToken, (req, res) => {
    let id   = req.params.id;
    let data = req.body; 

    Category.findByIdAndUpdate(id, data, { new: true, runValidators: true}, (err, categoryDB) => {
        if(err){
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if(!categoryDB){
            return res.status(400).json({
                ok: false,
                err
            })
        }

        res.json({
            ok: true,
            categoryDB
        });

    });
})


app.delete('/categories/:id', verifyToken, (req, res) => {
    let id = req.params.id;

    Category.findByIdAndDelete(id, (err, category) => {
        if(err){
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if(!category) {
            return res.status(400).json({
                ok: false,
                err: "ID does not exist"
            })
        }

        res.json({
            ok: true,
            message: "Category is deleted"
        })
    });
});



module.exports = app;