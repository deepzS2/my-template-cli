import yargs from 'yargs/yargs'

/**
 * Construct yarg object
 * @param argv process.argv.slice(2)
 * @returns yargs object
 */
export const constructYargs = (argv: string[]) => {
	return yargs(argv)
		.scriptName('detc')
		.options({
			template: {
				type: 'string',
				alias: 't',
				description: 'Nome do template que será utilizado',
			},
			language: {
				choices: ['typescript', 'c#'] as const,
				alias: 'lang',
				description: 'Linguagem que vai ser utilizada',
			},
			git: {
				type: 'boolean',
				alias: 'g',
				description: 'Inicializa o git',
			},
			install: {
				type: 'boolean',
				alias: 'i',
				description: 'Instala as dependências do projeto',
			},
		})
		.usage(
			'$0 [projectName] [options]',
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			// @ts-ignore
			'Gera um projeto a partir de um template',
			(args) => {
				args.positional('projectName', {
					describe: 'Nome do projeto',
					type: 'string',
				})
			}
		)
		.example(
			'$0 novoProjeto --language typescript --git --template next',
			"Gera um projeto Next, utilizando Typescript, com inicialização do Git e com nome 'novoProjeto'"
		)
		.example(
			'$0',
			'Gera um novo projeto com base nas respostas das perguntas que serão feitas'
		)
		.help('help', 'Comando de ajuda', true)
		.alias('help', 'h')
}
