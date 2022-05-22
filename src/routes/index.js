const Router = require('express')
const router = new Router()
const userRouter = require('./userRouter')
const productRouter = require('./productRouter')
const brandRouter = require('./brandRouter')
const categoryRouter = require('./categoryRouter')
const orderRouter = require('./orderRouter')

router.use('/user', userRouter)
router.use('/product', productRouter)
router.use('/brand', brandRouter)
router.use('/category', categoryRouter)
router.use('/order', orderRouter)

module.exports = router