const jwt = require('jsonwebtoken');

// CHECK TOKEN

let verifyToken = ( req, res, next ) => {
    let token = req.get('token');
    let SEED = process.env.SEED = process.env.SEED;
    jwt.verify(token, SEED, (err, decoded) => {
        if (err) {
            return res.status(401).json({
                ok: false,
                err
            })
        }

        req.user = decoded.user
        next();

    });

    // res.json({
    //     token
    // })


}




module.exports =  {
    verifyToken
}