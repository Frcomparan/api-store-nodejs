const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');

class UserService {
  constructor() {}

  async create(data) {
    console.log({ data });
    const newUser = await models.User.create(data);
    return newUser;
  }

  async find() {
    const users = await models.User.findAll({
      include: ['customer'],
      attributes: {
        exclude: ['password'],
      },
    });
    return users;
  }

  async findOne(id) {
    const user = await models.User.findByPk(id, {
      attributes: {
        exclude: ['password'],
      },
    });
    if (!user) {
      throw boom.notFound('user not found');
    }
    return user;
  }

  async update(id, changes) {
    const user = await this.findOne(id);
    const rta = await user.update(changes);
    return rta;
  }

  async delete(id) {
    const user = await this.findOne(id);
    await user.destroy();
    return { id };
  }
}

module.exports = UserService;
