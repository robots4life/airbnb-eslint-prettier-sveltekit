## 1.

<a href="https://youtu.be/y068wjb4XtI?feature=shared&t=2609" target="_blank">https://youtu.be/y068wjb4XtI?feature=shared&t=2609</a>

original configs coming from svelte cli, skeleton project with typescript, prettier & eslint

**package.json**

```json
{
	"name": "airbnb-eslint-prettier-sveltekit",
	"version": "0.0.1",
	"private": true,
	"scripts": {
		"dev": "vite dev",
		"build": "vite build",
		"preview": "vite preview",
		"check": "svelte-kit sync && svelte-check --tsconfig ./tsconfig.json",
		"check:watch": "svelte-kit sync && svelte-check --tsconfig ./tsconfig.json --watch",
		"lint": "prettier --plugin-search-dir . --check . && eslint .",
		"format": "prettier --plugin-search-dir . --write ."
	},
	"devDependencies": {
		"@sveltejs/adapter-auto": "^2.0.0",
		"@sveltejs/kit": "^1.20.4",
		"@typescript-eslint/eslint-plugin": "^6.0.0",
		"@typescript-eslint/parser": "^6.0.0",
		"eslint": "^8.28.0",
		"eslint-config-prettier": "^8.5.0",
		"eslint-plugin-svelte": "^2.30.0",
		"prettier": "^2.8.0",
		"prettier-plugin-svelte": "^2.10.1",
		"svelte": "^4.0.5",
		"svelte-check": "^3.4.3",
		"tslib": "^2.4.1",
		"typescript": "^5.0.0",
		"vite": "^4.4.2"
	},
	"type": "module"
}
```

**.eslintrc.cjs**

```js
module.exports = {
	root: true,
	extends: [
		'eslint:recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:svelte/recommended',
		'prettier',
	],
	parser: '@typescript-eslint/parser',
	plugins: ['@typescript-eslint'],
	parserOptions: {
		sourceType: 'module',
		ecmaVersion: 2020,
		extraFileExtensions: ['.svelte'],
	},
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
};
```

**.prettierrc**

```json
{
	"useTabs": true,
	"singleQuote": true,
	"trailingComma": "none",
	"printWidth": 100,
	"plugins": ["prettier-plugin-svelte"],
	"pluginSearchDirs": ["."],
	"overrides": [{ "files": "*.svelte", "options": { "parser": "svelte" } }]
}
```

## 2.

<a href="https://youtu.be/y068wjb4XtI?feature=shared&t=2855" target="_blank">https://youtu.be/y068wjb4XtI?feature=shared&t=2855</a>

**.prettierrc**

```json
"trailingComma": "es5",
```

```json
"semi": "true",
```

## 3.

prettier & eslint should be working together

<a href="https://youtu.be/y068wjb4XtI?feature=shared&t=2919" target="_blank">https://youtu.be/y068wjb4XtI?feature=shared&t=2919</a>

once we get them working together we will add the airbnb config

## 4.

integrating prettier with linters

<a href="https://youtu.be/y068wjb4XtI?feature=shared&t=2978" target="_blank">https://youtu.be/y068wjb4XtI?feature=shared&t=2978</a>

<a href="https://prettier.io/docs/en/integrating-with-linters" target="_blank">https://prettier.io/docs/en/integrating-with-linters</a>

we need

<a href="https://github.com/prettier/eslint-config-prettier" target="_blank">https://github.com/prettier/eslint-config-prettier</a>

and

<a href="https://github.com/prettier/eslint-plugin-prettier" target="_blank">https://github.com/prettier/eslint-plugin-prettier</a>

eslint-config-prettier comes with svelte cli

install eslint-plugin-prettier as dev dependency

`pnpm install -D eslint-plugin-prettier`

this leads to a peer dependency warning with pnpm

```bash
 WARN  Issues with peer dependencies found
.
└─┬ eslint-plugin-prettier 5.0.1
  └── ✕ unmet peer prettier@>=3.0.0: found 2.8.8
```

`npm install -D eslint-plugin-prettier`

this leads to a peer dependency error with npm

