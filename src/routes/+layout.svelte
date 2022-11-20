<script>
	import Header from '../components/Header.svelte';
	import '../app.css';
</script>

<Header />
<main class="container mx-auto px-2">
	<slot />
</main>
