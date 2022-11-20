<script context="module" lang="ts">
	export type CategoryProduct = NonNullable<CategoryPageData['products']>['result'][number];
	export type Filters = NonNullable<CategoryPageData['products']>['filters'];
</script>

<script lang="ts">
	import FiltersComponent from './Filters/index.svelte';
	import type { CategoryPageData } from '../../routes/[...path]/+page.svelte';
	import ProductGrid from './ProductGrid.svelte';

	export let data: CategoryPageData;
</script>

<FiltersComponent filters={data.products?.filters} />
<ProductGrid products={data.products?.result || []} />
