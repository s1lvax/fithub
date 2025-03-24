<script lang="ts">
	import { page } from '$app/state';
	import { formatDate } from '$lib/utils/general/formatDate';
	import type { DailyLog } from '@prisma/client';

	let log = $state<DailyLog | null>(null);
	let loading = $state(true);
	let weightDiff = $state<string | null>(null);
	let bodyFatDiff = $state<string | null>(null);

	const logId = page.params.logId;

	const getDiffLabel = (diff: string | null) => {
		if (!diff) return 'N/A';
		const diffValue = parseFloat(diff);
		return diffValue > 0 ? `+${diff}%` : `${diff}%`;
	};

	$effect(() => {
		(async () => {
			try {
				const res = await fetch(`/api/logs/fetchDifferenceStats?id=${logId}`);
				if (res.ok) {
					const data = await res.json();
					log = data.log;
					weightDiff = data.weightDiff;
					bodyFatDiff = data.bodyFatDiff;
				} else {
					console.error('Failed to fetch log and differences');
				}
			} catch (error) {
				console.error('Error fetching log and differences:', error);
			} finally {
				loading = false;
			}
		})();
	});
</script>

{#if loading}
	<div class="h-64 w-full animate-pulse rounded-lg bg-gray-200 dark:bg-gray-700"></div>
{:else if log}
	<div class="bg-white py-12 sm:py-16 dark:bg-black">
		<div class="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
			<!-- Back Button -->
			<div class="mb-8">
				<a
					href="/dashboard"
					class="inline-flex items-center rounded-lg border border-gray-200 bg-white p-6 px-4 py-2 text-sm font-medium text-gray-900 shadow-sm transition dark:border-gray-700 dark:bg-black dark:text-white"
				>
					← Back to Dashboard
				</a>
			</div>

			<div class="space-y-8">
				<!-- Image Section -->
				<div class="overflow-hidden rounded-lg">
					{#if log.pic}
						<!-- svelte-ignore a11y_img_redundant_alt -->
						<img
							class="h-auto w-full object-contain"
							src={`http://localhost:4000/${log.pic}`}
							alt="Log image"
							style="max-height: 500px;"
						/>
					{:else}
						<div
							class="flex h-64 items-center justify-center bg-gray-100 text-gray-400 dark:bg-gray-900"
						>
							<span class="text-lg font-medium">No Image Available</span>
						</div>
					{/if}
				</div>

				<!-- Stats Section -->
				<div class="space-y-6 text-center">
					<h1 class="text-3xl font-bold text-gray-900 dark:text-white">
						{formatDate(log?.createdAt)}
					</h1>
					<div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
						<!-- Weight Stat -->
						<div
							class="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-black"
						>
							<div class="flex items-center justify-center space-x-2">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									class="h-6 w-6 text-gray-500 dark:text-gray-400"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"
									/>
								</svg>
								<dt class="text-sm font-medium text-gray-500 dark:text-gray-400">Weight</dt>
							</div>
							<dd class="mt-2 text-2xl font-bold text-gray-900 dark:text-white">
								{log.weight} kg/lbs
							</dd>
							<span class="mt-1 block text-sm text-gray-500 dark:text-gray-400">
								{getDiffLabel(weightDiff)} from current
							</span>
						</div>
						<!-- Body Fat Stat -->
						<div
							class="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-black"
						>
							<div class="flex items-center justify-center space-x-2">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									class="h-6 w-6 text-gray-500 dark:text-gray-400"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
									/>
								</svg>
								<dt class="text-sm font-medium text-gray-500 dark:text-gray-400">Body Fat</dt>
							</div>
							<dd class="mt-2 text-2xl font-bold text-gray-900 dark:text-white">
								{log.bodyFat ? log.bodyFat + '%' : 'N/A'}
							</dd>
							<span class="mt-1 block text-sm text-gray-500 dark:text-gray-400">
								{getDiffLabel(bodyFatDiff)} from current
							</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
{/if}
