import * as inquirer from 'inquirer'

interface Answers {
	templateOptions: string[]
}

export const keys = [
	'useIcons',
	'usePWA',
	'useSteps',
	'useHusky',
	'useGrid',
	'useForm',
	'useQuery',
	'useApexCharts',
]

const question = (): inquirer.QuestionCollection<Answers> => {
	return {
		name: 'templateOptions',
		type: 'checkbox',
		message: 'Gostaria de utilizar alguma biblioteca opcional?',
		choices: [
			{
				name: 'React Icons (biblioteca de ícones)',
				value: keys[0],
			},
			{
				name: 'PWA (Progressive Web App)',
				value: keys[1],
			},
			{
				name: 'React Step Wizard (biblioteca de steps)',
				value: keys[2],
			},
			{
				name: 'Husky (padronização de commits)',
				value: keys[3],
			},
			{
				name: 'GridJS (biblioteca de tabelas)',
				value: keys[4],
			},
			{
				name: 'React Hook Form (biblioteca de formulários)',
				value: keys[5],
			},
			{
				name: 'React Query (biblioteca de query e cache)',
				value: keys[6],
			},
			{
				name: 'React Apex Charts (biblioteca de gráficos)',
				value: keys[7],
			},
		],
	}
}

export default question