```bash
npm install -D eslint-plugin-prettier
npm ERR! code ERESOLVE
npm ERR! ERESOLVE unable to resolve dependency tree
npm ERR!
npm ERR! While resolving: air-es-svelte@0.0.1
npm ERR! Found: prettier@2.8.8
npm ERR! node_modules/prettier
npm ERR!   dev prettier@"^2.8.0" from the root project
npm ERR!
npm ERR! Could not resolve dependency:
npm ERR! peer prettier@">=3.0.0" from eslint-plugin-prettier@5.0.1
npm ERR! node_modules/eslint-plugin-prettier
npm ERR!   dev eslint-plugin-prettier@"*" from the root project
npm ERR!
npm ERR! Fix the upstream dependency conflict, or retry
npm ERR! this command with --force or --legacy-peer-deps
npm ERR! to accept an incorrect (and potentially broken) dependency resolution.
npm ERR!
npm ERR!
npm ERR! For a full report see:
npm ERR! /home/user/.npm/_logs/2023-10-18T19_07_42_805Z-eresolve-report.txt

npm ERR! A complete log of this run can be found in: /home/user/.npm/_logs/2023-10-18T19_07_42_805Z-debug-0.log
```

to resolve the issues with peer dependencies we update all packages and their dependencies with npm-check-updates

here is a little upgrade script

**upgrade.sh**

```bash
#! /usr/bin/env bash

# run this inside the Devilbox container
# ./shell.sh

# run this script
# chmod +x upgrade.sh
# ./upgrade.sh

# https://www.npmjs.com/package/npm-check-updates

# don't forget to run npx npm-check-updates before running this script

clear

# https://docs.npmjs.com/cli/v7/commands/npx
# A prompt is printed (which can be suppressed by providing either --yes or --no).

# https://stackoverflow.com/a/70742969

npx --yes npm-check-updates

currentDateTime=$(date +"%Y-%m-%d-%H-%M-%S")
upgrades_filename="upgrades-$currentDateTime.log"

npx npm-check-updates -u > $upgrades_filename

# npm install --verbose

# pnpm install
```

`./upgrade.sh`

```bash
Upgrading /airbnb-eslint-prettier-sveltekit/package.json

 @sveltejs/adapter-auto             ^2.0.0  →   ^2.1.0
 @sveltejs/kit                     ^1.20.4  →  ^1.26.0
 @typescript-eslint/eslint-plugin   ^6.0.0  →   ^6.8.0
 @typescript-eslint/parser          ^6.0.0  →   ^6.8.0
 eslint                            ^8.28.0  →  ^8.51.0
 eslint-config-prettier             ^8.5.0  →   ^9.0.0
 eslint-plugin-svelte              ^2.30.0  →  ^2.34.0
 prettier                           ^2.8.0  →   ^3.0.3
 prettier-plugin-svelte            ^2.10.1  →   ^3.0.3
 svelte                             ^4.0.5  →   ^4.2.1
 svelte-check                       ^3.4.3  →   ^3.5.2
 tslib                              ^2.4.1  →   ^2.6.2
 typescript                         ^5.0.0  →   ^5.2.2
 vite                               ^4.4.2  →   ^4.5.0

Run npm install to install new versions.
```

or

`npx --yes npm-check-updates`

`npx npm-check-updates -u`

after the upgrade we install all packages

`pnpm install`

```bash
Packages: +215
++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
Progress: resolved 237, reused 215, downloaded 0, added 215, done

devDependencies:
+ @sveltejs/adapter-auto 2.1.0
+ @sveltejs/kit 1.26.0
+ @typescript-eslint/eslint-plugin 6.8.0
+ @typescript-eslint/parser 6.8.0
+ eslint 8.51.0
+ eslint-config-prettier 9.0.0
+ eslint-plugin-svelte 2.34.0
+ prettier 3.0.3
+ prettier-plugin-svelte 3.0.3
+ svelte 4.2.1
+ svelte-check 3.5.2
+ tslib 2.6.2
+ typescript 5.2.2
+ vite 4.5.0

Done in 5.1s
```

now we can install eslint-plugin-prettier as dev dependency without errors

`pnpm install -D eslint-plugin-prettier`

```bash
Packages: +37
+++++++++++++++++++++++++++++++++++++
Progress: resolved 274, reused 252, downloaded 0, added 37, done

devDependencies:
+ eslint-plugin-prettier 5.0.1

Done in 3.8s
```

:rocket:

## 5.

<a href="https://youtu.be/y068wjb4XtI?feature=shared&t=3020" target="_blank">https://youtu.be/y068wjb4XtI?feature=shared&t=3020</a>

<a href="https://github.com/prettier/eslint-plugin-prettier#recommended-configuration" target="_blank">https://github.com/prettier/eslint-plugin-prettier#recommended-configuration</a>

Then you need to add plugin:prettier/recommended as the last extension in your .eslintrc.cjs.

**.eslintrc.cjs**

