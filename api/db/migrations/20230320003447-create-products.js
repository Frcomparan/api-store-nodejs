'use strict';

const { ProductSchema, PRODUCTS_TABLE } = require('../models/product.model');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(PRODUCTS_TABLE, ProductSchema);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(PRODUCTS_TABLE);
  },
};
