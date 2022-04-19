module.exports = {
	presets: [
		['@babel/preset-env', { targets: 'node 12.0' }],
		'@babel/preset-typescript',
	],
	plugins: [
		[
			'module-resolver',
			{
				// root: ['./src/'],
				alias: {
					'@models': './src/models',
					'@templates': './src/templates',
					'@commands': './src/commands',
					'@utils': './src/utils',
					'@': './src',
				},
			},
		],
	],
	ignore: ['src/templates/*', 'src/__tests__'],
}
