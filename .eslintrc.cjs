module.exports = {
	root: true,
	extends: [
		'eslint:recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:svelte/recommended',
		'airbnb-base',
		'airbnb-typescript/base',
		'plugin:prettier/recommended',
	],
	parser: '@typescript-eslint/parser',
	plugins: ['@typescript-eslint'],
	parserOptions: {
		sourceType: 'module',
		ecmaVersion: 2020,
		extraFileExtensions: ['.svelte'],
		// https://github.com/vitejs/vite/issues/13747
		project: './tsconfig.json',
	},
	// https://github.com/vitejs/vite/issues/13747
	ignorePatterns: ['*.eslintrc.cjs'],
	env: {
		browser: true,
		es2017: true,
		node: true,
	},
	overrides: [
		{
			files: ['*.svelte'],
			parser: 'svelte-eslint-parser',
			parserOptions: {
				parser: '@typescript-eslint/parser',
			},
		},
	],
	rules: {
		'import/prefer-default-export': 0,
		'import/no-mutable-exports': 0,
		'no-param-reassign': 0,
		'import/extensions': 0,
		'import/no-extraneous-dependencies': 0,
		// https://eslint.org/docs/latest/rules/prefer-arrow-callback
		'prefer-arrow-callback': ['error', { allowNamedFunctions: false, allowUnboundThis: true }],
		// https://eslint.org/docs/latest/rules/arrow-body-style#never
		// if you like to have implicit return
		'arrow-body-style': ['error', 'as-needed'],
	},
};
