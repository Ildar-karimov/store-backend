const sequelize = require('../db')
const {DataTypes} = require('sequelize')

const User = sequelize.define('user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    email: {type: DataTypes.STRING, unique: true, allowNull: false},
    password: {type: DataTypes.STRING, allowNull: false},
    name: {type: DataTypes.STRING},
    surname: {type: DataTypes.STRING},
    role: {type: DataTypes.STRING, defaultValue: "USER"},
})

const Order = sequelize.define('order', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    status: {type: DataTypes.INTEGER, defaultValue: 0},
    sum_total: {type: DataTypes.INTEGER},
    start_date: {type: DataTypes.DATE},
    end_date: {type: DataTypes.DATE},
})

const OrderProduct = sequelize.define('order_product', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    count: {type: DataTypes.INTEGER, defaultValue: 1},
    price: {type: DataTypes.INTEGER},
})

const Product = sequelize.define('product', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, allowNull: false},
    price: {type: DataTypes.INTEGER, allowNull: false},
    count: {type: DataTypes.INTEGER, allowNull: false},
    additional_products: {type: DataTypes.JSON},
})

const CategoryProduct = sequelize.define('category_product', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
})

const Category = sequelize.define('category', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false}
})

const Brand = sequelize.define('brand', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false}
})

const PayType = sequelize.define('pay_type', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false}
})

const Shop = sequelize.define('shop', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
    address: {type: DataTypes.STRING, allowNull: false},
})

const Rating = sequelize.define('rating', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    info: {type: DataTypes.STRING, unique: true, allowNull: false},
    rate: {type: DataTypes.INTEGER, allowNull: false},
    date: {type: DataTypes.DATE, allowNull: false},
})

const ProductInfo = sequelize.define('product_info', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    title: {type: DataTypes.STRING, allowNull: false},
    description: {type: DataTypes.INTEGER, allowNull: false},
})

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

Product.hasMany(ProductInfo)
ProductInfo.belongsTo(Product)

Product.hasOne(Brand)
Brand.belongsTo(Product)

Product.hasMany(CategoryProduct)
CategoryProduct.belongsTo(Product)

Product.hasMany(Rating)
Rating.belongsTo(Product)

Category.hasMany(CategoryProduct)
CategoryProduct.belongsTo(Category)

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
}
