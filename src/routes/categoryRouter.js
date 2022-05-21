const Router = require("express");
const categoryController = require('../controllers/categoryController')

const router = new Router()
router.get('/', categoryController.getAll)
router.get('/:id', categoryController.getOne)

module.exports = router