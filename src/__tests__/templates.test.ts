import fs from 'fs'
import path from 'path'
import Template from '../utils/templates'

describe('Classe de template (utilidade)', () => {
  it('Deve criar a instância', () => {
    const template = new Template('typescript')

    expect(template).toBeInstanceOf(Template)
  })

  it("Deve retornar todos os templates disponíveis", () => {
    const typescriptTemplates = fs.readdirSync(path.join(__dirname, '..', 'templates', 'typescript')).map((file) => ({ name: file.replace('-', ' '), dir: file }))
    const availableTemplates = new Template('typescript').getAllTemplatesFromPath()

    expect(availableTemplates).toEqual(expect.arrayContaining(typescriptTemplates))
  })

  it("Deve retornar o template escolhido", () => {
    const template = new Template('typescript')
    template.getAllTemplatesFromPath()

    const result = template.getTemplatePath('next')

    expect(result).toBeTruthy()
  })
})