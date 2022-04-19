/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  transform: {
    '^.+\\.ts?$': 'ts-jest',
  },
  testPathIgnorePatterns: [
    '<rootDir>/src/templates',
    '<rootDir>/lib/templates',
    '<rootDir>/node_modules',
  ],
  modulePathIgnorePatterns: [
    '<rootDir>/src/templates',
    '<rootDir>/lib/templates',
  ],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
    "^@utils/(.*)$": "<rootDir>/src/utils/$1",
    "^@models/(.*)$": "<rootDir>/src/models/$1",
  },
  coveragePathIgnorePatterns: [
    '<rootDir>/src/templates',
    '<rootDir>/lib/templates',
  ],
  testMatch: ["**/?(*.)+(spec|test).[tj]s?(x)"],
  testTimeout: 7500,
  verbose: true,
  detectOpenHandles: true,
  silent: true
}
