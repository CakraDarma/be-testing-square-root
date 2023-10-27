const { PrismaClient } = require('@prisma/client');
const { schema } = require('./validator');
const { squareRoot } = require('../../../utils');
const { performance } = require('perf_hooks');

const prisma = new PrismaClient();

const getCalculatedApi = async (req, res) => {
	try {
		const response = await prisma.apiFunction.findMany();
		res.status(200).json(response);
	} catch (error) {
		res.status(500).json({ msg: error.message });
	}
};
const getCalculatedPlsql = async (req, res) => {
	try {
		const response = await prisma.plsql.findMany();
		res.status(200).json(response);
	} catch (error) {
		res.status(500).json({ msg: error.message });
	}
};

const createCalculatedApi = async (req, res) => {
	try {
		const result = await schema.validateAsync(req.body);
		const { number } = result;

		const startTime = performance.now();
		const squareRootNumber = squareRoot(number);
		const endTime = performance.now();
		const timingPerformace = endTime - startTime;
		const computation = await prisma.apiFunction.create({
			data: {
				number: number,
				result: squareRootNumber,
				time: timingPerformace,
				userId: req.user.userId,
			},
		});
		res.status(201).json(computation);
	} catch (error) {
		res.status(400).json({ msg: error.message });
	}
};

const createCalculatedPlsql = async (req, res) => {
	try {
		const result = await schema.validateAsync(req.body);
		const { number } = result;
		const startTime = performance.now();
		let squareRoot;
		try {
			// const result = await prisma.$queryRaw`SELECT calculate_square_root(${number})`;
			const result =
				await prisma.$queryRaw`SELECT calculate_square_root(${number}) AS square_root`;
			console.log('Square Root:', result[0].square_root);
			squareRoot = parseFloat(result[0].square_root);

			// Handle hasil panggilan stored procedure di sini
			console.log('Hasil stored procedure:', squareRoot);
		} catch (error) {
			console.error('Error calling stored procedure:', error);
		} finally {
			// Jangan lupa untuk menutup koneksi Prisma
			await prisma.$disconnect();
		}
		const endTime = performance.now();
		const timingPerformace = endTime - startTime;

		const computation = await prisma.plsql.create({
			data: {
				number: number,
				result: squareRoot,
				time: parseFloat(parseFloat(timingPerformace).toFixed(4) / 10000),
				userId: req.user.userId,
			},
		});
		res.status(201).json(computation);
	} catch (error) {
		res.status(400).json({ msg: error.message });
	}
};

const getComputationById = async (req, res) => {
	// try {
	// 	const response = await prisma.api.findUnique({
	// 		where: {
	// 			id: Number(req.params.id),
	// 		},
	// 	});
	// 	res.status(200).json(response);
	// } catch (error) {
	// 	res.status(404).json({ msg: error.message });
	// }
};

// const updateComputation = async (req, res) => {
// 	try {
// 		const result = await schema.validateAsync(req.body);
// 		const { name, price } = result;
// 		const computation = await prisma.computation.update({
// 			where: {
// 				id: Number(req.params.id),
// 			},
// 			data: {
// 				name: name,
// 				price: price,
// 			},
// 		});
// 		res.status(200).json(computation);
// 	} catch (error) {
// 		res.status(400).json({ msg: error.message });
// 	}
// };

// const deleteComputation = async (req, res) => {
// 	try {
// 		const computation = await prisma.computation.delete({
// 			where: {
// 				id: Number(req.params.id),
// 			},
// 		});
// 		res.status(200).json(computation);
// 	} catch (error) {
// 		res.status(400).json({ msg: error.message });
// 	}
// };

module.exports = {
	getCalculatedPlsql,
	getCalculatedApi,
	getComputationById,
	createCalculatedApi,
	createCalculatedPlsql,
	// updateComputation,
	// deleteComputation,
};
