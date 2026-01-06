const mongoose = require("mongoose");
var validator = require('validator');
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    default: "Jacques Cousteau",
    minlength: 2,
    maxlength: 30,
  },
  about: {
    type: String,
    default: "Explorer",
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
    type: String,
    default: "https://practicum-content.s3.us-west-1.amazonaws.com/resources/moved_avatar_1604080799.jpg",
    validate: {
      validator(v) {
        return /^https?:\/\/.+/.test(v);
      },
      message: 'Link deve ser uma URL válida',
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    validate: {
      validator: (value) => validator.isEmail(value),
      message: "E-mail inválido"
    }
  },

  password:{
    type:String,
    required: true,
    minlength: 6,
    select:false
  }

});

module.exports = mongoose.model("User", userSchema);
