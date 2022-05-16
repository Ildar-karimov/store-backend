const {Op, REAL} = require("sequelize");
const {Product, ProductInfo} = require("../models/models");
const ProductDto = require("../dtos/productDto");

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
      include: [{model: ProductInfo, as: 'info'}],
    })

    return new ProductDto(product)
  }
}

module.exports = new ProductService()