/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
	preset: 'ts-jest',
	testEnvironment: 'node',
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
}
