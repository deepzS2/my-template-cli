import inquirer from 'inquirer'

export async function promptForMissingOptions(options) {
  const defaultType = 'TypeScript'

  if (options.skipPrompts) {
    return {
      ...options,
      type: options.type || defaultType,
    }
  }

  const questions = []

  if (!options.type) {
    questions.push({
      type: 'list',
      name: 'type',
      message: 'Please choose which project template to use',
      choices: ['JavaScript', 'TypeScript'],
      default: defaultType,
    })
  }

  if (!options.git) {
    questions.push({
      type: 'confirm',
      name: 'git',
      message: 'Initialize a git repository?',
      default: false,
    })
  }

  const answers = await inquirer.prompt(questions)

  return {
    ...options,
    type: options.type || answers.type,
    git: options.git || answers.git,
  }
}
