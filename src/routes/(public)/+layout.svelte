<script>
	import '../../app.css';
	import { onMount } from 'svelte';
	import { loadUser } from '$stores/user';

	onMount(() => {
		loadUser();
	});

	let { children } = $props();
</script>

{@render children()}
