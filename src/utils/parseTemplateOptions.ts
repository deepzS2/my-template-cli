import { keys as nextTemplateKeys } from '../models/templates/nextTemplateQuestions'
import { keys as webapiTemplateKeys } from '../models/templates/webapiTemplateQuestions'

const reduceOptions = (
	prev: Record<string, boolean>,
	curr: string,
	options: string[]
) => {
	const useOption = options.includes(curr)

	return {
		...prev,
		[curr]: useOption,
	}
}

/**
 * Parse template sub-questions to an Record<string, boolean>
 * @param template Template name
 * @param options Options selected
 */
export default function parseTemplateOptions(
	template: 'next' | 'webapi',
	options: string[]
): Record<string, boolean> {
	if (template === 'next') {
		return nextTemplateKeys.reduce<Record<string, boolean>>(
			(prev, curr) => reduceOptions(prev, curr, options),
			{}
		)
	} else if (template === 'webapi') {
		return webapiTemplateKeys.reduce<Record<string, boolean>>(
			(prev, curr) => reduceOptions(prev, curr, options),
			{}
		)
	}

	return {}
}
