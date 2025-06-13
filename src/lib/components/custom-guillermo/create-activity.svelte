<script>
	import { supabase } from '$lib/supabaseClient';
	import { user } from '$stores/user';
	import { goto } from '$app/navigation';
	import { Checkbox } from '$lib/components/ui/checkbox/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Button, buttonVariants } from '$lib/components/ui/button/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
	import * as Sheet from '$lib/components/ui/sheet/index.js';

	let activityName = '';
	let customMetric = '';
	let selectedMetrics = [];
	let error = '';
	let loading = false;

	const metricsList = ['Reps', 'Sets', 'Weight', 'Time', 'Distance', 'Speed', 'Steps'];

	function toggleMetric(metric, isChecked) {
		if (isChecked) {
			selectedMetrics = [...selectedMetrics, metric];
		} else {
			selectedMetrics = selectedMetrics.filter((m) => m !== metric);
		}
	}

	async function submitActivity() {
		error = '';
		const trimmedName = activityName.trim();
		const allMetrics = [...selectedMetrics, customMetric.trim()].filter(Boolean);

		if (!trimmedName || allMetrics.length === 0) {
			error = 'Please enter a name and select at least one metric.';
			return;
		}

		loading = true;

		const { error: rpcError } = await supabase.rpc('create_activity_with_metrics', {
			activity_name: trimmedName,
			user_id: $user.id,
			metric_names: allMetrics
		});

		if (rpcError) {
			console.error('RPC error:', rpcError);
			error = 'Failed to create activity.';
			loading = false;
			return;
		}

		goto('/home');
	}
</script>

<div>
	<Sheet.Root>
		<Sheet.Trigger class={buttonVariants({ variant: 'outline' })}>Create Activity</Sheet.Trigger>
		<Sheet.Content side="right">
			<Sheet.Header>
				<Sheet.Title>Create Activity</Sheet.Title>
				<Sheet.Description>Select metrics and name your activity.</Sheet.Description>
			</Sheet.Header>

			<div class="grid gap-6 px-4">
				<!-- Activity Name -->
				<div class="grid gap-3">
					<Label for="activityName">Name</Label>
					<Input id="activityName" bind:value={activityName} />
				</div>

				<!-- Predefined Metrics -->
				<div class="grid gap-3">
					<Label>Metrics</Label>
					{#each metricsList as metric}
						<!-- <div class="flex items-center gap-3">
						<input type="checkbox" value={metric} onchange={toggleMetric} id={metric} />
						<Label for={metric}>{metric}</Label>
					</div> -->
						<div class="flex items-center gap-3">
							<Checkbox
								checked={selectedMetrics.includes(metric)}
								value={metric}
								onCheckedChange={(v) => toggleMetric(metric, v)}
								id={metric}
							/>
							<Label for={metric}>{metric}</Label>
						</div>
					{/each}
				</div>

				<!-- Custom Metric -->
				<div class="grid gap-3">
					<Label for="customMetric">Custom Metric</Label>
					<Input id="customMetric" bind:value={customMetric} />
				</div>

				<!-- Error Message -->
				{#if error}
					<p class="text-sm text-red-500">{error}</p>
				{/if}
			</div>

			<Sheet.Footer>
				<Button onclick={submitActivity} disabled={loading}>
					{loading ? 'Saving...' : 'Save Activity'}
				</Button>
			</Sheet.Footer>
		</Sheet.Content>
	</Sheet.Root>
</div>
