const mongoose = require('mongoose');
const validator=require('validator')
const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        trim: true
    },
    lastName:{
        type: String,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        trim: true,
        validate: {
            validator: validator.isEmail,
            message: props => `${props.value} is not a valid email address!`
        }

    },
    password: {
        type: String,
        trim: true
    },
    role:{
      type:Number,
      
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
