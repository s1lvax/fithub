<script lang="ts">
	import { goto } from '$app/navigation';

	export let data: {
		logs: { id: string; createdAt: Date; weight: number; bodyFat: number | null }[];
		name: string;
	};

	const getLogDescription = (log: { weight: number; bodyFat: number | null }): string => {
		if (log.weight !== null && log.bodyFat !== null) {
			return 'Weight + Bodyfat';
		} else if (log.weight !== null) {
			return 'Weight';
		}
		return 'Unknown Log';
	};

	// Function to navigate back
	const goBack = () => {
		goto('/dashboard');
	};
</script>

<div class="flex min-h-screen items-center justify-center p-4">
	<div
		class="w-full max-w-2xl rounded-lg border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-black"
	>
		<div class="p-6">
			<!-- Header with Go Back button -->
			<div class="mb-6 flex items-center justify-between">
				<h2 class="text-xl font-semibold text-gray-900 dark:text-gray-100">All Logs</h2>
				<button
					on:click={goBack}
					class="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 shadow-xs ring-gray-300 ring-inset hover:cursor-pointer dark:bg-black dark:text-gray-100 dark:ring-gray-600"
				>
					Go Back
				</button>
			</div>

			<!-- Logs List -->
			<div class="flow-root">
				<ul role="list" class="-my-5 divide-y divide-gray-200 dark:divide-gray-700">
					{#if data.logs.length === 0}
						<li class="py-4 text-center text-gray-500 dark:text-gray-400">No logs found.</li>
					{:else}
						{#each data.logs as log}
							<li class="py-4">
								<div class="flex items-center space-x-4">
									<!-- Profile Icon -->
									<div class="shrink-0">
										<div
											class="flex h-10 w-10 items-center justify-center rounded-full bg-gray-200 dark:bg-gray-700"
										>
											<span class="text-sm font-medium text-gray-900 dark:text-gray-100">
												{data.name[0]}
											</span>
										</div>
									</div>

									<!-- Log Details -->
									<div class="min-w-0 flex-1">
										<p class="truncate text-sm font-medium text-gray-900 dark:text-gray-100">
											{new Date(log.createdAt).toLocaleDateString()}
										</p>
										<p class="truncate text-sm text-gray-500 dark:text-gray-400">
											{getLogDescription(log)}
										</p>
									</div>

									<!-- View Button -->
									<div>
										<a
											href={`/dashboard/log/${log.id}`}
											class="inline-flex items-center rounded-full bg-white px-2.5 py-1 text-xs font-semibold text-gray-900 ring-1 shadow-xs ring-gray-300 ring-inset dark:bg-black dark:text-gray-100 dark:ring-gray-600"
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
		</div>
	</div>
</div>
