const Joi = require('joi');

const addProductSchema = Joi.object({
  id: Joi.number().integer().positive().required(),
});

module.exports = {
  addProductSchema,
};