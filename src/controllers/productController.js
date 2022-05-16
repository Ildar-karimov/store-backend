const {Product, ProductInfo} = require('../models/models')
const ApiError = require('../error/ApiError')
const uuid = require('uuid')
const path = require('path')
const {Op} = require("sequelize");
const productService = require('../services/productService')

class ProductController {
  async create(req, res, next) {
    try {
      let {name, price, count, additional_products, brandId, info} = req.body
      const {img} = req.files
      let fileName = uuid.v4() + '.jpg'
      await img.mv(path.resolve(__dirname, '..', 'static', fileName))
      const product = await Product.create({name, price, count, additional_products, brandId, img: fileName})

      if (info) {
        info = JSON.parse(info)
        info.forEach(i => {
          ProductInfo.create({
            title: i.title,
            description: i.description,
            productId: product.id,
          })
        })
      }

      return res.json(product)
    } catch (e) {
      next(ApiError.badRequest(e.message))
    }

  }

  async getAll(req, res) {
    const productData = await productService.getAll(req.query)

    return res.json(productData)
  }

  async getOne(req, res) {
    const {id} = req.params
    const productData = await productService.getOne(id)

    return res.json(productData)
  }
}

module.exports = new ProductController()