```js
module.exports = {
	root: true,
	extends: [
		'eslint:recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:svelte/recommended',
		'plugin:prettier/recommended', // <===
	],
	parser: '@typescript-eslint/parser',
	plugins: ['@typescript-eslint'],
	parserOptions: {
		sourceType: 'module',
		ecmaVersion: 2020,
		extraFileExtensions: ['.svelte'],
	},
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
};
```

<a href="https://youtu.be/y068wjb4XtI?feature=shared&t=3050" target="_blank">https://youtu.be/y068wjb4XtI?feature=shared&t=3050</a>

`ctrl + shift + p` Developer: Reload Window

## 6.

<a href="https://youtu.be/y068wjb4XtI?feature=shared&t=3082" target="_blank">https://youtu.be/y068wjb4XtI?feature=shared&t=3082</a>

<a href="https://youtu.be/y068wjb4XtI?feature=shared&t=3465" target="_blank">https://youtu.be/y068wjb4XtI?feature=shared&t=3465</a>

have linting in `script` tags of `svelte` files

in the stream this does not work out of the box

however it **does** work with the current repo out of the box because it uses `"eslint-plugin-svelte": "^2.34.0",` instead of `eslint-plugin-svelte3`

<a href="https://github.com/sveltejs/eslint-plugin-svelte" target="_blank">https://github.com/sveltejs/eslint-plugin-svelte</a>

<a href="https://youtu.be/y068wjb4XtI?feature=shared&t=4481" target="_blank">https://youtu.be/y068wjb4XtI?feature=shared&t=4481</a>

<a href="https://github.com/sveltejs/eslint-plugin-svelte#computer-editor-integrations" target="_blank">https://github.com/sveltejs/eslint-plugin-svelte#computer-editor-integrations</a>

<a href="https://youtu.be/y068wjb4XtI?feature=shared&t=4588" target="_blank">https://youtu.be/y068wjb4XtI?feature=shared&t=4588</a>

**.vscode/settings.json**

```json
{
	// ESLint
	// https://github.com/sveltejs/eslint-plugin-svelte#computer-editor-integrations
	"eslint.validate": ["javascript", "typescript", "svelte"]

	// optional setup
	// "editor.defaultFormatter": "esbenp.prettier-vscode",
	// "editor.defaultFormatter": "dbaeumer.vscode-eslint",
	// "editor.formatOnSave": true,
	// https://github.com/microsoft/vscode-docs/blob/efa17ec71d755cf14c4722c7d05d10c538cb0e97/release-notes/v1_41.md#eslint
	// "editor.codeActionsOnSave": {
	// 	"source.fixAll.eslint": true
	// },
}
```

<a href="https://github.com/sveltejs/eslint-plugin-svelte#running-eslint-from-the-command-line" target="_blank">https://github.com/sveltejs/eslint-plugin-svelte#running-eslint-from-the-command-line</a>

## 7.

<a href="https://youtu.be/y068wjb4XtI?feature=shared&t=4608" target="_blank">https://youtu.be/y068wjb4XtI?feature=shared&t=4608</a>

<a href="https://youtu.be/y068wjb4XtI?feature=shared&t=4635" target="_blank">https://youtu.be/y068wjb4XtI?feature=shared&t=4635</a>

```json
{
	"name": "airbnb-eslint-prettier-sveltekit",
	"version": "0.0.1",
	"private": true,
	"scripts": {
		"dev": "vite dev",
		"build": "vite build",
		"preview": "vite preview",
		"check": "svelte-kit sync && svelte-check --tsconfig ./tsconfig.json",
		"check:watch": "svelte-kit sync && svelte-check --tsconfig ./tsconfig.json --watch",
		"lint": "prettier --plugin-search-dir . --check . && eslint .",
		"eslint": "eslint --ext .js,.cjs,.ts,.svelte . --fix",
		"format": "prettier --plugin-search-dir . --write ."
	},
	"devDependencies": {
		"@sveltejs/adapter-auto": "^2.1.0",
		"@sveltejs/kit": "^1.26.0",
		"@typescript-eslint/eslint-plugin": "^6.8.0",
		"@typescript-eslint/parser": "^6.8.0",
		"eslint": "^8.51.0",
		"eslint-config-prettier": "^9.0.0",
		"eslint-plugin-prettier": "^5.0.1",
		"eslint-plugin-svelte": "^2.34.0",
		"prettier": "^3.0.3",
		"prettier-plugin-svelte": "^3.0.3",
		"svelte": "^4.2.1",
		"svelte-check": "^3.5.2",
		"tslib": "^2.6.2",
		"typescript": "^5.2.2",
		"vite": "^4.5.0"
	},
	"type": "module"
}
```

