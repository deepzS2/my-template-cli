import * as fs from 'fs'
import * as path from 'path'

import filenameCheck from '@/filenameCheck'
import { render } from '@utils/ejsTemplate'

const SKIP_FILES = ['node_modules', '.template.json']

interface ObjectParams {
	/**
	 * Name for renaming files, folders and texts
	 */
	name: string

	/**
	 * Template path
	 */
	templatePath: string

	/**
	 * Target path
	 */
	targetPath: string

	/**
	 * If optional options can be used parse them!
	 */
	templateOptionsParsed?: Record<string, boolean>
}

/**
 * Create the template files with template options
 * @param params Parameters object
 */
export default function createDirectoryContents(params: ObjectParams) {
	const filesToCreate = fs.readdirSync(params.templatePath)

	filesToCreate.forEach((file) => {
		const origFilePath = path.join(params.templatePath, file)
		const stats = fs.statSync(origFilePath)

		if (SKIP_FILES.indexOf(file) > -1) return

		const useTemplateOption = filenameCheck(
			file,
			params.templateOptionsParsed ?? {}
		)

		let filename = file.replace(/(projectName|componentName)+/gm, params.name)

		// Verifica se o nome do arquivo possui o "[]" e se está na lista de opções do template
		if (useTemplateOption !== undefined) {
			if (useTemplateOption) filename = file.replace(/\[.+]/gm, '')
			else return
		}

		if (stats.isFile()) {
			let contents = fs.readFileSync(origFilePath, 'utf8')
			contents = render(contents, {
				projectName: params.name,
				componentName: params.name,
				...params.templateOptionsParsed,
			})

			if (filename === '.ignore') filename = '.gitignore'

			const writePath = path.join(params.targetPath, filename)
			fs.writeFileSync(writePath, contents, 'utf8')
		} else if (stats.isDirectory()) {
			fs.mkdirSync(path.join(params.targetPath, filename))

			createDirectoryContents({
				...params,
				templatePath: path.join(params.templatePath, filename),
				targetPath: path.join(params.targetPath, filename),
			})
		}
	})
}
