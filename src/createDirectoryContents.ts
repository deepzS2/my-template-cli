import * as fs from 'fs'
import * as path from 'path'
import filenameCheck from './filenameCheck'

import { render } from './utils/ejsTemplate'

const SKIP_FILES = ['node_modules', '.template.json']

/**
 * Create the template files with template options
 * @param templatePath Path to the template
 * @param projectName Project name
 * @param templateOptionsParsed Template options parsed as Record<string, boolean>
 */
export default function createDirectoryContents(
	templatePath: string,
	projectName: string,
	templateOptionsParsed?: Record<string, boolean>,
	projectPath?: string
) {
	const filesToCreate = fs.readdirSync(templatePath)

	filesToCreate.forEach((file) => {
		const origFilePath = path.join(templatePath, file)
		const stats = fs.statSync(origFilePath)

		if (SKIP_FILES.indexOf(file) > -1) return

		const useTemplateOption = filenameCheck(file, templateOptionsParsed ?? {})

		let filename = file.replace(/(projectName)+/gm, projectName)

		// Verifica se o nome do arquivo possui o "[]" e se está na lista de opções do template
		if (useTemplateOption !== undefined) {
			if (useTemplateOption) filename = file.replace(/\[.+]/gm, '')
			else return
		}

		if (stats.isFile()) {
			let contents = fs.readFileSync(origFilePath, 'utf8')
			contents = render(contents, { projectName, ...templateOptionsParsed })

			if (filename === '.ignore') filename = '.gitignore'

			const writePath = path.join(
				process.cwd(),
				projectPath ?? projectName,
				filename
			)
			fs.writeFileSync(writePath, contents, 'utf8')
		} else if (stats.isDirectory()) {
			fs.mkdirSync(
				path.join(process.cwd(), projectPath ?? projectName, filename)
			)

			createDirectoryContents(
				path.join(templatePath, file),
				projectName,
				templateOptionsParsed,
				path.join(projectPath ?? projectName, filename)
			)
		}
	})
}
