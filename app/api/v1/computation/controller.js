const { PrismaClient } = require('@prisma/client');
const { schema } = require('./validator');
const { squareRoot } = require('../../../utils');
const {
	calculateAverageProcessingTime,
	findFastestProcessingTime,
	findSlowestProcessingTime,
} = require('../../../utils/process');
const { performance } = require('perf_hooks');

const prisma = new PrismaClient();

const getCalculatedApi = async (req, res) => {
	const { sort } = req.query;
	try {
		let response;
		if (sort == 'desc') {
			response = await prisma.apiFunction.findMany({
				include: {
					user: {
						select: {
							id: true,
							nim: true,
						},
					},
				},
				orderBy: {
					time: 'desc',
				},
			});
		} else if (sort == 'asc') {
			response = await prisma.apiFunction.findMany({
				include: {
					user: {
						select: {
							id: true,
							nim: true,
						},
					},
				},
				orderBy: {
					time: 'asc',
				},
			});
		} else {
			response = await prisma.apiFunction.findMany({
				include: {
					user: {
						select: {
							id: true,
							nim: true,
						},
					},
				},
			});
		}
		res.status(200).json(response);
	} catch (error) {
		res.status(500).json({ msg: error.message });
	}
};

const getCalculatedPlsql = async (req, res) => {
	const { sort } = req.query;
	try {
		let response;
		if (sort == 'desc') {
			response = await prisma.plsql.findMany({
				include: {
					user: {
						select: {
							id: true,
							nim: true,
						},
					},
				},
				orderBy: {
					time: 'desc',
				},
			});
		} else if (sort == 'asc') {
			response = await prisma.plsql.findMany({
				include: {
					user: {
						select: {
							id: true,
							nim: true,
						},
					},
				},
				orderBy: {
					time: 'asc',
				},
			});
		} else {
			response = await prisma.plsql.findMany({
				include: {
					user: {
						select: {
							id: true,
							nim: true,
						},
					},
				},
			});
		}
		res.status(200).json(response);
	} catch (error) {
		res.status(500).json({ msg: error.message });
	}
};

const getCalculatedApiPerUser = async (req, res) => {
	const { sort } = req.query;
	try {
		const response = await prisma.apiFunction.findMany({
			include: {
				user: true,
			},
		});

		const groupedData = {};

		response.forEach((item) => {
			const nim = item.user.nim;

			if (!groupedData[nim]) {
				groupedData[nim] = {
					nim: nim,
					count: 0,
					userId: item.userId,
				};
			}

			groupedData[nim].count++;
		});

		// Mengubah objek ke dalam array
		let data = Object.values(groupedData);

		console.log(data);

		if (sort == 'desc') {
			data = data.slice().sort((a, b) => b.count - a.count);
		} else if (sort == 'asc') {
			data = data.slice().sort((a, b) => a.count - b.count);
		}

		res.status(200).json(data);
	} catch (error) {
		res.status(500).json({ msg: error.message });
	}
};

const getCalculatedPlsqlPerUser = async (req, res) => {
	const { sort } = req.query;
	try {
		const response = await prisma.plsql.findMany({
			include: {
				user: true,
			},
		});

		const groupedData = {};

		response.forEach((item) => {
			const nim = item.user.nim;

			if (!groupedData[nim]) {
				groupedData[nim] = {
					nim: nim,
					count: 0,
					userId: item.userId,
				};
			}

			groupedData[nim].count++;
		});

		// Mengubah objek ke dalam array
		let data = Object.values(groupedData);

		if (sort == 'desc') {
			data = data.slice().sort((a, b) => b.count - a.count);
		} else if (sort == 'asc') {
			data = data.slice().sort((a, b) => a.count - b.count);
		}

		res.status(200).json(data);
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
			// console.log('Square Root:', result[0].square_root);
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

const getProcessingApi = async (req, res) => {
	try {
		data = await prisma.apiFunction.findMany();
		const fastestTime = findFastestProcessingTime(data);
		const slowestTime = findSlowestProcessingTime(data);
		const averageTime = calculateAverageProcessingTime(data);
		const resultObject = {
			fastestProcessingTime: fastestTime,
			slowestProcessingTime: slowestTime,
			averageProcessingTime: averageTime,
		};

		res.status(200).json(resultObject);
	} catch (error) {
		res.status(500).json({ msg: error.message });
	}
};

const getProcessingPlsql = async (req, res) => {
	try {
		data = await prisma.apiFunction.findMany();
		const fastestTime = findFastestProcessingTime(data);
		const slowestTime = findSlowestProcessingTime(data);
		const averageTime = calculateAverageProcessingTime(data);
		const resultObject = {
			fastestProcessingTime: fastestTime,
			slowestProcessingTime: slowestTime,
			averageProcessingTime: averageTime,
		};

		res.status(200).json(resultObject);
	} catch (error) {
		res.status(500).json({ msg: error.message });
	}
};
// const getComputationById = async (req, res) => {
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
// };

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
	getCalculatedPlsqlPerUser,
	getCalculatedApiPerUser,
	createCalculatedApi,
	createCalculatedPlsql,
	getProcessingApi,
	getProcessingPlsql,
	// getComputationById,
	// updateComputation,
	// deleteComputation,
};
