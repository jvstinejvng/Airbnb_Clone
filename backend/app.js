const express = require('express');
require('express-async-errors');
const morgan = require('morgan');
const cors = require('cors');
const csurf = require('csurf');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');

const { environment } = require('./config');
const isProduction = environment === 'production';
// isProduction will be true if the environment is in production (checks environment key in backend/config/index.js)
const routes = require('./routes');
const { ValidationError } = require('sequelize');

const app = express()

app.use(morgan('dev'));
// morgan middleware will log information about requests and responses
app.use(cookieParser());
// cookie-parser middleware will parse cookies
app.use(express.json());
// express.json middleware will parse JSON bodies of requests with Content-Type of "application/json"

// Security Middleware
if (!isProduction) {
    // enable CORS only in development via cors middleware
    // CORS isn't needed in production since all of our React and Express resources will come from the same origin
    app.use(cors());
}

// helmet helps set a variety of headers to better secure your app
// add crossOriginResourcePolicy to the helmet middleware with a policy of cross-origin to allow images with URLs to render in deployment
app.use(
    helmet.crossOriginResourcePolicy({
        policy: "cross-origin"
    })
);

// Set the _csrf token and create req.csrfToken method (configures it to use cookies that are HTTP-only so cannot be read by javascript)
// also adds a method on all requests (req.csrfToken) that will be set to another cookie (XSRF-TOKEN) later on
// these two cookies work together to provide CSRF protection
// XSRF-TOKEN cookie value needs to be sent in the header of any request with all HTTP verbs besides GET
// header will be used to validate the _csrf cookie to confirm that the request comes from your site
app.use(
    csurf({
        cookie: {
            secure: isProduction,
            sameSite: isProduction && "Lax",
            httpOnly: true
        }
    })
);

// app.use((req, res, next) => {
//     console.log('!!!!!!!!REQ BODY', req.body)
//     next()
// })

app.use(routes); // Connect all the routes

// Catch unhandled requests and forward to error handler.
app.use((_req, _res, next) => {
    const err = new Error("The requested resource couldn't be found.");
    err.title = "Resource Not Found";
    err.errors = ["The requested resource couldn't be found."];
    err.status = 404;
    next(err);
});


// Process sequelize errors
app.use((err, _req, _res, next) => {
    // check if error is a Sequelize error:
    if (err instanceof ValidationError) {
        err.errors = err.errors.map((e) => e.message );
        err.title = 'Validation error';
    }
    next(err);
});

// Error formatter
app.use((err, _req, res, _next) => {
    res.status(err.status || 500);
    console.error(err);
    if (err.status === 400 || 403) {
        res.json({
            // title: err.title || 'Server Error',
            message: err.message,
            // stack: isProduction ? null : err.stack
            statusCode: err.status,
            errors: err.errors,
        })
    } else if (err.status === 401) {
        res.json({
            // title: err.title || 'Server Error',
            message: err.message,
            // stack: isProduction ? null : err.stack
            statusCode: err.status,
            // errors: err.errors,
        });
    }
});

module.exports = app;