`npm run eslint`

`pnpm run eslint`

works, now both, lints and formats the code, including `.svelte` files

:rocket: :heart:

## 8.

add airbnb typescript config & style guide

<a href="https://youtu.be/y068wjb4XtI?feature=shared&t=4692" target="_blank">https://youtu.be/y068wjb4XtI?feature=shared&t=4692</a>

<a href="https://github.com/airbnb/javascript" target="_blank">https://github.com/airbnb/javascript</a>

<a href="https://www.npmjs.com/package/eslint-config-airbnb" target="_blank">https://www.npmjs.com/package/eslint-config-airbnb</a>

**If you don't need React, see eslint-config-airbnb-base.**

<a href="https://www.npmjs.com/package/eslint-config-airbnb-base" target="_blank">https://www.npmjs.com/package/eslint-config-airbnb-base</a>

<a href="https://www.npmjs.com/package/eslint-config-airbnb-typescript" target="_blank">https://www.npmjs.com/package/eslint-config-airbnb-typescript</a>

`npx install-peerdeps --dev eslint-config-airbnb-base`

```bash
npx install-peerdeps --dev eslint-config-airbnb-base
install-peerdeps v3.0.3
Installing peerdeps for eslint-config-airbnb-base@latest.
npm install eslint-config-airbnb-base@15.0.0 eslint@^8.2.0 eslint-plugin-import@^2.25.2 --save-dev

ERR undefined
```

<a href="https://stackoverflow.com/questions/66967270/err-undefined-while-installing-airbnb-eslint" target="_blank">https://stackoverflow.com/questions/66967270/err-undefined-while-installing-airbnb-eslint</a>

:poop: :warning: **pnpm fails** :warning: :poop:

<a href="https://github.com/robots4life/airbnb-eslint-prettier-sveltekit/blob/master/logs/pnpm-fails.log" target="_blank">https://github.com/robots4life/airbnb-eslint-prettier-sveltekit/blob/master/logs/pnpm-fails.log</a>

deleted `/home/{user}/.npm/` folder

deleted `node_modules` folder in project

installed all packages using `npm`

`npm install --verbose`

:heart: :rocket: :thumbsup: **npm works fine** :thumbsup: :rocket: :heart:

then

`npx install-peerdeps --dev eslint-config-airbnb-base`

also works fine with result

```bash
npx install-peerdeps --dev eslint-config-airbnb-base
Need to install the following packages:
install-peerdeps@3.0.3
Ok to proceed? (y) y
npm WARN deprecated core-js@2.6.12: core-js@<3.23.3 is no longer maintained and not recommended for usage due to the number of issues. Because of the V8 engine whims, feature detection in old core-js versions could cause a slowdown up to 100x even if nothing is polyfilled. Some versions have web compatibility issues. Please, upgrade your dependencies to the actual version of core-js.
npm WARN deprecated @babel/polyfill@7.12.1: 🚨 This package has been deprecated in favor of separate inclusion of a polyfill and regenerator-runtime (when needed). See the @babel/polyfill docs (https://babeljs.io/docs/en/babel-polyfill) for more information.
install-peerdeps v3.0.3
Installing peerdeps for eslint-config-airbnb-base@latest.
npm install eslint-config-airbnb-base@15.0.0 eslint@^8.2.0 eslint-plugin-import@^2.25.2 --save-dev

SUCCESS eslint-config-airbnb-base
  and its peerDeps were installed successfully.
```

**so this means you need to use npm to install all packages** and **cannot use pnpm to install eslint-config-airbnb-base**

after

`npx install-peerdeps --dev eslint-config-airbnb-base`

**package.json**

```json
{
	"name": "airbnb-eslint-prettier-sveltekit",
	"version": "0.0.1",
	"private": true,
	"scripts": {
		"dev": "vite dev",
		"build": "vite build",
		"preview": "vite preview",
		"check": "svelte-kit sync && svelte-check --tsconfig ./tsconfig.json",
		"check:watch": "svelte-kit sync && svelte-check --tsconfig ./tsconfig.json --watch",
		"lint": "prettier --plugin-search-dir . --check . && eslint .",
		"eslint": "eslint --ext .js,.cjs,.ts,.svelte . --fix",
		"format": "prettier --plugin-search-dir . --write ."
	},
	"devDependencies": {
		"@sveltejs/adapter-auto": "^2.1.0",
		"@sveltejs/kit": "^1.26.0",
		"@typescript-eslint/eslint-plugin": "^6.8.0",
		"@typescript-eslint/parser": "^6.8.0",
		"eslint": "^8.51.0",
		"eslint-config-airbnb-base": "^15.0.0", <== NEW
		"eslint-config-prettier": "^9.0.0",
		"eslint-plugin-import": "^2.28.1", <== NEW
		"eslint-plugin-prettier": "^5.0.1",
		"eslint-plugin-svelte": "^2.34.0",
		"prettier": "^3.0.3",
		"prettier-plugin-svelte": "^3.0.3",
		"svelte": "^4.2.1",
		"svelte-check": "^3.5.2",
		"tslib": "^2.6.2",
		"typescript": "^5.2.2",
		"vite": "^4.5.0"
	},
	"type": "module"
}
```

