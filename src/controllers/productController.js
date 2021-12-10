const {Product, ProductInfo} = require('../models/models')
const ApiError = require('../error/ApiError')
const uuid = require('uuid')
const path = require('path')

class ProductController {
    async create(req, res, next) {
        try {
            let {name, price, count, additional_products, brandId, info} = req.body
            const {img} = req.files
            let fileName = uuid.v4() + '.jpg'
            img.mv(path.resolve(__dirname, '..', 'static', fileName))
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
        let {brandId, currentPage, rowsOnPageCount} = req.query
        currentPage = currentPage || 1
        rowsOnPageCount = rowsOnPageCount || 10
        let offset = currentPage * rowsOnPageCount - rowsOnPageCount
        let products
        if (brandId) {
            products = await Product.findAndCountAll({
                where: {brandId},
                limit: rowsOnPageCount,
                offset,
            })
        } else {
            products = await Product.findAndCountAll({
                limit: rowsOnPageCount,
                offset
            })
        }
        return res.json(products)
    }

    async getOne(req, res) {
        const {id} = req.params
        const product = await Product.findOne({
            where: {id},
            include: [{model: ProductInfo, as: 'info'}],
        })

        return res.json(product)
    }
}

module.exports = new ProductController()