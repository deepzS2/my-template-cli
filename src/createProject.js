import chalk from 'chalk'
import fs from 'fs'
import ncp from 'ncp'
import path from 'path'
import { fileURLToPath } from 'url'
import { promisify } from 'util'

import { tasks } from './tasks.js'

const access = promisify(fs.access)
const copy = promisify(ncp)

export async function copyTemplateFiles(options) {
  if (!options.templateDirectory || !options.targetDirectory) return

  return copy(options.templateDirectory, options.targetDirectory, {
    clobber: false,
  })
}

export async function createProject(options) {
  options = {
    ...options,
    targetDirectory: options.targetDirectory || process.cwd(),
  }

  const currentFileUrl = import.meta.url
  const templateDir = path.resolve(
    fileURLToPath(currentFileUrl),
    '../templates',
    options.type.toLowerCase()
  )

  console.log(templateDir)

  options.templateDirectory = templateDir

  try {
    await access(templateDir, fs.constants.R_OK)
  } catch (err) {
    console.error('%s Invalid template name', chalk.red.bold('ERROR'))
    process.exit(1)
  }

  await tasks(options).run()

  console.log('%s Project ready', chalk.green.bold('DONE'))
  return true
}
