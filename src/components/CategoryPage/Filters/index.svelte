<script lang="ts">
	import { page } from '$app/stores';
	import { getActiveFilters, toggleFilterPath, type Filters } from '$lib/filters';
	import type { BooleanFilter, ListFilter, NumericRangeFilter } from '../../../graphql-operations';
	import ListFilterComponent from './ListFilter.svelte';

	export let filters: Filters;
	$: activeFilters = getActiveFilters($page.url, filters);

	const listFilters: ListFilter[] = [];
	const rangeFilters: NumericRangeFilter[] = [];
	const booleanFilters: BooleanFilter[] = [];

	filters?.forEach((filter) => {
		switch (filter?.__typename) {
			case 'ListFilter':
				listFilters.push(filter);
				break;
			case 'NumericRangeFilter':
				rangeFilters.push(filter);
				break;
			case 'BooleanFilter':
				booleanFilters.push(filter);
				break;
		}
	});
</script>

<div class="flex items-center gap-4 mt-8">
	{#each listFilters as filter}
		<ListFilterComponent {filter} />
	{/each}
</div>

<div class="flex flex-wrap gap-4 mt-6">
	{#each activeFilters as activeFilter}
		{#if activeFilter}
			<a
				href={toggleFilterPath($page.url, activeFilter.type, activeFilter.id, activeFilter.value)}
				class="flex flex-col items-center px-4 py-2 bg-base-200 hover:bg-base-300 text-sm rounded"
			>
				<span>{activeFilter.name}</span>
				<span class="font-semibold">{activeFilter.text}</span>
			</a>
		{/if}
	{/each}
</div>
