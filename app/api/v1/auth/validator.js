const Joi = require('joi');
const message = require('../../../utils/customValidation.js');

const { string } = message;

const schema = Joi.object({
	nim: Joi.string().required().min(8).messages(string),
	password: Joi.string().min(8).required().messages(string),
});

module.exports = {
	schema,
};
