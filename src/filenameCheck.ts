/**
 * Will check for "[]" on filename for optional files or folders (with template sub questions) and if template option is true
 *
 * Example: [useHusky].husky
 * @param filename Filename
 * @returns True or false if it exists in template options and undefined if it not exists in template options
 */
export default function (
	filename: string,
	templateOptions: Record<string, boolean>
) {
	const openBracketIndex = filename.indexOf('[') + 1
	const closedBracketIndex = filename.indexOf(']')

	const bracketsString = filename.substring(
		openBracketIndex,
		closedBracketIndex
	)
	const templateOptionsKeys = Object.keys(templateOptions)

	console.log(bracketsString)
	console.log(templateOptions)

	if (templateOptionsKeys.includes(bracketsString)) {
		return templateOptions[bracketsString]
	} else {
		return undefined
	}
}
