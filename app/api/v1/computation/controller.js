const { PrismaClient } = require('@prisma/client');
const { schema } = require('./validator');
const { squareRoot } = require('../../../utils');

const prisma = new PrismaClient();

const getComputations = async (req, res) => {
	try {
		const response = await prisma.computation.findMany();
		res.status(200).json(response);
	} catch (error) {
		res.status(500).json({ msg: error.message });
	}
};

const getComputationById = async (req, res) => {
	try {
		const response = await prisma.computation.findUnique({
			where: {
				id: Number(req.params.id),
			},
		});
		res.status(200).json(response);
	} catch (error) {
		res.status(404).json({ msg: error.message });
	}
};

const createComputation = async (req, res) => {
	try {
		const result = await schema.validateAsync(req.body);
		const { number } = result;

		const startTime = performance.now();
		const squareRootNumber = squareRoot(number);
		const endTime = performance.now();
		const timingPerformace = endTime - startTime;
		// console.log(startTime);
		// console.log(endTime);

		const computation = await prisma.computation.create({
			data: {
				number: number,
				result: squareRootNumber,
				time: timingPerformace,
			},
		});
		res.status(201).json(computation);
	} catch (error) {
		res.status(400).json({ msg: error.message });
	}
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
	getComputations,
	getComputationById,
	createComputation,
	// updateComputation,
	// deleteComputation,
};