Add "extends": "airbnb-base" to your .eslintrc.

<a href="https://www.npmjs.com/package/eslint-config-airbnb-typescript" target="_blank">https://www.npmjs.com/package/eslint-config-airbnb-typescript</a>

`npm install eslint-config-airbnb-typescript --save-dev`

alternatives to airbnb style guide

<a href="https://standardjs.com/" target="_blank">https://standardjs.com/</a>

<a href="https://github.com/xojs/xo" target="_blank">https://github.com/xojs/xo</a>

<a href="https://youtu.be/y068wjb4XtI?feature=shared&t=5282" target="_blank">https://youtu.be/y068wjb4XtI?feature=shared&t=5282</a>

<a href="https://www.npmjs.com/package/eslint-config-airbnb-typescript#4-configure-the-eslint-typescript-parser" target="_blank">https://www.npmjs.com/package/eslint-config-airbnb-typescript#4-configure-the-eslint-typescript-parser</a>

**.eslintrc.cjs**

```js
module.exports = {
	root: true,
	extends: [
		'eslint:recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:svelte/recommended',
		'airbnb-base',								<== NEW
		'airbnb-typescript/base',					<== NEW
		'plugin:prettier/recommended',
	],
	parser: '@typescript-eslint/parser',
	plugins: ['@typescript-eslint'],
	parserOptions: {
		sourceType: 'module',
		ecmaVersion: 2020,
		extraFileExtensions: ['.svelte'],
		// https://github.com/vitejs/vite/issues/13747
		project: './tsconfig.json',					<== NEW
	},
	// https://github.com/vitejs/vite/issues/13747
	ignorePatterns: ['*.cjs'],						<== NEW
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
};
```

<a href="https://youtu.be/y068wjb4XtI?feature=shared&t=5360" target="_blank">https://youtu.be/y068wjb4XtI?feature=shared&t=5360</a>

## 9.

<a href="https://youtu.be/y068wjb4XtI?feature=shared&t=6399" target="_blank">https://youtu.be/y068wjb4XtI?feature=shared&t=6399</a>

now there is some rules that we need to disable

```js
	rules: {
		'import/prefer-default-export': 0,
		'import/no-mutable-exports': 0,
		'no-param-reassign': 0,
		'import/extensions': 0,
		'import/no-extraneous-dependencies': 0,
	},
```

<a href="https://youtu.be/y068wjb4XtI?feature=shared&t=6504" target="_blank">https://youtu.be/y068wjb4XtI?feature=shared&t=6504</a>

we also need to tell eslint about the `$lib` alias folder location

<a href="https://youtu.be/y068wjb4XtI?feature=shared&t=6632" target="_blank">https://youtu.be/y068wjb4XtI?feature=shared&t=6632</a>

<a href="https://eslint.org/docs/latest/rules/prefer-arrow-callback" target="_blank">https://eslint.org/docs/latest/rules/prefer-arrow-callback</a>

```js
	rules: {
		'import/prefer-default-export': 0,
		'import/no-mutable-exports': 0,
		'no-param-reassign': 0,
		'import/extensions': 0,
		'import/no-extraneous-dependencies': 0,
		'prefer-arrow-callback': ['error', { allowNamedFunctions: false, allowUnboundThis: true }],
	},
```

<a href="https://youtu.be/y068wjb4XtI?feature=shared&t=6862" target="_blank">https://youtu.be/y068wjb4XtI?feature=shared&t=6862</a>

<a href="https://eslint.org/docs/latest/rules/arrow-body-style" target="_blank">https://eslint.org/docs/latest/rules/arrow-body-style</a>

<a href="https://youtu.be/y068wjb4XtI?feature=shared&t=7073" target="_blank">https://youtu.be/y068wjb4XtI?feature=shared&t=7073</a>

