const {Product, ProductInfo, AdditionalProduct} = require('../models/models')
const ApiError = require('../error/ApiError')
const uuid = require('uuid')
const path = require('path')
const {Op} = require("sequelize");
const productService = require('../services/productService')
const UserDataset = require("../models/user-dataset-model");
const User = require("../models/user-model");
const orderModel = require("../models/order-model");
const orderService = require("../services/orderService");

class ProductController {
  async create(req, res, next) {
    try {
      let {name, price, count, additionalProducts, brandId, info} = req.body
      additionalProducts = JSON.parse(additionalProducts)
      info = JSON.parse(info)
      const {img} = req.files
      let fileName = uuid.v4() + '.jpg'
      await img.mv(path.resolve(__dirname, '..', 'static', fileName))
      const product = await Product.create({name, price, count, brandId, img: fileName})

      if (info && info.length !== 0) {
        info.forEach(i => {
          ProductInfo.create({
            title: i.title,
            description: i.description,
            productId: product.id,
          })
        })
      }
      if (additionalProducts && additionalProducts.length !== 0) {
        additionalProducts.forEach(i => {
          AdditionalProduct.create({
            productId: product.id,
            addProductId: i,
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

  async getRecommendProducts(req, res) {
    const {userDatasetId} = req.user

    const dataset = await UserDataset.findAll({
      attributes: {
        exclude: ['createdAt', 'updatedAt'],
      },
      where: {
        id: {
          [Op.not]: userDatasetId,
        }
      }
    })

    const currentUserDataset = await UserDataset.findOne({
      attributes: {
        exclude: ['createdAt', 'updatedAt', 'id'],
      },
      where: {id: userDatasetId}
    })
    // let rows = ['id', 'age', 'sex', 'categoryId', 'r2', 'r3', 'r4', 'r5', 'r6', 'r7', 'r8']

    const currentUserDataset1 = currentUserDataset.toJSON()


    let AlikePercent = dataset.map(row => {
      const row1 = row.toJSON()
      delete row1.id

      let result = 0
      Object.values(currentUserDataset1).forEach((val, i) => {
        if (val === Object.values(row1)[i]) {
          result++
        }
      })

      return {
        id: row.id,
        alike: result / 10,
      }
    })

    AlikePercent = AlikePercent
    .filter(row => row.alike >= 0.6)
    .sort((a, b) => b.alike - a.alike)

    if (AlikePercent.length !== 0) {
      let recommendProducts = []
      for (const row of AlikePercent) {
        let {id: userId} = await (await User.findOne({
          attributes: ['id'],
          where: {userDatasetId: row.id}
        })).toJSON()

        let userOrders = await orderModel.findAll({
          where: {
            userId,
          },
        })

        for (const el of userOrders) {
          let products = await orderService.getProductsOfOrder(el.id)
          products.forEach(product => {
            if (!recommendProducts.find(row => row.id === product.id)) {
              recommendProducts.push(product)
            }
          })
        }
      }

      return res.json(recommendProducts)
    } else return res.json([])
  }
}

module.exports = new ProductController()