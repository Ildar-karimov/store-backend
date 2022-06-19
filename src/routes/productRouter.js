const Router = require('express')
const router = new Router()
const productController = require('../controllers/productController')
const checkRole = require("../middleware/checkRoleMiddleware");
const authMiddleware = require('../middleware/authMiddleware')

router.post('/create',checkRole('ADMIN'), productController.create)
router.get('/', productController.getAll)
router.get('/recommend-products', authMiddleware, productController.getRecommendProducts)
router.get('/:id', productController.getOne)

module.exports = router