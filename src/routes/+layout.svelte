<script context="module" lang="ts">
	export type Categories = LayoutData['categories'];
</script>

<script lang="ts">
	import '../app.css';
	import Header from '../components/Header.svelte';
	import type { LayoutData } from './$types';

	export let data: LayoutData;
</script>

<Header categories={data.categories} />
<main class="container mx-auto px-2">
	<slot />
</main>
