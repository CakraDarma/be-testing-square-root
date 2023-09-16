const Joi = require('joi');

const schema = Joi.object({
	name: Joi.string().alphanum().min(3).max(30).required(),
	price: Joi.number().integer().min(1900).max(2013),
});

module.exports = {
	schema,
};
