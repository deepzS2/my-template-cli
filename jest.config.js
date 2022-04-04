/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  transform: {
    '^.+\\.ts?$': 'ts-jest',
  },
  testPathIgnorePatterns: [
    '<rootDir>/src/templates',
    '<rootDir>/dist/templates',
    '<rootDir>/node_modules',
  ],
  modulePathIgnorePatterns: [
    '<rootDir>/src/templates',
    '<rootDir>/dist/templates',
  ],
  coveragePathIgnorePatterns: [
    '<rootDir>/src/templates',
    '<rootDir>/dist/templates',
  ],
  testMatch: ["**/?(*.)+(spec|test).[jt]s?(x)"],
  testTimeout: 7500,
  verbose: true,
  detectOpenHandles: true
}
