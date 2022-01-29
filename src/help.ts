import { Args } from './@types/global'

const usageMessage = `
  Usage: dpzt [name] [options]

  Options:

    -h, --help              Informações dos comandos
    --ts                    O projeto utilizará TypeScript
    --git                   Iniciar um repositório do GitHub com o projeto
    --install               Instalar as dependências do projeto
    -t, --template <name>   Template que será utilizado
`

export default function shouldDisplayHelpMessage(args: Args) {
	if (!!args['h'] || !!args['help']) {
		console.log(usageMessage)
		return true
	}

	return false
}
