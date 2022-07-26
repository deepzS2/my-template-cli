import { keys as componentStyledKeys } from '@models/templates/components/componentStyledQuestions'
import { keys as expressTemplateKeys } from '@models/templates/expressTemplateQuestions'
import { keys as nextTemplateKeys } from '@models/templates/nextTemplateQuestions'
import { keys as webapiTemplateKeys } from '@models/templates/webapiTemplateQuestions'

const reduce = (array: string[], options: string[]) => {
	return array.reduce<Record<string, boolean>>((prev, curr) => {
		const useOption = options.includes(curr)

		return {
			...prev,
			[curr]: useOption,
		}
	}, {})
}

/**
 * Parse template sub-questions to an Record<string, boolean>
 * @param template Template name
 * @param options Options selected
 */
export default function parseTemplateOptions(
	template: 'next' | 'webapi' | 'componentStyled' | 'express',
	options: string[]
): Record<string, boolean> {
	if (template === 'next') {
		return reduce(nextTemplateKeys, options)
	} else if (template === 'webapi') {
		return reduce(webapiTemplateKeys, options)
	} else if (template === 'componentStyled') {
		return reduce(componentStyledKeys, options)
	} else if (template === 'express') {
		return reduce(expressTemplateKeys, options)
	}

	return {}
}
