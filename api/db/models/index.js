const { User, UserSchema } = require('./user.model');
const { Category, CategorySchema } = require('./category.model');

function setupModels(sequelize) {
  User.init(UserSchema, User.config(sequelize));
  Category.init(CategorySchema, Category.config(sequelize));
}

module.exports = setupModels;
