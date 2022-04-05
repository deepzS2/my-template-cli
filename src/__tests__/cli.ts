import { spawn } from 'child_process'
import concat from 'concat-stream'
import { constants } from 'os'

function createProcess(
  processPath: string,
  args: string[] = [],
  env: NodeJS.ProcessEnv | null = null
) {
  args = [processPath].concat(args)

  return spawn('node', args, {
    env: Object.assign(
      {
        NODE_ENV: 'test',
        PATH: process.env.PATH,
      },
      env
    ),
  })
}

export const DOWN = '\x1B\x5B\x42'
export const UP = '\x1B\x5B\x41'
export const ENTER = '\x0D'
export const SPACE = '\x20'

type Options = {
  env?: NodeJS.ProcessEnv | null
  inputs?: string[]
  timeout?: number
  maxTimeout?: number
}

export default function (
  processPath: string,
  args: string[] = [],
  opts: Options = { env: null, inputs: [], timeout: 100, maxTimeout: 10000 }
) {
  const { env, timeout, maxTimeout } = opts
  const childProcess = createProcess(processPath, args, env)

  childProcess.stdin.setDefaultEncoding('utf-8')

  let currentInputTimeout: NodeJS.Timeout
  let killIOTimeout: NodeJS.Timeout

  const loop = (inputs: string[]) => {
    if (killIOTimeout) {
      clearTimeout(killIOTimeout);
    }

    if (!inputs.length) {
      childProcess.stdin.end()

      killIOTimeout = setTimeout(() => {
        if (killIOTimeout) clearTimeout(killIOTimeout)
        if (currentInputTimeout) clearTimeout(currentInputTimeout)

        childProcess.kill(constants.signals.SIGTERM)
      }, maxTimeout)

      return
    }

    currentInputTimeout = setTimeout(() => {
      childProcess.stdin.write(inputs.shift())
      loop(inputs)
    }, timeout)
  }

  const promise = new Promise<string>((resolve, reject) => {
    childProcess.stderr.once('error', err => {
      childProcess.stdin.end();

      if (currentInputTimeout) {
        clearTimeout(currentInputTimeout)
        opts.inputs = []
      }

      if (killIOTimeout) {
        clearTimeout(killIOTimeout)
      }

      reject(err.toString());
    });

    childProcess.on('error', (err) => {
      if (killIOTimeout) clearTimeout(killIOTimeout)

      if (currentInputTimeout) {
        clearTimeout(currentInputTimeout)
        opts.inputs = []
      }

      childProcess.kill(constants.signals.SIGTERM)
      reject(err)
    })

    opts.inputs && loop(opts.inputs)

    childProcess.stdout.pipe(
      concat((result: Buffer) => {
        if (killIOTimeout) clearTimeout(killIOTimeout)
        if (currentInputTimeout) clearTimeout(currentInputTimeout)

        resolve(result.toString())
      })
    )
  })

  return promise
}
