<script>
	import { Label } from '$lib/components/ui/label/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import { supabase } from '$lib/supabaseClient';
	import { goto } from '$app/navigation';

	let email = '';
	let password = '';
	let error = '';
	let success = '';

	async function handleSignup(event) {
		event.preventDefault();

		const { data, error: signUpError } = await supabase.auth.signUp({
			email: email,
			password: password
		});

		if (signUpError) {
			error = signUpError.message;
			success = '';
			return;
		}

		const userId = data.user?.id;

		if (userId) {
			await supabase.from('profiles').insert({
				id: userId,
				username: email // or null for now
			});
		}

		success = 'Account created! Redirecting to login...';
		error = '';

		setTimeout(() => {
			goto('/login');
		}, 1000); // short delay so user sees the message
	}
</script>

<form class="flex flex-col gap-6" on:submit={handleSignup}>
	<div class="flex flex-col items-center gap-2 text-center">
		<h1 class="text-2xl font-bold">Create an account</h1>
		<p class="text-muted-foreground text-sm">Enter your email below to create your account</p>
	</div>

	<div class="grid gap-6">
		<div class="grid gap-3">
			<Label for="email">Email</Label>
			<Input id="email" type="email" placeholder="m@example.com" required bind:value={email} />
		</div>

		<div class="grid gap-3">
			<Label for="password">Password</Label>
			<Input id="password" type="password" required bind:value={password} />
		</div>

		{#if error}
			<p class="text-sm text-red-500">{error}</p>
		{/if}
		{#if success}
			<p class="text-sm text-green-500">{success}</p>
		{/if}

		<Button type="submit" class="w-full">Sign Up</Button>
	</div>

	<div class="text-center text-sm">
		Already have an account?
		<a href="/login" class="text-primary underline">Log in</a>
	</div>
</form>
