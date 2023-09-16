const express = require('express');
const router = express();
const { create, index, find, update, destroy } = require('./controller');
const {
	authenticateUser,
	authorizeRoles,
} = require('../../../middlewares/auth');

router.get('/roles', authenticateUser, authorizeRoles('admin'), index);
router.get('/roles/:id', authenticateUser, authorizeRoles('admin'), find);
router.put('/roles/:id', authenticateUser, authorizeRoles('admin'), update);
router.delete('/roles/:id', authenticateUser, authorizeRoles('admin'), destroy);
router.post('/roles', authenticateUser, authorizeRoles('admin'), create);

module.exports = router;
