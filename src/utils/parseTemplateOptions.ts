import { keys as nextTemplateKeys } from '../models/templates/nextTemplateQuestions'

export default function parseTemplateOptions(
	template: 'next',
	options: string[]
): Record<string, boolean> {
	if (template === 'next') {
		return nextTemplateKeys.reduce<Record<string, boolean>>((prev, curr) => {
			const useOption = options.includes(curr)

			return {
				...prev,
				[curr]: useOption,
			}
		}, {})
	}

	return {}
}
