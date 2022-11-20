<script lang="ts">
	import { page } from '$app/stores';
	import { getActiveFilters, toggleFilterPath, type Filters } from '$lib/filters';
	import type { BooleanFilter, ListFilter, NumericRangeFilter } from '../../../graphql-operations';
	import {
		Listbox,
		ListboxLabel,
		ListboxButton,
		ListboxOptions,
		ListboxOption
	} from '@rgossiaux/svelte-headlessui';
	import { goto } from '$app/navigation';

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

	const handleChangeListFilter = (filter: ListFilter, event: CustomEvent) => {
		const path = toggleFilterPath($page.url, filter.__typename!, filter.id, event.detail);
		goto(path);
	};
</script>

<div class="flex items-center gap-4 mt-8">
	{#each listFilters as filter}
		<Listbox multiple on:change={(event) => handleChangeListFilter(filter, event)}>
			<ListboxLabel class="sr-only">
				{filter.name} filter
			</ListboxLabel>
			<ListboxButton
				class="flex items-center w-56 justify-between rounded border border-black/10 bg-white py-2 px-2 text-sm"
			>
				{filter.name}
			</ListboxButton>
			<ListboxOptions
				class="absolute z-50 mt-1 w-56 max-h-60 overflow-auto rounded-md bg-white text-base shadow-lg"
			>
				{#each filter.items as option}
					{#if option}
						<ListboxOption
							class={({ active }) =>
								`flex items-center justify-between px-4 py-2 ${active ? 'bg-base-100' : ''}`}
							value={option.value}
							let:selected
							as="a"
							href={toggleFilterPath($page.url, filter.__typename || '', filter.id, option.value)}
						>
							<span>{option.text}</span>
							{#if selected}
								<span class="text-primary">✓</span>
							{:else}
								<span>{option.resultCount}</span>
							{/if}
						</ListboxOption>
					{/if}
				{/each}
			</ListboxOptions>
		</Listbox>
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
