const Joi = require('joi');

const customerId = Joi.number().integer();
const id = Joi.number().integer();

const createOrderSchema = Joi.object({
  customerId: customerId.required(),
});

// const updateProductSchema = Joi.object({});

const getOrderSchema = Joi.object({
  id: id.required(),
});

module.exports = { createOrderSchema, getOrderSchema };
