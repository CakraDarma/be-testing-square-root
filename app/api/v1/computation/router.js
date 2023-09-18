const express = require('express');
const {
	getComputations,
	getComputationById,
	createComputation,
	createComputation2,
	// updateComputation,
	// deleteComputation,
} = require('./controller.js');

const router = express.Router();

router.get('/computations', getComputations);
router.get('/computations/:id', getComputationById);
router.post('/computations', createComputation);
router.post('/computations2', createComputation2);
// router.patch('/computations/:id', updateComputation);
// router.delete('/computations/:id', deleteComputation);

module.exports = router;
