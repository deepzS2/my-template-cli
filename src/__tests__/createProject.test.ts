import createProject from '../createProject'
import fs from 'fs'

describe('Criação da pasta do projeto', () => {
  it("Deve criar uma nova pasta se não existir uma com o mesmo nome", () => {
    expect(() => {
      createProject('teste')

      fs.rmdirSync('teste')
    }).not.toThrowError()
  })

  it("Deve retornar um erro caso a pasta já existir com o mesmo nome", () => {
    expect(() => {
      fs.mkdirSync('teste')

      createProject('teste')

      fs.rmdirSync('teste')
    }).toThrowError()
  })
})