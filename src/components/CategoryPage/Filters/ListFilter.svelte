<script lang="ts">
	import { enhance } from '$app/forms';
	import { page } from '$app/stores';
	import {
		Listbox,
		ListboxLabel,
		ListboxButton,
		ListboxOptions,
		ListboxOption
	} from '@rgossiaux/svelte-headlessui';
	import type { ListFilter } from '../../../graphql-operations';
	export let filter: ListFilter;

	let formEl: HTMLFormElement;
</script>

<form method="POST" action="/resources/filters" bind:this={formEl} use:enhance>
	<input type="hidden" name="_fromUrl" value={`${$page.url.pathname}${$page.url.search}`} />
	<input type="hidden" name="_filterKey" value={`${filter.__typename}_${filter.id}`} />
	<Listbox
		multiple
		on:change={(e) => {
			const formData = new FormData(formEl);
			formData.append('_filterValue', e.detail);
		}}
	>
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
							`flex w-full items-center justify-between px-4 py-2 text-sm ${
								active ? 'bg-base-100' : ''
							}`}
						value={option.value}
						let:selected
						as="button"
						type="submit"
					>
						<span class="text-left">{option.text}</span>
						{#if selected}
							<span class="text-primary">✓</span>
						{:else}
							<span>{option.resultCount}</span>
						{/if}
						<!-- <button
							type="submit"
							name={'_filterValue'}
							value={option.value}
							class="pointer-events-auto"
						>
						</button> -->
					</ListboxOption>
				{/if}
			{/each}
		</ListboxOptions>
	</Listbox>
</form>
