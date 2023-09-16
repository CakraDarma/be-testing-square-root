const { StatusCodes } = require('http-status-codes');
const {
	getUserRefreshToken,
} = require('../../../services/prisma/refreshToken');

const index = async (req, res, next) => {
	try {
		const result = await getUserRefreshToken(req);

		res.status(StatusCodes.OK).json({
			data: { token: result },
		});
	} catch (err) {
		console.log(err);
		next(err);
	}
};

module.exports = { index };
