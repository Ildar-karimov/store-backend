const ApiError = require('../error/ApiError')
const {Category} = require("../models/models");
const CategoryDto = require("../dtos/categoryDto");
const categoryService = require("../services/categoryService");

class CategoryController {


  async getAll(req, res) {
    let categories = await Category.findAll()
    categories = categories.map(category => new CategoryDto(category))

    return res.json(categories)
  }

  async getOne(req, res) {
    const {id} = req.params
    const categoryData = await categoryService.getOne(id)

    return res.json(categoryData)
  }
}

module.exports = new CategoryController()