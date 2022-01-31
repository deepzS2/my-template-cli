import * as fs from 'fs'
import * as path from 'path'

export function getAllTemplatesFromPath(templatesLanguagePath: string) {
	return fs.readdirSync(templatesLanguagePath).filter((file) => {
		const origFilePath = path.join(templatesLanguagePath, file)
		const stats = fs.statSync(origFilePath)

		return stats.isDirectory()
	})
}

export function getTemplatePath(
	name: string,
	templatesLanguagePath: string
): string | void {
	const templatesAvailable = getAllTemplatesFromPath(templatesLanguagePath)

	const foundTemplate = templatesAvailable.find(
		(template) => template.toLowerCase() === name.toLowerCase()
	)

	if (foundTemplate) {
		return path.join(templatesLanguagePath, foundTemplate)
	}
}
