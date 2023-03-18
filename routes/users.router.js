const express = require('express');
const { faker } = require('@faker-js/faker');

const router = express.Router();

router.get('/', (req, res) => {
  const { limit, offset } = req.query;

  if (limit && offset) {
    res.json({
      limit,
      offset,
    });
  } else {
    res.send('No hay parametros');
  }
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

module.exports = router;
