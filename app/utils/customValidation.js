const message = {
	string: {
		'any.required': '{{#label}} is required',
		'string.alphanum': '{{#label}} must only contain alpha-numeric characters',
		'string.base': '{{#label}} must be a string',
		'string.base64': '{{#label}} must be a valid base64 string',
		'string.creditCard': '{{#label}} must be a credit card',
		'string.dataUri': '{{#label}} must be a valid dataUri string',
		'string.domain': '{{#label}} must contain a valid domain name',
		'string.email': '{{#label}} must be a valid email',
		'string.empty': '{{#label}} is not allowed to be empty',
		'string.guid': '{{#label}} must be a valid GUID',
		'string.hex': '{{#label}} must only contain hexadecimal characters',
		'string.hexAlign':
			'{{#label}} hex decoded representation must be byte aligned',
		'string.hostname': '{{#label}} must be a valid hostname',
		'string.ip': '{{#label}} must be a valid ip address with a {{#cidr}} CIDR',
		'string.ipVersion':
			'{{#label}} must be a valid ip address of one of the following versions {{#version}} with a {{#cidr}} CIDR',
		'string.isoDate': '{{#label}} must be in iso format',
		'string.isoDuration': '{{#label}} must be a valid ISO 8601 duration',
		'string.length': '{{#label}} length must be {{#limit}} characters long',
		'string.lowercase': '{{#label}} must only contain lowercase characters',
		'string.max':
			'{{#label}} length must be less than or equal to {{#limit}} characters long',
		'string.min':
			'{{#label}} length must be at least {{#limit}} characters longs',
		'string.normalize':
			'{{#label}} must be unicode normalized in the {{#form}} form',
		'string.token':
			'{{#label}} must only contain alpha-numeric and underscore characters',
		'string.pattern.base':
			'{{#label}} with value {:[.]} fails to match the required pattern: {{#regex}}',
		'string.pattern.name':
			'{{#label}} with value {:[.]} fails to match the {{#name}} pattern',
		'string.pattern.invert.base':
			'{{#label}} with value {:[.]} matches the inverted pattern: {{#regex}}',
		'string.pattern.invert.name':
			'{{#label}} with value {:[.]} matches the inverted {{#name}} pattern',
		'string.trim': '{{#label}} must not have leading or trailing whitespace',
		'string.uri': '{{#label}} must be a valid uri',
		'string.uriCustomScheme':
			'{{#label}} must be a valid uri with a scheme matching the {{#scheme}} pattern',
		'string.uriRelativeOnly': '{{#label}} must be a valid relative uri',
		'string.uppercase': '{{#label}} must only contain uppercase characters',
	},

	number: {
		'number.base': '{{#label}} must be a number',
		'number.greater': '{{#label}} must be greater than {{#limit}}',
		'number.infinity': '{{#label}} cannot be infinity',
		'number.integer': '{{#label}} must be an integer',
		'number.less': '{{#label}} must be less than {{#limit}}',
		'number.max': '{{#label}} must be less than or equal to {{#limit}}',
		'number.min': '{{#label}} must be greater than or equal to {{#limit}}',
		'number.multiple': '{{#label}} must be a multiple of {{#multiple}}',
		'number.negative': '{{#label}} must be a negative number',
		'number.port': '{{#label}} must be a valid port',
		'number.positive': '{{#label}} must be a positive number',
		'number.precision':
			'{{#label}} must have no more than {{#limit}} decimal places',
		'number.unsafe': '{{#label}} must be a safe number',
	},

	date: {
		'date.base': '{{#label}} must be a valid date',
		'date.format':
			'{{#label}} must be in {msg("date.format." + #format) || #format} format',
		'date.greater': '{{#label}} must be greater than {{:#limit}}',
		'date.less': '{{#label}} must be less than {{:#limit}}',
		'date.max': '{{#label}} must be less than or equal to {{:#limit}}',
		'date.min': '{{#label}} must be greater than or equal to {{:#limit}}',

		// Messages used in date.format
		'date.format.iso': 'ISO 8601 date',
		'date.format.javascript': 'timestamp or number of milliseconds',
		'date.format.unix': 'timestamp or number of seconds',
	},

	array: {
		'array.base': '{{#label}} must be an array',
		'array.excludes': '{{#label}} contains an excluded value',
		'array.hasKnown':
			'{{#label}} does not contain at least one required match for type {:#patternLabel}',
		'array.hasUnknown':
			'{{#label}} does not contain at least one required match',
		'array.includes': '{{#label}} does not match any of the allowed types',
		'array.includesRequiredBoth':
			'{{#label}} does not contain {{#knownMisses}} and {{#unknownMisses}} other required value(s)',
		'array.includesRequiredKnowns':
			'{{#label}} does not contain {{#knownMisses}}',
		'array.includesRequiredUnknowns':
			'{{#label}} does not contain {{#unknownMisses}} required value(s)',
		'array.length': '{{#label}} must contain {{#limit}} items',
		'array.max':
			'{{#label}} must contain less than or equal to {{#limit}} items',
		'array.min': '{{#label}} must contain at least {{#limit}} items',
		'array.orderedLength': '{{#label}} must contain at most {{#limit}} items',
		'array.sort': '{{#label}} must be sorted in {#order} order by {{#by}}',
		'array.sort.mismatching':
			'{{#label}} cannot be sorted due to mismatching types',
		'array.sort.unsupported':
			'{{#label}} cannot be sorted due to unsupported type {#type}',
		'array.sparse': '{{#label}} must not be a sparse array item',
		'array.unique': '{{#label}} contains a duplicate value',
	},
};

module.exports = message;
