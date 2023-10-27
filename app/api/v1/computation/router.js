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

const {
	authenticateUser,
	authorizeRoles,
} = require('../../../middlewares/auth');

const router = express.Router();

router.get('/calculated-api', authenticateUser, getCalculatedApi);
router.get('/calculated-plsql', authenticateUser, getCalculatedPlsql);
router.get('/computations/:id', authenticateUser, getComputationById);
router.post('/calculated-api', authenticateUser, createCalculatedApi);
router.post('/calculated-plsql', authenticateUser, createCalculatedPlsql);
// router.patch('/computations/:id', updateComputation);
// router.delete('/computations/:id', deleteComputation);

module.exports = router;
