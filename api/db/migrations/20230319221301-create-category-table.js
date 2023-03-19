'use strict';

const {
  CategorySchema,
  CATEGORIES_TABLE,
} = require('../models/category.model');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(CATEGORIES_TABLE, CategorySchema);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(CATEGORIES_TABLE);
  },
};
