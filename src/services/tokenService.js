const jwt = require("jsonwebtoken");
const {options} = require("pg/lib/defaults");
const {Token} = require("../models/models")

class TokenService {
  generateTokens(payload) {
    const accessToken = jwt.sign(payload, process.env.SECRET_ACCESS_KEY, {
      expiresIn: '30m'
    })
    const refreshToken = jwt.sign(payload, process.env.SECRET_REFRESH_KEY, {
      expiresIn: '30d'
    })

    return {
      accessToken,
      refreshToken
    }
  }

  validateAccessToken(token) {
    try {
      const userData = jwt.verify(token, process.env.SECRET_ACCESS_KEY)
      return userData
    } catch (e) {
      return null;
    }
  }

  validateRefreshToken(token) {
    try {
      const userData = jwt.verify(token, process.env.SECRET_REFRESH_KEY)
      return userData
    } catch (e) {
      return null;
    }
  }

  async saveToken(userId, refreshToken) {
    const tokenData = await Token.findOne({where: {userId}})
    if (tokenData) {
      return Token.update(
        {refreshToken},
        {where: {id: tokenData.id}}
      )
    }

    const token = await Token.create({
      refreshToken,
      userId,
    })
    return token
  }

  async removeToken(refreshToken) {
    return await Token.destroy({
      where: {
        refreshToken
      }
    })
  }

  async findToken(refreshToken) {
    return await Token.findOne({where: {refreshToken}})
  }
}

module.exports = new TokenService()