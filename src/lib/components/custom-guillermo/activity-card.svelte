<script>
	export let activity; // expects { name: 'Bench Press', metrics: ['Reps', 'Weight'] }
</script>

<!-- <div class="hover:bg-muted/40 rounded-lg border p-4 shadow-sm">
	
</div> -->

<div class="flex h-[400px] w-[300px] flex-shrink-0 flex-col gap-2">
	<div class="bg-muted-foreground flex h-11/12 w-full items-center justify-center rounded-xl">
		<span
			class=" text-accent-foreground border-accent-foreground flex h-24 w-24 items-center justify-center rounded-full border text-3xl"
		>
			{activity.name.charAt(0).toUpperCase()}
		</span>
	</div>
	<div class=" flex flex-col justify-start px-1">
		<h2 class=" text-accent-foreground">{activity.name}</h2>
		<div class=" text-muted-foreground flex flex-wrap gap-2 text-sm">
			{#each activity.metrics as metric}
				<!-- <span class="bg-accent rounded px-2 py-1">{metric}</span> -->
				<span>{metric}</span>
			{/each}
		</div>
	</div>
</div>
