const app = require('./index')
const Logger = require('./utils/logger')
const { PORT } = require('./config')

app.listen(PORT, () => {
	Logger.info(`Server iniciado na URL http://localhost:${PORT}`)
})
