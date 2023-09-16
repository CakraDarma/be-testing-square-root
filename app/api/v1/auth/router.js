const express = require('express');
const router = express();
const {
	signinCms,
	signupCms,
	activeUser,
	changePassword,
} = require('./controller');

router.post('/auth/signin', signinCms);
router.post('/auth/signup', signupCms);
router.put('/auth/active-otp-user', activeUser);
router.put('/auth/change-password', changePassword);

module.exports = router;
