import * as inquirer from 'inquirer'
import * as fs from 'fs'
import * as path from 'path'
import * as yargs from 'yargs'

import createProject from './createProject'
import { Args, CliOptions } from './@types/global'
import createDirectoryContents from './createDirectoryContents'
import postProcess from './utils/postProcess'

const args = yargs.argv as Args

const INITIAL_QUESTIONS: inquirer.QuestionCollection<Questions1> = [
  {
      name: 'name',
      type: 'input',
      message: 'Nome do projeto:',
      when: () => args['_'].length === 0 
  },
  {
      name: 'ts',
      type: 'confirm',
      message: 'Gostaria de utilizar TypeScript?',
      default: true,
      when: () => args['ts'] === undefined
  }
];

const getFinalQuestions = (choices: string[]): inquirer.QuestionCollection<Questions2> => [
  { 
    name: 'template',
    type: 'list',
    message: 'Qual template você gostaria de utilizar?',
    choices: choices
  }, 
  {
    name: 'runInstall',
    type: 'confirm',
    message: 'Gostaria de instalar as dependências automaticamente',
    default: true
  }
]

interface Questions1 {
  name: string
  ts: boolean
}

interface Questions2 {
  template: string
  runInstall: boolean
}

export default async function promptQuestions() {
  let answers = await inquirer.prompt(INITIAL_QUESTIONS)

  answers.name = args['_'][0] as string
  answers.ts = !!args['ts']

  answers = Object.assign({}, answers, yargs.argv);

  const projectName = answers['name']
  const useTypescript = answers.ts ? 'typescript' : 'javascript'

  const templatesLanguagePath = path.join(__dirname, 'templates', useTypescript)

  const { template: projectTemplate, runInstall } = await inquirer.prompt(getFinalQuestions(fs.readdirSync(templatesLanguagePath)))

  const templatePath = path.join(templatesLanguagePath, projectTemplate)
  const targetPath = path.join(process.cwd(), projectName)

  const options: CliOptions = {
      projectName,
      templateName: projectTemplate,
      templatePath,
      targetPath,
      useTypescript: answers.ts,
      runInstall
  }

  if (!createProject(targetPath)) return

  createDirectoryContents(templatePath, projectName)
  postProcess(options)

  console.log(options)
}