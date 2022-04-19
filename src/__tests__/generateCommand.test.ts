import fs from 'fs'
import path from 'path'

import cli, { ENTER, DOWN } from './cli'

describe('Testando comandos de gerador de componentes pelo command line', () => {
  const defaultGeneration = async () => await cli('lib/index.js', ['generate'], {
    inputs: [DOWN, ENTER, ENTER, 'componenteTeste', ENTER, ENTER, ENTER, ENTER],
    timeout: 500
  })

  afterEach(() => {
    if (fs.existsSync('teste'))
      fs.rmSync('teste', { recursive: true, force: true })

    if (fs.existsSync('componenteTeste'))
      fs.rmSync('componenteTeste', { recursive: true, force: true })
  })

  it('Deve gerar o componente com base nas perguntas', async () => {
    await defaultGeneration()

    const PATH = path.join(process.cwd(), 'componenteTeste')

    expect(fs.existsSync(PATH)).toBeTruthy()
  })

  it('Deve gerar o componente com os argumentos do comando', async () => {
    await cli('lib/index.js', ['generate', 'componenteTeste', '--language=typescript'], {
      inputs: [ENTER, ENTER, ENTER, ENTER],
      timeout: 500
    })

    const PATH = path.join(process.cwd(), 'componenteTeste')

    expect(fs.existsSync(PATH)).toBeTruthy()
  })

  it('Deve gerar um componente dentro de uma pasta', async () => {
    fs.mkdirSync('teste')

    await cli('lib/index.js', ['generate'], {
      inputs: [DOWN, ENTER, ENTER, 'componenteTeste', ENTER, DOWN, DOWN, DOWN, ENTER, ENTER, ENTER],
      timeout: 750
    })

    const PATH = path.join(process.cwd(), 'teste')

    const results = fs.readdirSync(PATH)
    expect(results).toContain('componenteTeste')
  }, 15000)

  it('Não deve gerar um componente se a pasta nomeada já existir', async () => {
    fs.mkdirSync('componenteTeste')

    return expect(defaultGeneration()).resolves.toMatch("").finally(() => {
      fs.rmdirSync('componenteTeste')
    })
  })
})