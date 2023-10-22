<script lang="ts">
	// Unable to resolve path to module '$lib/index'.eslint import/no-unresolved
	import { time } from '$lib/index';
	// console.log(time);

	// https://youtu.be/y068wjb4XtI?feature=shared&t=9281
	import { enhance } from '$app/forms';

	import type { PageData } from './$types';

	export let data: PageData;

	// this should be marked by eslint
	function something() {
		return 42;
	}

	// eslint now turns this
	// [1, 2, 3].reduce((sum, value) => { return value + sum });
	// [1, 2, 3].reduce((sum, value) => {
	// 	return value + sum;
	// });

	// into this, and it works, nice
	[1, 2, 3].reduce((sum, value) => value + sum);
</script>

{#if Object.keys(data).length !== 0}
	<pre>{JSON.stringify(data, null, 2)}</pre>
{/if}

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>

{time}

<!-- https://youtu.be/y068wjb4XtI?feature=shared&t=9281 -->
<form action="POST" use:enhance></form>
