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
	// https://youtu.be/y068wjb4XtI?feature=shared&t=7335
	// let's not ignore common js files
	// https://youtu.be/y068wjb4XtI?feature=shared&t=7432
	// ignorePatterns: ['*.eslintrc.cjs'],
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
		// turn on errors for missing imports
		'import/no-unresolved': 'error',
	},
	// https://www.npmjs.com/package/eslint-import-resolver-typescript
	settings: {
		'import/parsers': {
			'@typescript-eslint/parser': ['.cjs', '.js', '.ts', '.svelte'],
		},
		'import/resolver': {
			typescript: {
				alwaysTryTypes: true, // always try to resolve types under `<root>@types` directory even it doesn't contain any source code, like `@types/unist`

				// Choose from one of the "project" configs below or omit to use <root>/tsconfig.json by default

				// use <root>/path/to/folder/tsconfig.json
				// project: './tsconfig.json',
			},
		},
	},
};
