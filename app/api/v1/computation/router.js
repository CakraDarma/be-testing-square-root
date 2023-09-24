const express = require('express');
const {
	getCalculatedApi,
	getCalculatedPlsql,
	getComputationById,
	createCalculatedApi,
	createCalculatedPlsql,
	// updateComputation,
	// deleteComputation,
} = require('./controller.js');

const router = express.Router();

router.get('/calculated-api', getCalculatedApi);
router.get('/calculated-plsql', getCalculatedPlsql);
router.get('/computations/:id', getComputationById);
router.post('/calculated-api', createCalculatedApi);
router.post('/calculated-plsql', createCalculatedPlsql);
// router.patch('/computations/:id', updateComputation);
// router.delete('/computations/:id', deleteComputation);

module.exports = router;
