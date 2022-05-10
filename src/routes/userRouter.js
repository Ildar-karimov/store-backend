const Router = require('express')
const router = new Router()
const userController = require('../controllers/userController')
const authMiddleware = require('../middleware/authMiddleware')

router.post('/registration', userController.registration)
router.post('/login', userController.login)
router.get('/check-auth-token', authMiddleware, userController.checkAuthToken)

router.post('/logout', userController.logout)
router.get('/refresh', userController.refresh)


module.exports = router