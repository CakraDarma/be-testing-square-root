const { UnauthenticatedError, UnauthorizedError } = require('../errors');
const { isTokenValid } = require('../utils/jwt');

// get data from header parameter
const authenticateUser = async (req, res, next) => {
	try {
		let token;
		// check header
		const authHeader = req.headers.authorization;

		if (authHeader && authHeader.startsWith('Bearer')) {
			token = authHeader.split(' ')[1];
		}

		if (!token) {
			throw new UnauthenticatedError('Authentication invalid');
		}

		const payload = isTokenValid({ token });

		// Attach the user and his permissions to the req object
		req.user = {
			nama: payload.nama,
			userId: payload.userId,
			role: payload.role,
			email: payload.email,
			telepon: payload.telepon,
		};

		next();
	} catch (error) {
		next(error);
	}
};

// const authenticateParticipant = async (req, res, next) => {
// 	try {
// 		let token;
// 		// check header
// 		const authHeader = req.headers.authorization;

// 		if (authHeader && authHeader.startsWith('Bearer')) {
// 			token = authHeader.split(' ')[1];
// 		}

// 		if (!token) {
// 			throw new UnauthenticatedError('Authentication invalid');
// 		}

// 		const payload = isTokenValid({ token });

// 		// Attach the user and his permissions to the req object
// 		req.participant = {
// 			email: payload.email,
// 			lastName: payload.lastName,
// 			firstName: payload.firstName,
// 			id: payload.participantId,
// 		};

// 		next();
// 	} catch (error) {
// 		next(error);
// 	}
// };

// check role from data above
const authorizeRoles = (...roles) => {
	return (req, res, next) => {
		if (!roles.includes(req.user.role)) {
			throw new UnauthorizedError('Unauthorized to access this route');
		}
		next();
	};
};

module.exports = { authenticateUser, authorizeRoles };