```js
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
```

## 10.

now let's work on paths and the `$lib` alias

<a href="https://youtu.be/y068wjb4XtI?feature=shared&t=7110" target="_blank">https://youtu.be/y068wjb4XtI?feature=shared&t=7110</a>

<a href="https://youtu.be/y068wjb4XtI?feature=shared&t=7188" target="_blank">https://youtu.be/y068wjb4XtI?feature=shared&t=7188</a>

<a href="https://www.npmjs.com/package/eslint-import-resolver-typescript" target="_blank">https://www.npmjs.com/package/eslint-import-resolver-typescript</a>

`npm install -D eslint-import-resolver-typescript`

```js
// https://www.npmjs.com/package/eslint-import-resolver-typescript
settings: {
	// 'import/parsers': {
	// 	'@typescript-eslint/parser': ['.cjs', '.js', '.ts', '.svelte'],
	// },
	'import/resolver': {
		typescript: {
			alwaysTryTypes: true, // always try to resolve types under `<root>@types` directory even it doesn't contain any source code, like `@types/unist`

			// Choose from one of the "project" configs below or omit to use <root>/tsconfig.json by default

			// use <root>/path/to/folder/tsconfig.json
			// project: './tsconfig.json',
		},
	},
},
```

## 11.

<a href="https://youtu.be/y068wjb4XtI?feature=shared&t=7432" target="_blank">https://youtu.be/y068wjb4XtI?feature=shared&t=7432</a>

we want the `.eslintrc.cjs` file **also** to be linted

<a href="https://youtu.be/y068wjb4XtI?feature=shared&t=7503" target="_blank">https://youtu.be/y068wjb4XtI?feature=shared&t=7503</a>

<a href="https://youtu.be/y068wjb4XtI?feature=shared&t=8045" target="_blank">https://youtu.be/y068wjb4XtI?feature=shared&t=8045</a>

<a href="https://typescript-eslint.io/linting/troubleshooting/#i-get-errors-telling-me-eslint-was-configured-to-run--however-that-tsconfig-does-not--none-of-those-tsconfigs-include-this-file" target="_blank">https://typescript-eslint.io/linting/troubleshooting/#i-get-errors-telling-me-eslint-was-configured-to-run--however-that-tsconfig-does-not--none-of-those-tsconfigs-include-this-file</a>

<a href="https://youtu.be/y068wjb4XtI?feature=shared&t=8111" target="_blank">https://youtu.be/y068wjb4XtI?feature=shared&t=8111</a>

**import export**

commonjs

<a href="https://en.wikipedia.org/wiki/CommonJS" target="_blank">https://en.wikipedia.org/wiki/CommonJS</a>

vs

js modules as defined in ecma script es6 (2015)

<a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules" target="_blank">https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules</a>

**great explanation**

<a href="https://youtu.be/y068wjb4XtI?feature=shared&t=8213" target="_blank">https://youtu.be/y068wjb4XtI?feature=shared&t=8213</a>

eslint supports common js so we have to use .eslintrc.cjs

<a href="https://youtu.be/y068wjb4XtI?feature=shared&t=8507" target="_blank">https://youtu.be/y068wjb4XtI?feature=shared&t=8507</a>

we really do want to lint the .eslintrc.cjs file

<a href="https://youtu.be/y068wjb4XtI?feature=shared&t=8676" target="_blank">https://youtu.be/y068wjb4XtI?feature=shared&t=8676</a>

**tsconfig.json**

**outDir** has to be specified !!

run

`npm run build`

and see that

`.svelte-kit/output`

is created !!

```json
{
	"extends": "./.svelte-kit/tsconfig.json",
	"compilerOptions": {
		"outDir": ".svelte-kit/output",
		"allowJs": true,
		"checkJs": true,
		"esModuleInterop": true,
		"forceConsistentCasingInFileNames": true,
		"resolveJsonModule": true,
		"skipLibCheck": true,
		"sourceMap": true,
		"strict": true
	},
	"include": [
		"./.svelte-kit/ambient.d.ts",
		"./.svelte-kit/./types/**/$types.d.ts",
		"./src/**/*.js",
		"./src/**/*.ts",
		"./src/**/*.svelte",
		"./tests/**/*.js",
		"./tests/**/*.ts",
		"./tests/**/*.svelte",
		"*.cjs",
		".*.cjs",
		"*.js",
		"*.ts"
	]
	// Path aliases are handled by https://kit.svelte.dev/docs/configuration#alias
	//
	// If you want to overwrite includes/excludes, make sure to copy over the relevant includes/excludes
	// from the referenced tsconfig.json - TypeScript does not merge them in
}
```

