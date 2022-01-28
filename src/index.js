#!/usr/bin/env node

import { createProject } from './createProject.js'
import parseArgs from './parseArgs.js'
import { promptForMissingOptions } from './prompt.js'

export async function cli(rawArgs) {
  const args = parseArgs(rawArgs)
  const options = await promptForMissingOptions(args)
  await createProject(options)
  console.log(options)
}

cli(process.argv)
