const {Category} = require("../models/models");
const CategoryDto = require("../dtos/categoryDto");


class CategoryService {
  async getOne(id) {
    const category = await Category.findByPk(id)
    return new CategoryDto(category)
  }
}

module.exports = new CategoryService()