**.eslintrc.cjs**

no more

```js
ignorePatterns: ['*.eslintrc.cjs'],
```

```js
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
```

no more <a href="https://typescript-eslint.io/linting/troubleshooting/#i-get-errors-telling-me-eslint-was-configured-to-run--however-that-tsconfig-does-not--none-of-those-tsconfigs-include-this-file" target="_blank">https://typescript-eslint.io/linting/troubleshooting/#i-get-errors-telling-me-eslint-was-configured-to-run--however-that-tsconfig-does-not--none-of-those-tsconfigs-include-this-file</a> error !!!

:heart: :rocket: :thumbsup:

<a href="https://youtu.be/y068wjb4XtI?feature=shared&t=8978" target="_blank">https://youtu.be/y068wjb4XtI?feature=shared&t=8978</a>

this is due to just having copy pasted the include paths from `.svelte-kit/tsconfig.json` and so when we choose the correct path by removing a dot in the path in the include paths in the `tsconfig.json` it works :boom: :heart:

solution

<a href="https://youtu.be/y068wjb4XtI?feature=shared&t=9049" target="_blank">https://youtu.be/y068wjb4XtI?feature=shared&t=9049</a>

**absolute cathartic** :grin: <a href="https://dict.leo.org/german-english/cathartic" target="_blank">https://dict.leo.org/german-english/cathartic</a>

## 12 .

<a href="https://youtu.be/y068wjb4XtI?feature=shared&t=9137" target="_blank">https://youtu.be/y068wjb4XtI?feature=shared&t=9137</a>

now let's check if we need to disable more rules.. :question:

<a href="https://youtu.be/y068wjb4XtI?feature=shared&t=9281" target="_blank">https://youtu.be/y068wjb4XtI?feature=shared&t=9281</a>

resolve `$app` path

<a href="https://youtu.be/y068wjb4XtI?feature=shared&t=9509" target="_blank">https://youtu.be/y068wjb4XtI?feature=shared&t=9509</a>

ignore for now

<a href="https://youtu.be/y068wjb4XtI?feature=shared&t=10489" target="_blank">https://youtu.be/y068wjb4XtI?feature=shared&t=10489</a>

solution will be from <a href="https://github.com/CodingGarden/listd/blob/main/tsconfig.json" target="_blank">https://github.com/CodingGarden/listd/blob/main/tsconfig.json</a>

```json
"paths": {
	"$/*": ["./src/*"],
	"$lib": ["./src/lib"],
	"$lib/*": ["./src/lib/*"],
	"$app": ["./node_modules/@sveltejs/kit/types"],
	"$app/*": ["./node_modules/@sveltejs/kit/types/index.d.ts"]
},
```

## 13.

optional sorting of tailwindcss classes in html

<a href="https://github.com/tailwindlabs/prettier-plugin-tailwindcss" target="_blank">https://github.com/tailwindlabs/prettier-plugin-tailwindcss</a>

but we want to run it with eslint

so we use

<a href="https://www.npmjs.com/package/eslint-plugin-tailwindcss" target="_blank">https://www.npmjs.com/package/eslint-plugin-tailwindcss</a>

<a href="https://www.npmjs.com/package/eslint-plugin-tailwindcss#installation" target="_blank">https://www.npmjs.com/package/eslint-plugin-tailwindcss#installation</a>

`npm i -D eslint-plugin-tailwindcss`

but that does not seem to be able to run with eslint-plugin-svelte

<a href="https://github.com/sveltejs/eslint-plugin-svelte/issues/187" target="_blank">https://github.com/sveltejs/eslint-plugin-svelte/issues/187</a>

<a href="https://github.com/francoismassart/eslint-plugin-tailwindcss/issues?q=is%3Aissue+svelte" target="_blank">https://github.com/francoismassart/eslint-plugin-tailwindcss/issues?q=is%3Aissue+svelte</a>

so we want prettier-plugin-tailwindcss

<a href="https://youtu.be/y068wjb4XtI?feature=shared&t=11765" target="_blank">https://youtu.be/y068wjb4XtI?feature=shared&t=11765</a>

`npm install -D prettier prettier-plugin-tailwindcss`

**.prettierrc**

```json
{
	"useTabs": true,
	"singleQuote": true,
	"trailingComma": "es5",
	"semi": true,
	"printWidth": 100,
	"plugins": ["prettier-plugin-svelte", "prettier-plugin-tailwindcss"],
	"tailwindConfig": "./tailwind.config.js",
	"pluginSearchDirs": ["."],
	"overrides": [{ "files": "*.svelte", "options": { "parser": "svelte" } }]
}
```

