<script context="module" lang="ts">
	export type StartPageData = Extract<PageServerData['object'], { __typename: 'StartPage' }>;
	export type CategoryPageData = Extract<PageServerData['object'], { __typename: 'Category' }>;
	export type ProductPageData = Extract<PageServerData['object'], { __typename: 'Product' }>;
	export type ContentPageData = Extract<PageServerData['object'], { __typename: 'Page' }>;
</script>

<script lang="ts">
	import CategoryPage from '../../components/CategoryPage/index.svelte';
	import type { PageServerData } from './$types';

	export let data: PageServerData;
</script>

{#if data.object?.__typename === 'StartPage'}
	<h1>{data.object.name}</h1>
{:else if data.object?.__typename === 'Category'}
	<CategoryPage data={data.object} />
{:else if data.object?.__typename === 'Product'}
	<h1>{data.object.name}</h1>
{:else if data.object?.__typename === 'Page'}
	<h1>{data.object.name}</h1>
{/if}
