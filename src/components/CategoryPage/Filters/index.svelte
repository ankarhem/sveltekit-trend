<script lang="ts">
	import { page } from '$app/stores';
	import { getActiveFilters, type Filters } from '$lib/filters';

	export let filters: Filters;
	const activeFilters = getActiveFilters($page.url, filters);
</script>

<div class="flex flex-col gap-8 px-4 lg:flex-row">
	<div class="grid flex-wrap flex-1 grid-cols-2 gap-6 sm:grid-cols-3 md:flex">
		<!-- <ListFilters
      listFilters={listFilters}
      getActiveFilterValues={getActiveFilterValues}
      toggleFilterPath={toggleFilterPath}
    /> -->
		<!-- <RangeFilters
      rangeFilters={rangeFilters}
      getActiveFilterValue={getActiveFilterValue}
      toggleFilterPath={toggleFilterPath}
    /> -->
	</div>
	<div class="flex flex-col gap-2.5 min-w-[200px] items-end self-end lg:self-start">
		<!-- <BooleanFilters
      booleanFilters={booleanFilters}
      getActiveFilterValue={getActiveFilterValue}
      toggleFilterPath={toggleFilterPath}
    /> -->
	</div>
</div>
<div class="flex flex-wrap gap-4 mt-6">
	<!-- {activeFilters.map((activeFilter) => {
    return (
      <a
        key={`${activeFilter.id}-${activeFilter.value}`}
        class='flex items-center px-4 py-2 text-sm font-medium bg-blue-400 rounded text-blue-50 ring-1'
        href={toggleFilterPath(activeFilter.type, activeFilter)}
      >
        <span class='mr-2 text-xs'>{activeFilter.name}: </span>
        <span class='font-bold max-w-[10ch] sm:max-w-[20ch] truncate'>{activeFilter.text}</span>
        <Cross class='inline w-5 h-5 ml-2' />
      </a>
    );
  })} -->
	{#each activeFilters as activeFilter}
		{#if activeFilter}
			<a
				href={'#'}
				class="flex flex-col items-center px-4 py-2 bg-base-200 hover:bg-base-300 text-sm rounded"
			>
				<span>{activeFilter.name}</span>
				<span class="font-semibold">{activeFilter.text}</span>
			</a>
		{/if}
	{/each}
</div>
