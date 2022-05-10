const {User, Order} = require('../models/models')
const ApiError = require('../error/ApiError')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const userService = require('../services/userService')
const {validationResult} = require('express-validator')

class UserController {
  async registration(req, res, next) {

    const errors = validationResult(req);
    if(!errors.isEmpty()){
      return next(ApiError.badRequest('Ошибка валидации'))
    }

    const {email, password} = req.body
    if (!email || !password) {
      return next(ApiError.badRequest('некорректный email или пароль'))
    }
    const candidate = await User.findOne({where: {email}})
    if (candidate) {
      return next(ApiError.badRequest('Пользователь с таким email существует'))
    }
    const userData = await userService.registration(req.body)
    res.cookie('refreshToken', userData.refreshToken, {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    })
    return res.json(userData)
  }

  async login(req, res, next) {
    const {email, password} = req.body
    const user = await User.findOne({where: {email}})
    if (!user) {
      return next(ApiError.internal('Пользователь с таким email не найден'))
    }
    let comparePassword = bcrypt.compareSync(password, user.password)
    if (!comparePassword) {
      return next(ApiError.internal('Неверный пароль'))
    }
    const token = generateJwt(user.id, user.email, user.role, user.name, user.surname)
    return res.json({token})
  }

  async checkAuthToken(req, res, next) {
    const token = generateJwt(req.user.id, req.user.email, req.user.role, req.user.name, req.user.surname)
    return res.json({token})
  }

  async logout(req, res, next) {
    try {

    } catch (e) {

    }
  }

  async refresh(req, res, next) {
    try {

    } catch (e) {

    }
  }
}

const generateJwt = (id, email, role, name, surname) => {
  return jwt.sign(
    {id, email, role, name, surname},
    process.env.SECRET_KEY,
    {expiresIn: '30m'}
  )
}

module.exports = new UserController()