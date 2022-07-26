import Application from './index'

async function main() {
	const app = new Application()

	await app.setup()

	app.start()
}

main()
