import * as inquirer from 'inquirer'

interface Answers {
  templateOptions: string[]
}

const question = (): inquirer.QuestionCollection<Answers> => {
	return {
			name: 'templateOptions',
			type: 'checkbox',
			message: 'Gostaria de utilizar alguma biblioteca opcional?',
			choices: [
        {
          name: 'React Icons (biblioteca de ícones)',
          value: 'useIcons',
        },
        {
          name: 'PWA (Progressive Web App)',
          value: 'usePWA'
        },
        {
          name: 'React Step Wizard (biblioteca de steps)',
          value: 'useSteps'
        },
        {
          name: 'Husky (padronização de commits)',
          value: 'useHusky'
        },
        {
          name: 'GridJS (biblioteca de tabelas)',
          value: 'useGrid'
        },
        {
          name: 'React Hook Form (biblioteca de formulários)',
          value: 'useForm'
        },
        {
          name: 'React Query (biblioteca de query e cache)',
          value: 'useQuery'
        },
        {
          name: 'React Apex Charts (biblioteca de gráficos)',
          value: 'useApexCharts'
        }
      ]
		}
}

export default question