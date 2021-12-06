const {User} = require('../models/models')
const ApiError = require('../error/ApiError')

class UserController {
    async registration(req, res) {

    }

    async login(req, res) {

    }

    async checkAuthToken(req, res) {
        const query = req.query
    }
}

module.exports = new UserController()