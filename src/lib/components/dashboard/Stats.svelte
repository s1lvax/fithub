<script lang="ts">
	import ChartWeight from '$lib/components/dashboard/charts/ChartWeight.svelte';
	import ChartBodyFat from '$lib/components/dashboard/charts/ChartBodyFat.svelte';
	import Heatmap from '$lib/components/dashboard/charts/Heatmap.svelte';
</script>

<section aria-labelledby="quick-links-title">
	<div
		class="divide-y divide-gray-300 overflow-hidden rounded-lg border border-gray-300 shadow-sm
			sm:grid sm:grid-cols-2 sm:gap-px sm:divide-y-0 dark:divide-gray-600 dark:border-gray-600 dark:bg-black"
	>
		<h2 class="sr-only" id="quick-links-title">Charts</h2>

		<!-- First two charts side by side -->
		<div class="group relative bg-white p-2 dark:bg-black">
			<ChartWeight />
		</div>
		<div class="group relative bg-white p-2 dark:bg-black">
			<ChartBodyFat />
		</div>

		<!-- Timeline takes full width -->
		<div class="group relative mt-4 bg-white p-2 sm:col-span-2 dark:bg-black">
			<Heatmap />
		</div>
	</div>
</section>
