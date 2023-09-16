const {
	createRoles,
	getAllRoles,
	getOneRoles,
	deleteRoles,
	updateRoles,
} = require('../../../services/prisma/roles');

const { StatusCodes } = require('http-status-codes');

const create = async (req, res, next) => {
	try {
		const result = await createRoles(req);

		res.status(StatusCodes.CREATED).json({
			data: result,
		});
	} catch (err) {
		next(err);
	}
};

const index = async (req, res, next) => {
	try {
		const result = await getAllRoles(req);

		res.status(StatusCodes.OK).json({
			data: result,
		});
	} catch (err) {
		console.log(err);
		next(err);
	}
};

const find = async (req, res, next) => {
	try {
		const result = await getOneRoles(req);

		res.status(StatusCodes.OK).json({
			data: result,
		});
	} catch (err) {
		next(err);
	}
};

const update = async (req, res, next) => {
	try {
		const result = await updateRoles(req);

		res.status(StatusCodes.OK).json({
			data: result,
		});
	} catch (err) {
		next(err);
	}
};

const destroy = async (req, res, next) => {
	try {
		const result = await deleteRoles(req);

		res.status(StatusCodes.OK).json({
			data: result,
		});
	} catch (err) {
		next(err);
	}
};

module.exports = {
	index,
	find,
	update,
	destroy,
	create,
};
