const {Brand, Product} = require('../models/models')
const ApiError = require('../error/ApiError')
const BrandDto = require("../dtos/brandDto");

class BrandController {
  async create(req, res) {
    const {name} = req.body
    const brand = await Brand.create({name})
    return res.json(brand)
  }

  async getAll(req, res) {
    let brands = await Brand.findAll()
    brands = brands.map(brand => new BrandDto(brand))

    return res.json(brands)
  }

  async getOne(req, res) {

  }
}

module.exports = new BrandController()