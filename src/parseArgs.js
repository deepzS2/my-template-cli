import arg from 'arg'

const parseArgs = (rawArgs) => {
  const args = arg(
    {
      '--git': Boolean,
      '--yes': Boolean,
      '--install': Boolean,
      '-g': '--git',
      '-y': '--yes',
      '-i': '--install',
    },
    {
      argv: rawArgs.slice(2),
    }
  )

  return {
    skipPrompts: args['--yes'] || false,
    git: args['--git'] || false,
    type: args._[0],
    runInstall: args['--install'] || false,
  }
}

export default parseArgs
