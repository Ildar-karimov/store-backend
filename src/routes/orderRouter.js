const Router = require('express')
const router = new Router()
const checkAuth = require("../middleware/authMiddleware");
const orderController = require("../controllers/orderController")

router.post('/create-product-basket',checkAuth, orderController.createProductAtBasket)
router.delete('/delete-product-basket', checkAuth, orderController.deleteProductAtBasket)

module.exports = router