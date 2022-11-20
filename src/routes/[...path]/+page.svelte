<script lang="ts">
	import type { PageServerData } from './$types';

	export let data: PageServerData;
</script>

{#if data.object?.__typename === 'Category'}
	<h1>{data.object.name}</h1>
{:else if data.object?.__typename === 'Page'}
	<h1>{data.object.name}</h1>
{:else if data.object?.__typename === 'Product'}
	<h1>{data.object.name}</h1>
{:else if data.object?.__typename === 'StartPage'}
	<h1>{data.object.name}</h1>
{/if}
