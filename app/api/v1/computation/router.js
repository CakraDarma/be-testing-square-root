const express = require('express');
const {
	getCalculatedApi,
	getCalculatedPlsql,
	getCalculatedApiPerUser,
	getCalculatedPlsqlPerUser,
	createCalculatedApi,
	createCalculatedPlsql,
	getProcessingApi,
	getProcessingPlsql,
} = require('./controller.js');

const { authenticateUser } = require('../../../middlewares/auth');

const router = express.Router();

router.get('/calculated-api', authenticateUser, getCalculatedApi);
router.get('/calculated-plsql', authenticateUser, getCalculatedPlsql);
router.post('/calculated-api', authenticateUser, createCalculatedApi);
router.post('/calculated-plsql', authenticateUser, createCalculatedPlsql);
router.get('/calculated-api-user', authenticateUser, getCalculatedApiPerUser);
router.get(
	'/calculated-plsql-user',
	authenticateUser,
	getCalculatedPlsqlPerUser
);
router.get('/process-api', authenticateUser, getProcessingApi);
router.get('/process-plsql', authenticateUser, getProcessingPlsql);

module.exports = router;
