import createTargetDirectory from '../createTargetDirectory'
import fs from 'fs'

describe('Criação da pasta do projeto', () => {
  it("Deve criar uma nova pasta se não existir uma com o mesmo nome", () => {
    expect(() => {
      createTargetDirectory('teste')

      fs.rmdirSync('teste')
    }).not.toThrowError()
  })

  it("Deve retornar um erro caso a pasta já existir com o mesmo nome", () => {
    expect(() => {
      fs.mkdirSync('teste')

      createTargetDirectory('teste')
    }).toThrowError()

    fs.rmdirSync('teste')
  })
})