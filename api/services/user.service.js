const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');
class UserService {
  constructor() {}

  async create(data) {
    return data;
  }

  async find() {
    // const client = await getConnection();
    // const rta = await client.query('SELECT * FROM tasks');
    // const query = 'SELECT * FROM tasks';
    // const rta = await this.pool.query(query);
    const users = await models.User.findAll();
    return users;
  }

  async findOne(id) {
    return { id };
  }

  async update(id, changes) {
    return {
      id,
      changes,
    };
  }

  async delete(id) {
    return { id };
  }
}

module.exports = UserService;
