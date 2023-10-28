const {
	signin,
	signup,
	active,
	change,
} = require('../../../services/prisma/auth');

const { schema } = require('./validator');

const { StatusCodes } = require('http-status-codes');

const signinCms = async (req, res, next) => {
	try {
		const result = await signin(req);

		res.status(StatusCodes.CREATED).json({
			data: result,
		});
	} catch (err) {
		next(err);
	}
};

const signupCms = async (req, res, next) => {
	try {
		await schema.validateAsync(req.body);
		const result = await signup(req);

		res.status(StatusCodes.CREATED).json({
			data: result,
		});
	} catch (err) {
		res.status(400).json({ msg: err.message });
	}
};

const activeUser = async (req, res, next) => {
	try {
		const result = await active(req);

		res.status(StatusCodes.OK).json({
			data: result,
		});
	} catch (err) {
		next(err);
	}
};

const changePassword = async (req, res, next) => {
	try {
		const result = await change(req);

		res.status(StatusCodes.OK).json({
			data: result,
		});
	} catch (err) {
		next(err);
	}
};

module.exports = { signinCms, signupCms, activeUser, changePassword };
