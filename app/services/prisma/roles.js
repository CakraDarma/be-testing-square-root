// import custom error not found dan bad request
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { NotFoundError, BadRequestError } = require('../../errors');

const getAllRoles = async (req) => {
	const result = await prisma.role.findMany();

	return result;
};

const createRoles = async (req) => {
	const { nama } = req.body;

	let check = await prisma.role.findFirst({
		where: {
			AND: [{ nama }],
		},
	});

	if (check) throw new BadRequestError('role sudah terdaftar');

	const result = await prisma.role.create({
		data: {
			nama,
		},
	});

	return result;
};

const getOneRoles = async (req) => {
	const { id } = req.params;

	const result = await prisma.role.findUnique({
		where: {
			id: Number(id),
		},
	});

	if (!result) throw new NotFoundError(`Tidak ada role dengan id :  ${id}`);

	return result;
};

const updateRoles = async (req) => {
	const { id } = req.params;
	const { nama } = req.body;

	const check = await prisma.role.findFirst({
		where: {
			AND: [{ nama }],
		},
	});

	if (check) throw new BadRequestError('nama role duplikat');

	const result = await prisma.role.update({
		where: {
			id: Number(req.params.id),
		},
		data: {
			nama,
		},
	});

	if (!result) throw new NotFoundError(`Tidak ada role dengan id :  ${id}`);

	return result;
};

const deleteRoles = async (req) => {
	const { id } = req.params;

	const check = await prisma.role.findFirst({
		where: {
			AND: [{ id: Number(id) }],
		},
	});
	if (!check) throw new NotFoundError(`Tidak ada role dengan id :  ${id}`);

	const result = prisma.role.delete({
		where: {
			id: Number(req.params.id),
		},
	});

	return result;
};

const checkingRoles = async (id) => {
	const result = await prisma.role.findUnique({
		where: {
			id: Number(req.params.id),
		},
	});

	if (!result)
		throw new NotFoundError(`Tidak ada pembicara dengan id :  ${id}`);

	return result;
};

module.exports = {
	createRoles,
	getAllRoles,
	getOneRoles,
	updateRoles,
	deleteRoles,
	checkingRoles,
};
