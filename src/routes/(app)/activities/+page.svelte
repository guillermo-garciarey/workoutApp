<script>
	import ActivityList from '$lib/components/custom-guillermo/activity-group.svelte';
	import CreateActivity from '$lib/components/custom-guillermo/create-activity.svelte';
</script>

<div class=" flex flex-1 flex-col p-4">
	<h2>Activity Library</h2>
	<!-- <div class=" flex flex-1 flex-col gap-8 overflow-x-hidden rounded-xl px-4 md:min-h-min">
		<ActivityList />
		<CreateActivity />
	</div> -->
	<div
		class=" flex min-h-[100vh] flex-1 flex-col gap-8 overflow-x-hidden rounded-xl px-4 md:min-h-min"
	>
		<ActivityList />
		<CreateActivity />
	</div>
</div>
