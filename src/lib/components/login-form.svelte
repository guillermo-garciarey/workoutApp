<script>
	import { Label } from '$lib/components/ui/label/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import { supabase } from '$lib/supabaseClient.js';
	import { goto } from '$app/navigation';

	let email = '';
	let password = '';
	let errorMessage = '';

	async function handleLogin(event) {
		event.preventDefault();

		const { error } = await supabase.auth.signInWithPassword({
			email,
			password
		});

		if (error) {
			errorMessage = error.message;
		} else {
			goto('/');
		}
	}
</script>

<form on:submit|preventDefault={handleLogin} class="flex flex-col gap-6">
	<div class="flex flex-col items-center gap-2 text-center">
		<h1 class="text-2xl font-bold">Login to your account</h1>
		<p class="text-muted-foreground text-sm">Enter your email below to login</p>
	</div>

	{#if errorMessage}
		<p class="text-center text-sm text-red-500">{errorMessage}</p>
	{/if}

	<div class="grid gap-6">
		<div class="grid gap-3">
			<Label for="email">Email</Label>
			<Input id="email" type="email" required placeholder="you@example.com" bind:value={email} />
		</div>

		<div class="grid gap-3">
			<Label for="password">Password</Label>
			<Input id="password" type="password" required bind:value={password} />
		</div>

		<Button type="submit" class="w-full">Login</Button>
	</div>

	<div class="text-center text-sm">
		Don’t have an account?
		<a href="/signup" class=" text-primary underline">Sign up</a>
	</div>
</form>
