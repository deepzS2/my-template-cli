import Listr from 'listr'
import { projectInstall } from 'pkg-install'

import { copyTemplateFiles } from './createProject.js'
import { initGit } from './git.js'

export const tasks = (options) =>
  new Listr([
    {
      title: 'Copy project files',
      task: () => copyTemplateFiles(options),
    },
    {
      title: 'Initialize git',
      task: () => initGit(options),
      enabled: () => options.git,
    },
    {
      title: 'Install dependencies',
      task: () =>
        projectInstall({
          cwd: options.targetDirectory,
        }),
      skip: () =>
        !options.runInstall
          ? 'Pass --install to automatically install dependencies'
          : undefined,
    },
  ])
