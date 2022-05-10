const ApiError = require("../error/ApiError");
const {User, Order} = require("../models/models");
const bcrypt = require("bcrypt");
const tokenService = require('./tokenService')
const UserDto = require('../dtos/userDto')

class UserService {
  async registration({email, password, role, name, surname}) {
    const hashPassword = await bcrypt.hash(password, 4)
    const user = await User.create({
      email,
      password: hashPassword,
      role,
      name,
      surname
    })
    const userDto = new UserDto(user)
    await Order.create({userId: user.id})
    const tokens = tokenService.generateTokens({...userDto})
    await tokenService.saveToken(userDto.id, tokens.refreshToken)

    return {
      ...tokens,
      user: userDto
    }
  }

  async login(user) {
    const userDto = new UserDto(user)
    const tokens = tokenService.generateTokens({...userDto})
    await tokenService.saveToken(userDto.id, tokens.refreshToken)

    return {
      ...tokens,
      user: userDto
    }
  }

  async logout(refreshToken) {
    const token = await tokenService.removeToken(refreshToken);
    return token;
  }

  async refresh(refreshToken) {
    const userData = tokenService.validateRefreshToken(refreshToken)
    const tokenFromDb = await tokenService.findToken(refreshToken)
    if (!userData || !tokenFromDb) {
      throw ApiError.unauthorizedError();
    }

    const user = await User.findOne({where: {id: userData.id}})
    const userDto = new UserDto(user)
    const tokens = tokenService.generateTokens({...userDto})
    await tokenService.saveToken(userDto.id, tokens.refreshToken)

    return {
      ...tokens,
      user: userDto
    }
  }
}

module.exports = new UserService()