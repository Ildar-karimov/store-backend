const {Op, REAL, or} = require("sequelize");
const {Product, ProductInfo, AdditionalProduct} = require("../models/models");
const ProductDto = require("../dtos/productDto");
const productInfoDto = require("../dtos/productInfoDto");

class ProductService {
  async getAll(query) {
    let {brandId, currentPage, rowsOnPageCount, startPrice, endPrice, order, orderBy} = query
    currentPage = currentPage || 1
    rowsOnPageCount = rowsOnPageCount || 10
    startPrice = startPrice || 0
    endPrice = endPrice || 999999

    let offset = currentPage * rowsOnPageCount - rowsOnPageCount
    let products
    let where = {}
    let sort = []

    if (brandId) {
      where.brandId = brandId
    }
    if (startPrice || endPrice) {
      where.price = {
        [Op.between]: [startPrice, endPrice],
      }
    }
    if (orderBy && order) {
      sort.push([orderBy, order])
    }
    products = await Product.findAndCountAll({
      order: sort,
      where,
      limit: rowsOnPageCount,
      offset,
    })

    products.rows = products.rows.map(product => new ProductDto(product))
    return products
  }

  async getOne(id) {
    const product = await Product.findOne({
      where: {id},
      include: [{
        model: ProductInfo,
        as: 'info',
      }, {
        model: AdditionalProduct,
        as: 'additionalProducts',
        attributes: ["addProductId"]
      }
      ],
    })
    console.log(product.additionalProducts)
    product.info = product.info.map(infoOne => {
      return new productInfoDto(infoOne)
    })
    product.additionalProducts = await Product.findAll({
      where: {
        id: {
          [Op.or]: Array.from(product.additionalProducts.map(i => i.addProductId))
        }
      }
    })
    product.additionalProducts = product.additionalProducts.map(product => new ProductDto(product))

    return new ProductDto((product))
  }
}

module.exports = new ProductService()