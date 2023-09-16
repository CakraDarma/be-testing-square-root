const Joi = require('joi');
const message = require('../../../utils/customValidation.js');

const { string, number } = message;

const schema = Joi.object({
	nama: Joi.string().required().min(4).max(20).messages(string),
});

module.exports = {
	schema,
};
