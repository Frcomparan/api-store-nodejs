const { faker } = require('@faker-js/faker');
const boom = require('@hapi/boom');
const sequelize = require('../libs/sequelize');

class ProductService {
  static _productsServiceInstance = null;

  constructor() {
    this.products = [];
    this.generate();
  }

  static getInstance() {
    if (ProductService._productsServiceInstance === null) {
      ProductService._productsServiceInstance = new ProductService();
    }
    return ProductService._productsServiceInstance;
  }

  generate() {
    const limit = 100;

    for (let i = 0; i < limit; i++) {
      this.products.push({
        id: faker.datatype.uuid(),
        name: faker.commerce.productName(),
        price: parseInt(faker.commerce.price(), 10),
        image: faker.image.imageUrl(),
        isBlock: faker.datatype.boolean(),
      });
    }
  }

  async create(data) {
    const newProduct = {
      id: faker.datatype.uuid(),
      ...data,
    };
    this.products.push(newProduct);
    return newProduct;
  }

  async find() {
    // const query = 'SELECT * FROM tasks';
    // const [data] = await sequelize.query(query);
    return this.products;
    return data;
  }

  async findOne(id) {
    const product = this.products.find((item) => item.id === id);
    if (!product) {
      throw boom.notFound('product not found');
    }

    if (product.isBlock) {
      throw boom.conflict('product is block');
    }
    return product;
  }

  async update(id, changes) {
    const index = this.products.findIndex((item) => item.id === id);

    if (index === -1) {
      throw boom.notFound('product not found');
    }

    const product = this.products[index];
    this.products[index] = {
      ...product,
      ...changes,
    };
    return this.products[index];
  }

  async delete(id) {
    const index = this.products.findIndex((item) => item.id === id);

    if (index === -1) {
      throw boom.notFound('product not found');
    }

    this.products.splice(index, 1);
    return { id };
  }
}

module.exports = ProductService;
