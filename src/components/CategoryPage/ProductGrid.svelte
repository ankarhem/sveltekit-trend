<script lang="ts">
	import type { CategoryProduct } from './index.svelte';

	export let products: CategoryProduct[];
</script>

<ul class="my-7 grid grid-cols-2 content-center gap-x-4 gap-y-8 md:grid-cols-3 lg:grid-cols-4">
	{#each products || [] as product}
		{#if product}
			<li class="flex flex-col rounded-md overflow-hidden bg-white shadow-md">
				<a class="block" href={product.primaryRoute?.path}>
					<img
						src={product.images?.[0]?.url}
						alt={product.name}
						class="object-contain w-full h-48 sm:h-64 py-4"
					/>
					<section class="mb-2 mt-2 flex justify-between px-2">
						<header>
							<h3 class="text-sm font-semibold">{product.name}</h3>
							<h4 class="text-xs">{product.subName}</h4>
						</header>
						<div class="price flex flex-col items-end text-sm">
							<span class="current font-semibold">{product.price?.incVat}</span>
							<span class="line-through">{product.previousPrice?.incVat}</span>
						</div>
					</section>
				</a>
				<a
					href={product.primaryRoute?.path}
					class="mt-auto block w-full cursor-pointer border-0 bg-primary py-3 px-4 text-center text-sm text-primary-content hover:bg-primary-focus"
				>
					Köp omedel bums
				</a>
			</li>
		{/if}
	{/each}
</ul>
