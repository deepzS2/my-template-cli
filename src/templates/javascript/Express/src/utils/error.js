module.exports = function (err, req, res) {
	const response = {
		code: err.status,
	}

	if (err.message) {
		Object.assign(response, { message: err.message })
	}

	res.status(err.status).send(response)
}
