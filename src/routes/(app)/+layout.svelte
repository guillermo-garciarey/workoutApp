<script>
	import '../../app.css';
	import { onMount } from 'svelte';
	import { loadUser } from '$stores/user';
	import AppSidebar from '$lib/components/app-sidebar.svelte';
	import * as Breadcrumb from '$lib/components/ui/breadcrumb/index.js';
	import { Separator } from '$lib/components/ui/separator/index.js';
	import * as Sidebar from '$lib/components/ui/sidebar/index.js';

	import { supabase } from '$lib/supabaseClient';
	import { goto } from '$app/navigation';
	import { user } from '$stores/user';

	import { page } from '$app/stores';
	import { derived } from 'svelte/store';

	const pathSegments = derived(page, ($page) =>
		$page.url.pathname
			.replace(/^\/app\/?/, '') // strip /app
			.split('/')
			.filter(Boolean)
	);

	const formatSegment = (segment) =>
		segment
			.replace(/[-_]/g, ' ') // replace dashes/underscores
			.split(' ')
			.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
			.join(' ');

	onMount(() => {
		loadUser();
	});

	let { children } = $props();
</script>

<Sidebar.Provider>
	<AppSidebar />
	<Sidebar.Inset>
		<header
			class="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12"
		>
			<div class="flex items-center gap-2 px-4">
				<Sidebar.Trigger class="-ml-1" />
				<Separator orientation="vertical" class="mr-2 data-[orientation=vertical]:h-4" />
				<Breadcrumb.Root>
					<Breadcrumb.List>
						{#if pathSegments.length > 0}
							<Breadcrumb.Item>
								<Breadcrumb.Link href="/app/home">Home</Breadcrumb.Link>
							</Breadcrumb.Item>
							{#each pathSegments as segment, i}
								<Breadcrumb.Separator />
								<Breadcrumb.Item>
									{#if i < pathSegments.length - 1}
										<Breadcrumb.Link href={'/app/' + pathSegments.slice(0, i + 1).join('/')}>
											{formatSegment(segment)}
										</Breadcrumb.Link>
									{:else}
										<Breadcrumb.Page>{formatSegment(segment)}</Breadcrumb.Page>
									{/if}
								</Breadcrumb.Item>
							{/each}
						{:else}
							<Breadcrumb.Item>
								<Breadcrumb.Page>Home</Breadcrumb.Page>
							</Breadcrumb.Item>
						{/if}
					</Breadcrumb.List>
				</Breadcrumb.Root>
			</div>
		</header>

		{@render children()}
	</Sidebar.Inset>
</Sidebar.Provider>
