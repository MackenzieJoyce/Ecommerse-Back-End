const router = require('express').Router()
const { Category, Product } = require('../../models')

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  try {
    const categoryData = await Category.findAll({
      include: [
        {
          model: Product,
          // be sure to include its associated Products
          attributes: ['id', 'product_name', 'price', 'stock', 'category_id']
        }
      ]
    })

    res.status(200).json(categoryData)
  } catch (err) {
    res.status(500).json(err)
  }
})

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  try {
    const categoryFind = await Category.findByPk(req.params.id, {
      include: [
        {
          model: Product,
          // be sure to include its associated Products
          attributes: ['id', 'product_name', 'price', 'stock', 'category_id']
        }
      ]
    })

    if (!categoryFind) {
      res.status(404).json({ message: 'No category found with this id' })
      return
    }

    res.status(200).json(categoryFind).json(categoryFind)
  } catch (err) {
    res.status(500).json(err)
  }
})

router.post('/', async (req, res) => {
  // create a new category
  try {
    const categoryData = await Category.create(req.body)
    res.status(200).json(categoryData)
  } catch (err) {
    res.status(400).json(err)
  }
})

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {
    const categoryUpdate = await Category.update(req.body, {
      where: {
        id: req.params.id
      }
    })

    if (!categoryUpdate) {
      res.status(404).json({ message: 'No category found with this id' })
      return
    }
    res.status(200).json(categoryUpdate)
  } catch (err) {
    res.status(500).json(err)
  }
})

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const categoryData = await Category.destroy({
      where: {
        id: req.params.id
      }
    })

    if (!categoryData) {
      res.status(404).json({ message: 'No category found with this id' })
      return
    }

    res.status(200).json(categoryData)
  } catch (err) {
    res.status(500).json(err)
  }
})

module.exports = router
