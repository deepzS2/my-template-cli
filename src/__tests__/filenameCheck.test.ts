import filenameCheck from '../filenameCheck'

describe('Função de checar nome do arquivo', () => {
  it('Deve retornar undefined se não tiver uma opção de template compatível com o nome do arquivo', () => {
    const filename = '[test]index.ts'
    const templateOptions = {
      useTest: true
    }

    const result = filenameCheck(filename, templateOptions)

    expect(result).not.toBeTruthy()
  })

  it('Deve retornar falso se a opção de template for falsa', () => {
    const filename = '[useTest]index.ts'
    const templateOptions = {
      useTest: false
    }

    const result = filenameCheck(filename, templateOptions)

    expect(result).not.toBeTruthy()
  })

  it('Deve retornar verdadeiro se a opção do template for verdadeira', () => {
    const filename = '[useTest]index.ts'
    const templateOptions = {
      useTest: true
    }

    const result = filenameCheck(filename, templateOptions)

    expect(result).toBeTruthy()
  })
})