const Joi = require('joi');
const message = require('../../../utils/customValidation.js');

const { number } = message;

const schema = Joi.object({
	number: Joi.number().integer().required().min(0).messages(number),
});

module.exports = {
	schema,
};
