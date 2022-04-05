import parseTemplateOptions from '../utils/parseTemplateOptions'
import { keys } from '../models/templates/nextTemplateQuestions'

describe('Parse das opções de template de string[] para Record<string, boolean>', () => {
  it('Deve retornar todos as opções como verdadeira caso sejam selecionadas', () => {
    const result = parseTemplateOptions('next', keys)

    const desiredResult = keys.reduce<Record<string, boolean>>((prev, curr) => {
      return {
        ...prev,
        [curr]: true,
      }
    }, {})

    expect(result).toMatchObject(desiredResult)
  })

  it('Deve retornar algumas opções como verdadeira se forem selecionadas', () => {
    const result = parseTemplateOptions('next', keys.slice(-2))

    expect(result).toMatchObject({
      [keys[keys.length - 1]]: true,
      [keys[keys.length - 2]]: true
    })
  })

  it('Deve retornar todas as opções como falso caso não sejam selecionadas', () => {
    const result = parseTemplateOptions('next', [])

    const desiredResult = keys.reduce<Record<string, boolean>>((prev, curr) => {
      return {
        ...prev,
        [curr]: false,
      }
    }, {})

    expect(result).toMatchObject(desiredResult)
  })
})