const express = require('express');
const ProductService = require('../services/product.service');

const router = express.Router();
// const service = new ProductService();
const service = ProductService.getInstance();

router.get('/', async (req, res) => {
  try {
    const products = await service.find();

    res.json(products);
  } catch (error) {
    res.status(404).json({
      message: error.message,
    });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const product = await service.findOne(id);

    res.json(product);
  } catch (error) {
    res.status(404).json({
      message: error.message,
    });
  }
});

router.post('/', async (req, res) => {
  try {
    const body = req.body;
    const newProduct = await service.create(body);

    res.status(201).json(newProduct);
  } catch (error) {
    res.status(404).json({
      message: error.message,
    });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const body = req.body;
    const { id } = req.params;
    const product = await service.update(id, body);

    res.json(product);
  } catch (error) {
    res.status(404).json({
      message: error.message,
    });
  }
});

router.patch('/:id', async (req, res) => {
  try {
    const body = req.body;
    const { id } = req.params;
    const product = await service.update(id, body);

    res.json(product);
  } catch (error) {
    res.status(404).json({
      message: error.message,
    });
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const response = await service.delete(id);

  res.json(response);
});

router.get('/filter', (req, res) => {
  res.send('Yo soy un filter');
});

module.exports = router;
