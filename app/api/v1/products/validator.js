const Joi = require('joi');
const message = require('../../../utils/customValidation.js');

const { string, number } = message;

const schema = Joi.object({
	name: Joi.string().required().min(2).max(10).messages(string),
	price: Joi.number().integer().required().min(19).max(2013).message(number),
});

module.exports = {
	schema,
};
