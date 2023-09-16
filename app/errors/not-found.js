// digunakan ketika ada request dari param yang tidak sesuai (url tidak sesuai)

const { StatusCodes } = require('http-status-codes');
const CustomAPIError = require('./custom-api-error');

class NotFound extends CustomAPIError {
	constructor(message) {
		super(message);
		// memberikan statusCode not found
		this.statusCode = StatusCodes.NOT_FOUND;
	}
}
module.exports = NotFound;
