const express = require('express');
const { faker } = require('@faker-js/faker');

const router = express.Router();

router.get('/', (req, res) => {
  res.send('Yo soy una ruta de vista');
});

router.post('/', (req, res) => {
  res.send('Yo soy una ruta de creación');
});

router.get('/:id', (req, res) => {
  res.send('Yo soy una ruta de vista individual');
});

router.put('/:id', (req, res) => {
  res.send('Yo soy una ruta de actualización');
});

router.delete('/:id', (req, res) => {
  res.send('Yo soy una ruta de eliminación');
});

router.get('/:categoryId/products/:productId', (req, res) => {
  const { categoryId, productId } = req.params;
  res.json({
    categoryId,
    productId,
  });
});

module.exports = router;
