<script lang="ts">
	import { page } from '$app/stores';
</script>

<div class="flex py-20 max-w-2xl sm:mx-auto flex-col items-center justify-center fit">
	<h1 class="text-4xl font-bold">{$page.status}</h1>
	<div>{$page.error?.message}</div>
</div>
