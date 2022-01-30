const cookieParser = require('cookie-parser')
const createError = require('http-errors')
const error = require('./utils/error')
const express = require('express')
const morgan = require('morgan')
const morganLogger = require('./utils/morganLogger')
const routes = require('./routes')

// App
const app = express()

// JSON and URLENCODED
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// Logger and Cookies
app.use(morgan(morganLogger))
app.use(cookieParser())

// Routes
app.use('/', routes)

// Catch 404 and forward to error handler
app.use(function (_req, _res, next) {
	next(createError(404))
})

// Error Handler
app.use(error)

module.exports = app
