import * as fs from 'fs'
import * as path from 'path'

import { ITemplate } from '../@types/global'
import ErrorCLI from './error'

const REGEX_SPACE = /\s/g

export default class Templates {
	private templatesAvailable!: ITemplate[]
	private templatesLanguagePath: string

	/**
	 * Get the language templates path
	 * @param language Languages on templates folder
	 */
	constructor(language: string) {
		this.templatesLanguagePath = path.join(
			__dirname,
			'..',
			'templates',
			language
		)
	}

	/**
	 * Return all the available templates on path, if 0 throw error
	 */
	public getAllTemplatesFromPath(): ITemplate[] {
		this.templatesAvailable = fs
			.readdirSync(this.templatesLanguagePath)
			.filter((file) => {
				if (file === 'components') {
					return false
				}

				const origFilePath = path.join(this.templatesLanguagePath, file)
				const stats = fs.statSync(origFilePath)

				return stats.isDirectory()
			})
			.map((file) => ({ name: file.replace('-', ' '), dir: file }))

		if (!this.templatesAvailable.length) {
			throw new ErrorCLI(
				`A linguagem selecionada, por enquanto, não possui templates disponíveis!`
			)
		}

		return this.templatesAvailable
	}

	/**
	 * Get a language template
	 * @param name Folder/template name
	 * @returns The path to the template folder
	 */
	public getTemplatePath(name: string): string | void {
		const foundTemplate = this.templatesAvailable.find(
			(template) =>
				template.name.toLowerCase().replace(REGEX_SPACE, '') ===
				name.toLowerCase().replace(REGEX_SPACE, '')
		)

		if (foundTemplate) {
			return path.join(this.templatesLanguagePath, foundTemplate.dir)
		}
	}
}
