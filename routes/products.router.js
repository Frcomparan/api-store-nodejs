const express = require('express');
const ProductService = require('../services/product.service');

const router = express.Router();
// const service = new ProductService();
const service = ProductService.getInstance();

router.get('/', async (req, res, next) => {
  try {
    const products = await service.find();

    res.json(products);
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await service.findOne(id);

    res.json(product);
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const body = req.body;
    const newProduct = await service.create(body);

    res.status(201).json(newProduct);
  } catch (error) {
    next(error);
  }
});

router.put('/:id', async (req, res, next) => {
  try {
    const body = req.body;
    const { id } = req.params;
    const product = await service.update(id, body);

    res.json(product);
  } catch (error) {
    next(error);
  }
});

router.patch('/:id', async (req, res, next) => {
  try {
    const body = req.body;
    const { id } = req.params;
    const product = await service.update(id, body);

    res.json(product);
  } catch (error) {
    next(error);
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
