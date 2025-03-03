<script lang="ts">
	import SvelteHeatmap from 'svelte-heatmap';

	let heatmapData = $state<{ date: Date; value: number }[]>([]);
	let isDarkMode = $state(false);

	// Generate mock data for heatmap (last 12 months)
	$effect(() => {
		const startDate = new Date();
		startDate.setFullYear(startDate.getFullYear() - 1);

		const data = [];
		for (let d = new Date(startDate); d <= new Date(); d.setDate(d.getDate() + 1)) {
			data.push({
				date: new Date(d),
				value: Math.floor(Math.random() * 10) // Random intensity (0-10)
			});
		}

		// Assign to reactive state
		heatmapData = data;

		// Detect dark mode
		isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
	});
</script>

<h1 class="text-md pl-4 font-semibold">Log Heatmap</h1>
<div class="rounded-lg bg-white p-4 shadow-lg dark:bg-black">
	<SvelteHeatmap
		data={heatmapData}
		startDate={new Date(new Date().getFullYear() - 1, 0, 1)}
		endDate={new Date()}
		view="yearly"
		cellSize={14}
		cellGap={2}
		cellRadius={3}
		fontColor={isDarkMode ? '#F3F4F6' : '#1F2937'}
		fontFamily="sans-serif"
		fontSize={10}
		dayLabels={['', 'Mon', '', 'Wed', '', 'Fri', '']}
		monthLabels={[
			'Jan',
			'Feb',
			'Mar',
			'Apr',
			'May',
			'Jun',
			'Jul',
			'Aug',
			'Sep',
			'Oct',
			'Nov',
			'Dec'
		]}
		colors={isDarkMode
			? ['#F9FAFB', '#E5E7EB', '#D1D5DB', '#9CA3AF', '#6B7280']
			: ['#111827', '#1F2937', '#374151', '#4B5563', '#6B7280']}
		emptyColor={isDarkMode ? '#1F2937' : '#F3F4F6'}
	/>
</div>
