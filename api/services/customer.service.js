const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');
const bcrypt = require('bcrypt');

class CustomerService {
  constructor() {}

  async create(data) {
    const newCustomer = await models.Customer.create(data, {
      include: ['user'],
    });

    delete newCustomer.dataValues.user.dataValues.password;
    return newCustomer;
  }

  async find() {
    const customer = await models.Customer.findAll({
      include: ['user'],
    });
    return customer;
  }

  async findOne(id) {
    const customer = await models.Customer.findByPk(id);
    if (!customer) {
      throw boom.notFound('customer not found');
    }
    return customer;
  }

  async update(id, changes) {
    const customer = await this.findOne(id);
    const rta = await customer.update(changes);
    return rta;
  }

  async delete(id) {
    const customer = await this.findOne(id);
    await customer.destroy();
    return { id };
  }
}

module.exports = CustomerService;
