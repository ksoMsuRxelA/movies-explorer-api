const { Schema, model } = require('mongoose');
const validatorModule = require('validator');

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator(v) {
        return validatorModule.isEmail(v);
      },
      message: 'Ошибка на уровне схемы. Невалидный email',
    },
  },
  password: {
    type: String,
    select: false,
    required: true,
  },
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
});

module.exports = model('user', userSchema);
