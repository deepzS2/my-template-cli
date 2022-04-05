import cli, { ENTER, DOWN, SPACE } from './cli'
import { EOL } from 'os'
import fs from 'fs'

describe('Testando comandos pelo command line', () => {
  afterEach(() => {
    if (fs.existsSync('teste'))
      fs.rmSync('teste', { recursive: true, force: true })
  })

  test('Deve rodar o script de pergunta se o argumento não for passado', async () => {
    const result = await cli('dist/index.js', [], {
      inputs: ['teste', ENTER, 'y', ENTER, DOWN, DOWN, ENTER, 'n', ENTER, 'n', ENTER, ENTER],
      timeout: 500
    })

    expect(result.trim().split(EOL).shift()).not.toBeNull()
  })

  test('Deve não realizar uma pergunta caso seja passada como argumento no command line', async () => {
    const result = await cli('dist/index.js', ['--ts', '--template=next'], {
      inputs: ['teste', ENTER, 'y', ENTER, 'n', ENTER, 'n', ENTER, ENTER],
      timeout: 500
    })

    // 18 outputs without typescript question and template
    expect(result.trim().split(EOL).length).toBeLessThanOrEqual(18)
  })

  test('Deve gerar o projeto com os conteúdos do respectivo template dentro', async () => {
    await cli('dist/index.js', ['--ts', '--template=next'], {
      inputs: ['teste', ENTER, 'y', ENTER, 'n', ENTER, 'n', ENTER, ENTER],
      timeout: 500
    })

    const fileExist = fs.existsSync('teste/next.config.js')

    expect(fileExist).toBeTruthy()
  })

  test('Deve gerar arquivos opcionais pelas sub-perguntas de template', async () => {
    await cli('dist/index.js', ['--ts', '--template=next'], {
      inputs: ['teste', ENTER, 'n', ENTER, 'n', ENTER, DOWN, DOWN, DOWN, SPACE, ENTER],
      timeout: 400,
      maxTimeout: 15000
    })

    const folderExist = fs.existsSync('teste/.husky')

    expect(folderExist).toBeTruthy()
  }, 20000)

  test('Não deve gerar o projeto se a pasta com o mesmo nome existir', async () => {
    fs.mkdirSync('teste')

    await cli('dist/index.js', ['--ts', '--template=next'], {
      inputs: ['teste', ENTER, 'n', ENTER, 'n', ENTER, ENTER],
      timeout: 400,
    })

    expect(fs.readdirSync('teste').length).toBe(0)
  })

  test('Deve mostrar o comando de ajuda', async () => {
    const result = await cli('dist/index.js', ['-h'])

    expect(result.trim().split(EOL).shift()).toContain('Usage')
  })
})
