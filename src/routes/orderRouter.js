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

router.get('/user-orders',checkAuth, orderController.getUserOrders)
router.get('/all-orders',checkRole('ADMIN'), orderController.getAllOrders)
module.exports = router