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
}

module.exports = new TokenService()