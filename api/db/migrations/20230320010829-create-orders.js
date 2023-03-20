'use strict';

const { OrderSchema, ORDERS_TABLE } = require('../models/order.model');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(ORDERS_TABLE, OrderSchema);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(ORDERS_TABLE);
  },
};
