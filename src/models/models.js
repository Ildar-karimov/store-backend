const User = require('./user-model')
const Order = require('./order-model')
const OrderProduct = require('./order-product-model')
const Product = require('./product-model')
const CategoryProduct = require('./category-product-model')
const Category = require('./category-model')
const Brand = require('./brand-model')
const PayType = require('./paytype-model')
const Shop = require('./shop-model')
const Rating = require('./rating-model')
const ProductInfo = require('./productinfo-model')
const Token = require('./token-model')

User.hasOne(Token)
Token.belongsTo(User)

User.hasOne(Order)
Order.belongsTo(User)

User.hasMany(Rating)
Rating.belongsTo(User)

Order.hasMany(OrderProduct)
OrderProduct.belongsTo(Order)

Order.hasOne(PayType)
PayType.belongsTo(Order)

Order.hasOne(Shop)
Shop.belongsTo(Order)

Product.hasMany(OrderProduct)
OrderProduct.belongsTo(Product)

Product.hasMany(ProductInfo, {as: 'info'})
ProductInfo.belongsTo(Product)

Product.hasMany(CategoryProduct)
CategoryProduct.belongsTo(Product)

Product.hasMany(Rating)
Rating.belongsTo(Product)

Category.hasMany(CategoryProduct)
CategoryProduct.belongsTo(Category)

Brand.hasMany(Product)
Product.belongsTo(Brand)

module.exports = {
    User,
    Order,
    OrderProduct,
    PayType,
    Shop,
    Product,
    Rating,
    ProductInfo,
    Category,
    CategoryProduct,
    Brand,
    Token,
}
