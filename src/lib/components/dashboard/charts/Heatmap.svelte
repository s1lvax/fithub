<script lang="ts">
	import SvelteHeatmap from 'svelte-heatmap';

	let heatmapData = $state<{ date: Date; value: number }[]>([]);
	let isDarkMode = $state(false);

	// Fetch heatmap data from the API
	$effect(() => {
		const fetchHeatmapData = async () => {
			try {
				const response = await fetch('/api/logs/chart/heatmap');
				const data = await response.json();

				if (data.error) {
					console.error(data.error);
					return;
				}

				// Assign fetched data to reactive state
				heatmapData = data.heatmapData.map((entry: { date: string; value: number }) => ({
					date: new Date(entry.date),
					value: entry.value
				}));
			} catch (error) {
				console.error('Failed to fetch heatmap data:', error);
			}
		};

		fetchHeatmapData();

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
			? ['#1F2937', '#374151', '#4B5563', '#6B7280', '#9CA3AF'] // Dark mode colors
			: ['#F3F4F6', '#E5E7EB', '#D1D5DB', '#9CA3AF', '#6B7280']}
		emptyColor={isDarkMode ? '#111827' : '#F9FAFB'}
	/>
</div>
