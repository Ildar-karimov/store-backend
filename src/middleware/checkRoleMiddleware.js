const jwt = require('jsonwebtoken')
const tokenService = require("../services/tokenService");

module.exports = function (role) {
    return function (req, res, next) {
        if(req.method === "OPTIONS") {
            next()
        }
        try {
            const token = req.headers.authorization
            if(!token){
                return res.status(401).json({message: "Не авторизован"})
            }
            const userData = tokenService.validateAccessToken(token)
            if (!userData) {
                return res.status(401).json({message: "Не авторизован"})
            }

            if(userData.role !== role) {
                return res.status(403).json({message: "Нет доступа"})
            }
            req.user = userData
            next()
        }catch (e) {
            res.status(401).json({message: "Не авторизован"})
        }
    }
}