const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');

const app = express();

// router
// const imagesRouter = require('./app/api/v1/images/router');
// const authCMSRouter = require('./app/api/v1/auth/router');
// const rolesRoute = require('./app/api/v1/roles/router');
// const userRefreshTokenRoute = require('./app/api/v1/userRefreshToken/router');
const productRoute = require('./app/api/v1/products/router');
const computationRoute = require('./app/api/v1/computation/router');

const v1 = '/api/v1';

const notFoundMiddleware = require('./app/middlewares/not-found');
const handleErrorMiddleware = require('./app/middlewares/handler-error');
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
	res.status(200).json({
		message: 'welcome to api',
	});
});

// app.use(`${v1}/cms`, imagesRouter);
// app.use(`${v1}/cms`, authCMSRouter);
// app.use(`${v1}/cms`, rolesRoute);
// app.use(`${v1}/cms`, userRefreshTokenRoute);
app.use(productRoute);
app.use(computationRoute);

app.use(notFoundMiddleware);
app.use(handleErrorMiddleware);

module.exports = app;
