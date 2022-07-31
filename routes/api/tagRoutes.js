const router = require('express').Router()
const { Tag, Product, ProductTag } = require('../../models')

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  try {
    const tagData = await Tag.findAll({
      attributes: ['id', 'tag_name'],
      include: [
        {
          model: Product,
          // be sure to include its associated Products
          attributes: ['id', 'product_name', 'price', 'stock', 'category_id'],
          through: 'ProductTag'
        }
      ]
    })

    res.status(200).json(tagData)
  } catch (err) {
    res.status(500).json(err)
  }
})

router.get('/:id', async (req, res) => {
  // find one tag by its `id` value
  try {
    const tagFind = await Tag.findByPk(req.params.id, {
      include: [
        {
          model: Product,
          // be sure to include its associated Products
          attributes: ['id', 'product_name', 'price', 'stock', 'category_id'],
          through: 'ProductTag'
        }
      ]
    })

    if (!tagFind) {
      res.status(404).json({ message: 'No tag found with this id' })
      return
    }

    res.status(200).json(tagFind).json(tagFind)
  } catch (err) {
    res.status(500).json(err)
  }
})

router.post('/', async (req, res) => {
  // create a new tag
  try {
    const tagData = await Tag.create(req.body)
    res.status(200).json(tagData)
  } catch (err) {
    res.status(400).json(err)
  }
})

router.put('/:id', async (req, res) => {
  // update a tag by its `id` value
  try {
    const tagUpdate = await Tag.update(req.body, {
      where: {
        id: req.params.id
      }
    })

    if (!tagUpdate) {
      res.status(404).json({ message: 'No tag found with this id' })
      return
    }
    res.status(200).json(tagUpdate)
  } catch (err) {
    res.status(500).json(err)
  }
})

router.delete('/:id', async (req, res) => {
  // delete a tag by its `id` value
  try {
    const tagData = await Tag.destroy({
      where: {
        id: req.params.id
      }
    })

    if (!tagData) {
      res.status(404).json({ message: 'No tag found with this id' })
      return
    }

    res.status(200).json(tagData)
  } catch (err) {
    res.status(500).json(err)
  }
})

module.exports = router
