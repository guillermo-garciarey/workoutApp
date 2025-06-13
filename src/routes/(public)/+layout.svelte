<script>
	import '../../app.css';
	import { onMount } from 'svelte';
	import { loadUser } from '$stores/user';
	import { redirect } from '@sveltejs/kit';

	onMount(() => {
		loadUser();
	});

	// Redirect if logged in
	let { children } = $props();

	export async function load({ parent }) {
		const { session } = await parent();

		if (session) {
			throw redirect(302, '/home');
		}
	}
</script>

{@render children()}
