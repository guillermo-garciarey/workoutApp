<script>
	import GalleryVerticalEndIcon from '@lucide/svelte/icons/gallery-vertical-end';
	import SignupForm from '$lib/components/signup-form.svelte';
	// import { onMount } from 'svelte';
	// import { supabase } from '$lib/supabaseClient';
	// import { goto } from '$app/navigation';
</script>

<div class="grid min-h-svh lg:grid-cols-2">
	<div class="flex flex-col gap-4 p-6 md:p-10">
		<div class="flex justify-center gap-2 md:justify-start">
			<a href="##" class="flex items-center gap-2 font-medium">
				<div
					class="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md"
				>
					<GalleryVerticalEndIcon class="size-4" />
				</div>
				Placeholder App Name
			</a>
		</div>
		<div class="flex flex-1 items-center justify-center">
			<div class="w-full max-w-xs">
				<SignupForm />
			</div>
		</div>
	</div>
	<div class="bg-muted relative hidden lg:block">
		<img
			src="/my-app-login.webp"
			alt="placeholder"
			class="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
		/>
	</div>
</div>
