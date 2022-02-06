const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const UnauthError = require('../utils/customErrors/UnauthError');
const NotFoundError = require('../utils/customErrors/NotFoundError');
const DataError = require('../utils/customErrors/DataError');
const ConflictError = require('../utils/customErrors/ConflictError');

const getCurrentUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    return res.send({ data: user });
  } catch (err) {
    next(err);
  }
};

const patchUserData = async (req, res, next) => {
  try {
    const { email, name } = req.body;
    const isExist = await User.findOne({ email });
    if (isExist) {
      throw new ConflictError('Пользователь с таким email уже существует.');
    }
    const user = await User
      .findOneAndUpdate({ _id: req.user._id }, { email, name }, { new: true, runValidators: true });
    return res.send({ data: user });
  } catch (err) {
    if (err.name === 'ValidationError' || err.name === 'Error') {
      next(new DataError('При обновлении профиля произошла ошибка.'));
      return;
    }
    next(err);
  }
};

const createUser = async (req, res, next) => {
  try {
    const {
      name,
      email,
      password,
    } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    return res.status(201).send({
      name: newUser.name,
      email: newUser.email,
      _id: newUser._id,
    });
  } catch (err) {
    if (err.code === 11000) {
      next(new ConflictError('Пользователь с таким email уже существует.'));
      return;
    }
    if (err.name === 'ValidationError' || err.name === 'Error') {
      next(new DataError('При регистрации пользователя произошла ошибка.'));
      return;
    }
    next(err);
  }
};

const authUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      throw new UnauthError('Вы ввели неправильный логин или пароль. ');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new UnauthError('Вы ввели неправильный логин или пароль.');
    }

    const { NODE_ENV, JWT_SECRET } = process.env;

    const token = jwt.sign(
      { _id: user._id },
      NODE_ENV === 'production' ? JWT_SECRET : 'secret_code',
      { expiresIn: '1d' },
    );

    return res.status(200).cookie('jwt', token, {
      maxAge: 3600000 * 24 * 7,
      httpOnly: true,
    }).send({ _id: user._id, name: user.name, email: user.email });
  } catch (err) {
    next(err);
  }
};

const unauthUser = (req, res, next) => {
  try {
    if (!req.cookies.jwt) {
      throw new NotFoundError('Вы не были авторизованы чтобы выйти из системы.');
    }
    return res.status(200).clearCookie('jwt').send({ message: 'Bye!' });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getCurrentUser,
  patchUserData,
  createUser,
  authUser,
  unauthUser,
};
