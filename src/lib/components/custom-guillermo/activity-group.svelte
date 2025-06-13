<script>
	import { supabase } from '$lib/supabaseClient';
	import { user } from '$stores/user';
	import ActivityCard from '$lib/components/custom-guillermo/activity-card.svelte'; // adjust path as needed

	let activities = [];

	$: if ($user) {
		console.log('✅ $user loaded:', $user);
		loadActivities();
	} else {
		console.warn('⛔ $user is not yet loaded');
	}

	async function loadActivities() {
		const { data, error } = await supabase
			.from('activity_metrics')
			.select(
				`
				activity_id,
				activities (name),
				metrics (name)
			`
			)
			.eq('user_id', $user.id);

		if (error) {
			console.error('❌ Supabase error:', error);
		} else {
			console.log('📦 Activities data:', data);
		}

		const grouped = data.reduce((acc, row) => {
			const name = row.activities.name;
			if (!acc[name]) acc[name] = [];
			acc[name].push(row.metrics.name);
			return acc;
		}, {});

		activities = Object.entries(grouped).map(([name, metrics]) => ({
			name,
			metrics
		}));
	}
</script>

{#if activities.length > 0}
	<div class="flex gap-2 overflow-x-scroll py-4">
		{#each activities as activity}
			<ActivityCard {activity} />
		{/each}
	</div>
{:else}
	<p class="text-muted-foreground">No activities found yet.</p>
{/if}
