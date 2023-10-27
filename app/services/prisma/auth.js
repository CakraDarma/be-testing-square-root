const { PrismaClient } = require('@prisma/client');
const { createTokenUser, createJWT, createRefreshJWT } = require('../../utils');
const { createUserRefreshToken } = require('./refreshToken');
const {
	BadRequestError,
	NotFoundError,
	UnauthorizedError,
} = require('../../errors');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

const signup = async (req) => {
	const { password, nim } = req.body;

	let result = await prisma.user.findFirst({
		where: {
			AND: [{ nim }],
		},
	});

	// kalau ada user tapi blm aktif update
	if (result) {
		return 'NIM Sudah terdaftar';
	} else if (result == null) {
		// kalau tidak ada dan belum aktif buat saja baru

		result = await prisma.user.create({
			data: {
				nim,
				password: await bcrypt.hash(password, 12),
			},
		});
	}
	delete result.id;
	delete result.password;
	return result;
};

const signin = async (req) => {
	const { nim, password } = req.body;

	if (!nim || !password) {
		throw new BadRequestError('Please provide nim and password');
	}

	let result = await prisma.user.findUnique({
		where: {
			nim: nim,
		},
	});

	if (!result) {
		throw new UnauthorizedError('Invalid Credentials');
	}

	const isPasswordCorrect = await bcrypt.compare(password, result.password);
	if (!isPasswordCorrect) {
		throw new UnauthorizedError('Invalid Credentials');
	}

	const token = createJWT({ payload: createTokenUser(result) });

	const refreshToken = createRefreshJWT({ payload: createTokenUser(result) });

	// await createUserRefreshToken({
	// 	refreshToken,
	// 	userId: result.id,
	// });

	return { token, refreshToken, nim: result.nim };
};

const change = async (req) => {
	const { currentPassword, newPassword, nim } = req.body;

	const check = await prisma.user.findFirst({
		where: {
			nim,
		},
	});

	const isPasswordCorrect = await bcrypt.compare(
		currentPassword,
		check.password
	);

	if (!isPasswordCorrect) {
		throw new UnauthorizedError('Invalid Credentials');
	}

	const result = await prisma.user.update({
		where: {
			nim,
		},
		data: {
			password: await bcrypt.hash(newPassword, 12),
		},
	});

	if (!result) throw new NotFoundError(`Tidak dapat merubah password`);

	delete result.password;

	return result;
};
module.exports = { signin, signup, change };
