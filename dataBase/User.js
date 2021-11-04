const {Schema, model} = require('mongoose');

const usersRoles = require('../configs/user-roles.enum');

const userSchema = new Schema({
    name: {
        type: String,
        required: false,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        trim:true,
        required: true
    },
    role: {
        type: String,
        default: usersRoles.USER,
        enum: Object.values(usersRoles)
    }
}, {timestamps: true});

module.exports = model('user', userSchema);
