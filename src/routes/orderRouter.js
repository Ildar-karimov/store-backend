const Router = require('express')
const router = new Router()
const checkAuth = require("../middleware/authMiddleware");
const orderController = require("../controllers/orderController")


router.get('/product-basket',checkAuth, orderController.getBasketProducts)
router.post('/create-product-basket',checkAuth, orderController.createProductAtBasket)
router.delete('/delete-product-basket/:id', checkAuth, orderController.deleteProductAtBasket)

module.exports = router