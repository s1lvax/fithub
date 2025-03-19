<script lang="ts">
	import RecentLogsProfileIcon from '$lib/components/dashboard/RecentLogsProfileIcon.svelte';
	import type { DailyLog } from '@prisma/client';

	let name: string = $state(''); // Dynamically fetched name
	let recentLogs: DailyLog[] = $state([]);
	let loading: boolean = $state(true); // Track loading state

	const fetchRecentLogs = async () => {
		try {
			const response = await fetch('/api/logs/latest');
			const result = await response.json();

			if (result.logs) {
				recentLogs = result.logs as DailyLog[];
			}

			if (result.name) {
				name = result.name;
			}
		} catch (error) {
			console.error('Error fetching logs:', error);
		} finally {
			loading = false; // Set loading to false after fetching
		}
	};

	$effect(() => {
		fetchRecentLogs();
	});

	const getLogDescription = (log: DailyLog): string => {
		if (log.weight !== null && log.bodyFat !== null) {
			return 'Weight + Bodyfat';
		} else if (log.weight !== null) {
			return 'Weight';
		}
		return 'Unknown Log';
	};
</script>

<section aria-labelledby="recent-hires-title">
	<div
		class="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-black"
	>
		<div class="p-6">
			<h2 class="text-base font-medium text-gray-900 dark:text-gray-100" id="recent-hires-title">
				Recent Logs
			</h2>
			<div class="mt-6 flow-root">
				<ul role="list" class="-my-5 divide-y divide-gray-200 dark:divide-gray-700">
					{#if loading}
						{#each { length: 2 } as _, i}
							<li class="py-4">
								<div class="flex items-center space-x-4">
									<div class="shrink-0">
										<div
											class="h-10 w-10 animate-pulse rounded-full bg-gray-200 dark:bg-gray-700"
										></div>
									</div>
									<div class="min-w-0 flex-1">
										<div class="h-4 w-3/4 animate-pulse rounded bg-gray-200 dark:bg-gray-700"></div>
										<div
											class="mt-2 h-3 w-1/2 animate-pulse rounded bg-gray-200 dark:bg-gray-700"
										></div>
									</div>
								</div>
							</li>
						{/each}
					{:else}
						{#each recentLogs as log}
							<li class="py-4">
								<div class="flex items-center space-x-4">
									<div class="shrink-0">
										<RecentLogsProfileIcon {name} />
									</div>
									<div class="min-w-0 flex-1">
										<p class="truncate text-sm font-medium text-gray-900 dark:text-gray-100">
											{new Date(log.createdAt).toLocaleDateString()}
										</p>
										<p class="truncate text-sm text-gray-500 dark:text-gray-400">
											{getLogDescription(log)}
										</p>
									</div>
									<div>
										<a
											href={`/dashboard/log/${log.id}`}
											class="inline-flex items-center rounded-full bg-white px-2.5 py-1 text-xs font-semibold text-gray-900 ring-1 shadow-xs ring-gray-300 ring-inset hover:bg-gray-50 dark:bg-black dark:text-gray-100 dark:ring-gray-600 dark:hover:bg-gray-800"
										>
											View
										</a>
									</div>
								</div>
							</li>
						{/each}
					{/if}
				</ul>
			</div>
			<div class="mt-6">
				<a
					href="/dashboard/log"
					class="flex w-full items-center justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 shadow-xs ring-gray-300 ring-inset dark:bg-black dark:text-gray-100 dark:ring-gray-600"
				>
					View all
				</a>
			</div>
		</div>
	</div>
</section>
