import * as fs from 'fs'
import * as path from 'path'
import { render } from './utils/ejsTemplate'

const SKIP_FILES = ['node_modules', '.template.json']
const SKIP_EXTENSION_CHECK = ['d', 'config', 'json', 'eslintrc', 'env', 'local']

export default function createDirectoryContents<T extends string[]>(
	templatePath: string,
	projectName: string,
	templateOptions?: T
) {
	const filesToCreate = fs.readdirSync(templatePath)

	filesToCreate.forEach((file) => {
		const origFilePath = path.join(templatePath, file)
		const stats = fs.statSync(origFilePath)

		if (SKIP_FILES.indexOf(file) > -1) return

		const fileNameSplitted = file.split('.')

		// nome [0] '.' extensão para usar com template options [1] '.' extensão do arquivo [2]
		const hasFileExtension =
			fileNameSplitted.length &&
			fileNameSplitted.length >= 2 &&
			fileNameSplitted[1]

		// Verifica se a extensão existe e não esta na lista de extensões permitidas
		if (
			hasFileExtension &&
			!SKIP_EXTENSION_CHECK.includes(fileNameSplitted[1])
		) {
			const checkForTemplateOption = templateOptions?.find(
				(value) => value === fileNameSplitted[1]
			)

			if (!checkForTemplateOption) return
		}

		if (stats.isFile()) {
			let contents = fs.readFileSync(origFilePath, 'utf8')
			contents = render(contents, { projectName })

			if (file === '.npmignore') file = '.gitignore'

			const writePath = path.join(process.cwd(), projectName, file)
			fs.writeFileSync(writePath, contents, 'utf8')
		} else if (stats.isDirectory()) {
			fs.mkdirSync(path.join(process.cwd(), projectName, file))
			createDirectoryContents(
				path.join(templatePath, file),
				path.join(projectName, file),
				templateOptions
			)
		}
	})
}
