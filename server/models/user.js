const mongoose = require('mongoose');

const uniqueValidator = require('mongoose-unique-validator');

let roles = {
    values: ['ADMIN_ROLE', 'USER_ROLE'],
    message: '{VALUE} is not a valid role' 
}
let Schema = mongoose.Schema;

let userSchema = new Schema({
    name: {
        type: String,
        required:  [true,'Name is required']
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'Email is required']
    },
    password: {
        type: String,
        required: [true, 'Password is required']
    },
    img: {
        type: String,
        required: false
    },
    role: {
        type: String,
        required: [true, 'Role is required'],
        default: 'USER_ROLE',
        enum: roles
    },
    status: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    }

});

userSchema.methods.toJSON = function() {
    let user = this;
    let userObj = user.toObject();
    delete userObj.password;
    return userObj;
}

userSchema.plugin(uniqueValidator, {
    message: '{PATH} already exist'
})

module.exports = mongoose.model('User', userSchema);