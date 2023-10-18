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
		'prettier'
	],
	parser: '@typescript-eslint/parser',
	plugins: ['@typescript-eslint'],
	parserOptions: {
		sourceType: 'module',
		ecmaVersion: 2020,
		extraFileExtensions: ['.svelte']
	},
	env: {
		browser: true,
		es2017: true,
		node: true
	},
	overrides: [
		{
			files: ['*.svelte'],
			parser: 'svelte-eslint-parser',
			parserOptions: {
				parser: '@typescript-eslint/parser'
			}
		}
	]
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
