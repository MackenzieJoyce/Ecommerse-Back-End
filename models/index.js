// import models
const Product = require('./Product')
const Category = require('./Category')
const Tag = require('./Tag')
const ProductTag = require('./ProductTag')
const { createHash } = require('crypto')
const { stubFalse } = require('lodash')

// Products belongsTo Category
Product.belongsTo(Category, {
  foreignKey: 'category_id'
})

// Categories have many Products
Category.hasMany(Product, {
  foreignKey: 'category_id',
  onDelete: 'CASCADE'
})

// Products belongToMany Tags (through ProductTag)
Product.belongToMany(Tag, {
  through: {
    model: ProductTag,
    unique: false
  },
  as: '_product_'
})

// Tags belongToMany Products (through ProductTag)
Tag.belongsToMany(Product, {
  through: {
    model: ProductTag,
    unique: false
  },
  as: '_tags_'
})

module.exports = {
  Product,
  Category,
  Tag,
  ProductTag
}
