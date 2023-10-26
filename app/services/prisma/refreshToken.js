const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const {
	isTokenValidRefreshToken,
	createJWT,
	createTokenUser,
} = require('../../utils');
const { NotFoundError } = require('../../errors');

const createUserRefreshToken = async (payload) => {
	// const result = await UserRefreshToken.create(payload);
	const result = await prisma.user_refresh_token.create({
		data: {
			refreshToken: payload.refreshToken,
			userId: payload.userId,
		},
	});

	return result;
};

const getUserRefreshToken = async (req) => {
	const { refreshToken } = req.params;

	console.log(refreshToken);

	const result = await prisma.user_refresh_token.findFirst({
		where: {
			AND: [{ refreshToken }],
		},
	});

	if (!result) throw new NotFoundError(`refreshToken tidak valid `);

	const payload = isTokenValidRefreshToken({ token: result.refreshToken });

	const userCheck = await prisma.user.findUnique({
		where: {
			email: payload.email,
		},
	});

	const token = createJWT({ payload: createTokenUser(userCheck) });

	return token;
};

module.exports = { createUserRefreshToken, getUserRefreshToken };
