const Joi = require('joi');
const message = require('../../../utils/customValidation.js');

const { number } = message;

const schema = Joi.object({
	number: Joi.number().integer().required().min(0).message(number),
});

module.exports = {
	schema,
};
