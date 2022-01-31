import * as fs from 'fs'
import * as path from 'path'
import { ITemplate } from './@types/global'

const REGEX_SPACE = /\s/g

export default class Templates {
	private templatesAvailable: ITemplate[]
	private templatesLanguagePath: string

	constructor(useTypescript: boolean) {
		this.templatesLanguagePath = path.join(
			__dirname,
			'templates',
			useTypescript ? 'typescript' : 'javascript'
		)
	}

	public getAllTemplatesFromPath(): ITemplate[] {
		this.templatesAvailable = fs
			.readdirSync(this.templatesLanguagePath)
			.filter((file) => {
				const origFilePath = path.join(this.templatesLanguagePath, file)
				const stats = fs.statSync(origFilePath)

				return stats.isDirectory()
			})
			.map((file) => ({ name: file.replace('-', ' '), dir: file }))

		return this.templatesAvailable
	}

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
