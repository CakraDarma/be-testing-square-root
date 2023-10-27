const express = require('express');
const {
	getCalculatedApi,
	getCalculatedPlsql,
	getComputationById,
	createCalculatedApi,
	createCalculatedPlsql,
} = require('./controller.js');

const { authenticateUser } = require('../../../middlewares/auth');

const router = express.Router();

router.get('/calculated-api', authenticateUser, getCalculatedApi);
router.get('/calculated-plsql', authenticateUser, getCalculatedPlsql);
router.get('/computations/:id', authenticateUser, getComputationById);
router.post('/calculated-api', authenticateUser, createCalculatedApi);
router.post('/calculated-plsql', authenticateUser, createCalculatedPlsql);

module.exports = router;
