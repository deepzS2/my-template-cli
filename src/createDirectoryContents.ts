import * as fs from 'fs'
import * as path from 'path'

import { render } from './utils/ejsTemplate'

const SKIP_FILES = ['node_modules', '.template.json']
const SKIP_EXTENSION_CHECK = [
	'd',
	'config',
	'json',
	'eslintrc',
	'prettierrc',
	'env',
	'local',
	'ts',
	'tsx',
	'ico',
	'svg',
	'png',
]

export default function createDirectoryContents<
	T extends Record<string, boolean>
>(
	templatePath: string,
	projectName: string,
	templateOptions?: string[],
	templateOptionsParsed?: T
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

		let filename = file

		// Verifica se a extensão existe e não esta na lista de extensões permitidas
		if (
			hasFileExtension &&
			!SKIP_EXTENSION_CHECK.includes(fileNameSplitted[1])
		) {
			const checkForTemplateOption = templateOptions?.find(
				(value) => value === fileNameSplitted[1]
			)

			if (!checkForTemplateOption) return

			filename = filename.replace('.' + checkForTemplateOption + '.', '')
		}

		if (stats.isFile()) {
			let contents = fs.readFileSync(origFilePath, 'utf8')
			contents = render(contents, { projectName, ...templateOptionsParsed })

			if (filename === '.ignore') filename = '.gitignore'

			const writePath = path.join(process.cwd(), projectName, filename)
			fs.writeFileSync(writePath, contents, 'utf8')
		} else if (stats.isDirectory()) {
			fs.mkdirSync(path.join(process.cwd(), projectName, filename))
			createDirectoryContents(
				path.join(templatePath, file),
				path.join(projectName, filename),
				templateOptions,
				templateOptionsParsed
			)
		}
	})
}
