const express = require('express');
const {
	getComputations,
	getComputationById,
	createComputation,
	// updateComputation,
	// deleteComputation,
} = require('./controller.js');

const router = express.Router();

router.get('/computations', getComputations);
router.get('/computations/:id', getComputationById);
router.post('/computations', createComputation);
// router.patch('/computations/:id', updateComputation);
// router.delete('/computations/:id', deleteComputation);

module.exports = router;
