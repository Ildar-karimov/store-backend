const Router = require('express')
const router = new Router()
const checkAuth = require("../middleware/authMiddleware");
const orderController = require("../controllers/orderController")
const checkRole = require("../middleware/checkRoleMiddleware");

router.get('/product-basket',checkAuth, orderController.getBasketProducts)
router.post('/create-product-basket',checkAuth, orderController.createProductAtBasket)
router.delete('/delete-product-basket/:id', checkAuth, orderController.deleteProductAtBasket)
router.get('/create-order', checkAuth, orderController.createOrder)
router.post('/finish-order',checkRole('ADMIN'), orderController.finishOrder)

module.exports = router