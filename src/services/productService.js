const {Op, REAL} = require("sequelize");
const {Product} = require("../models/models");
const ProductDto = require("../dtos/productDto");

class ProductService {
  async getAll(query) {
    let {brandId, currentPage, rowsOnPageCount, startPrice, endPrice} = query
    currentPage = currentPage || 1
    rowsOnPageCount = rowsOnPageCount || 10
    startPrice = startPrice || 0
    endPrice = endPrice || 999999

    let offset = currentPage * rowsOnPageCount - rowsOnPageCount
    let products
    let where = {}

    if (brandId) {
      where.brandId = brandId
    }
    if (startPrice || endPrice) {
      where.price = {
        [Op.between]: [startPrice, endPrice],
      }
    }
    products = await Product.findAndCountAll({
      where,
      limit: rowsOnPageCount,
      offset,
    })

    products.rows = products.rows.map(product => new ProductDto(product))
    return products
  }
}

module.exports = new ProductService()