<a href="https://youtu.be/y068wjb4XtI?feature=shared&t=11814" target="_blank">https://youtu.be/y068wjb4XtI?feature=shared&t=11814</a>

but we want to format the tailwindcss classes with eslint so we are going to to run prettier after eslint and in a pre commit hook

## 14.

<a href="https://youtu.be/y068wjb4XtI?feature=shared&t=11967" target="_blank">https://youtu.be/y068wjb4XtI?feature=shared&t=11967</a>

husky

for pre commit hooks

<a href="https://www.npmjs.com/package/husky" target="_blank">https://www.npmjs.com/package/husky</a>

`npm install husky --save-dev`

<a href="https://github.com/typicode/husky" target="_blank">https://github.com/typicode/husky</a>

<a href="https://typicode.github.io/husky/" target="_blank">https://typicode.github.io/husky/</a>

<a href="https://typicode.github.io/husky/getting-started.html#install" target="_blank">https://typicode.github.io/husky/getting-started.html#install</a>

`npx husky install`

`npm pkg set scripts.prepare="husky install"`

**package.json**

```json
	"scripts": {
		"prepack": "husky install",
```

`npx husky add .husky/pre-commit "npm run format && npm run eslint"`

<a href="https://youtu.be/y068wjb4XtI?feature=shared&t=12385" target="_blank">https://youtu.be/y068wjb4XtI?feature=shared&t=12385</a>

```bash
git commit -m "test husky pre-commit with f
ailed eslint"

> airbnb-eslint-prettier-sveltekit@0.0.1 format
> prettier --plugin-search-dir . --write .

[warn] Ignored unknown option --plugin-search-dir=..
[warn] Ignored unknown option { pluginSearchDirs: ["."] }.
.eslintrc.cjs 64ms
[warn] Ignored unknown option { pluginSearchDirs: ["."] }.
.prettierrc 24ms
[warn] Ignored unknown option { pluginSearchDirs: ["."] }.
.vscode/settings.json 4ms
[warn] Ignored unknown option { pluginSearchDirs: ["."] }.
package.json 2ms
[warn] Ignored unknown option { pluginSearchDirs: ["."] }.
README.md 141ms
[warn] Ignored unknown option { pluginSearchDirs: ["."] }.
src/app.d.ts 157ms
[warn] Ignored unknown option { pluginSearchDirs: ["."] }.
src/app.html 51ms
[warn] Ignored unknown option { pluginSearchDirs: ["."] }.
src/lib/index.ts 18ms
[warn] Ignored unknown option { pluginSearchDirs: ["."] }.
svelte.config.js 6ms
[warn] Ignored unknown option { pluginSearchDirs: ["."] }.
tsconfig.json 3ms
[warn] Ignored unknown option { pluginSearchDirs: ["."] }.
vite.config.ts 4ms

> airbnb-eslint-prettier-sveltekit@0.0.1 eslint
> eslint --ext .js,.cjs,.ts,.svelte . --fix


/airbnb-eslint-prettier-sveltekit/src/lib/index.ts
  4:10  error  'something' is defined but never used  @typescript-eslint/no-unused-vars

/airbnb-eslint-prettier-sveltekit/src/routes/+page.svelte
  14:2   error  Move function declaration to program root  no-inner-declarations
  14:11  error  'something' is defined but never used      @typescript-eslint/no-unused-vars

✖ 3 problems (3 errors, 0 warnings)

husky - pre-commit hook exited with code 1 (error)
```

it prevented to make a commit because there is a linter error

:rocket: :thumbsup:

**.prettierrc**

old

```json
{
	"useTabs": true,
	"singleQuote": true,
	"trailingComma": "es5",
	"semi": true,
	"printWidth": 100,
	"plugins": ["prettier-plugin-svelte"],
	"pluginSearchDirs": ["."],
	"overrides": [{ "files": "*.svelte", "options": { "parser": "svelte" } }]
}
```

new - remove `"plugins": ["prettier-plugin-svelte"],`

```json
{
	"useTabs": true,
	"singleQuote": true,
	"trailingComma": "es5",
	"semi": true,
	"printWidth": 100,
	"plugins": ["prettier-plugin-svelte"],
	"overrides": [{ "files": "*.svelte", "options": { "parser": "svelte" } }]
}
```

also

from

`"format": "prettier --plugin-search-dir . --write .",`

to

`"format": "prettier --write .",`
