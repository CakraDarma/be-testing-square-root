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

const { otpMail } = require('../mail');

const signup = async (req) => {
	const { roleId, email, password, nama, telepon } = req.body;

	// jika email dan status tidak aktif
	let result = await prisma.user.findFirst({
		where: {
			AND: [{ email }],
		},
	});

	// kalau ada user tapi blm aktif update
	if (result && result.status == 'tidak aktif') {
		result = await prisma.user.update({
			where: {
				email: result.email,
			},
			data: {
				nama,
				email,
				roleId: Number(roleId),
				telepon,
				password: await bcrypt.hash(password, 12),
				otp: Math.floor(Math.random() * 9999),
			},
		});
	} else if (result == null) {
		// kalau tidak ada dan belum aktif buat saja baru

		result = await prisma.user.create({
			data: {
				nama,
				email,
				roleId: Number(roleId),
				telepon,
				password: await bcrypt.hash(password, 12),
				otp: Math.floor(Math.random() * 9999),
			},
		});
	} else if (result && result.status == 'aktif') {
		return 'Email Sudah terdaftar';
	}
	// await otpMail(email, result);
	delete result.id;
	delete result.password;
	delete result.roleId;
	delete result.otp;
	return result;
};

const signin = async (req) => {
	const { email, password } = req.body;

	if (!email || !password) {
		throw new BadRequestError('Please provide email and password');
	}

	let result = await prisma.user.findUnique({
		where: {
			email: email,
		},
		include: {
			role: true,
		},
	});

	if (!result) {
		throw new UnauthorizedError('Invalid Credentials');
	}

	if (result.status !== 'aktif') {
		throw new UnauthorizedError('Akun anda belum aktif');
	}

	const isPasswordCorrect = await bcrypt.compare(password, result.password);
	if (!isPasswordCorrect) {
		throw new UnauthorizedError('Invalid Credentials');
	}

	const token = createJWT({ payload: createTokenUser(result) });

	const refreshToken = createRefreshJWT({ payload: createTokenUser(result) });

	await createUserRefreshToken({
		refreshToken,
		userId: result.id,
	});

	return { token, refreshToken, role: result.role, email: result.email };
};

const active = async (req) => {
	const { otp, email } = req.body;
	const check = await prisma.user.findFirst({
		where: {
			email,
		},
	});

	if (!check) throw new NotFoundError('User belum terdaftar');
	console.log(check.otp);
	console.log(otp);

	if (check && check.otp !== otp) throw new BadRequestError('Kode otp salah');

	const result = await prisma.user.update({
		where: {
			email,
		},
		data: {
			status: 'aktif',
		},
	});

	delete result.password;

	return result;
};

const change = async (req) => {
	const { currentPassword, newPassword, email } = req.body;

	const check = await prisma.user.findFirst({
		where: {
			email,
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
			email,
		},
		data: {
			password: await bcrypt.hash(newPassword, 12),
		},
	});

	if (!result) throw new NotFoundError(`Tidak dapat merubah password`);

	delete result.password;

	return result;
};
module.exports = { signin, signup, active, change };
