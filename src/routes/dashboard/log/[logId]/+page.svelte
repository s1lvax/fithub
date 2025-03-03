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
		return diffValue > 0 ? `+${diff}% more from current log` : `${diff}% less from current log`;
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
	<div class="h-64 w-full animate-pulse rounded-3xl bg-gray-200 dark:bg-gray-700"></div>
{:else if log}
	<div class="bg-gray-900 py-24 sm:py-32 dark:bg-black">
		<div class="mx-auto max-w-7xl px-6 lg:px-8">
			<!-- Back Button -->
			<div class="mb-6">
				<a
					href="/dashboard"
					class="rounded-lg border border-gray-200 bg-white px-4 py-2 text-white shadow-md dark:border-gray-700 dark:bg-black"
				>
					← Back to Dashboard
				</a>
			</div>

			<div
				class="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-24 lg:mx-0 lg:max-w-none lg:grid-cols-2"
			>
				<!-- Image on the Left (Handle missing image) -->
				<div class="lg:pr-4">
					<div class="relative overflow-hidden rounded-3xl shadow-2xl">
						{#if log.pic}
							<img
								class="h-full w-full rounded-3xl object-contain brightness-125 saturate-0"
								src={log.pic}
								alt="Log image"
							/>
						{:else}
							<div
								class="flex h-full w-full items-center justify-center text-xl font-semibold text-gray-300"
							>
								No Image Available
							</div>
						{/if}
					</div>
				</div>

				<!-- Stats Section with New Design -->
				<div class="text-center text-white">
					<h1 class="mt-2 text-4xl font-semibold tracking-tight text-pretty text-white">
						{formatDate(log?.createdAt)}
					</h1>
					<dl class="mt-6 grid grid-cols-1 gap-x-8 gap-y-8 sm:gap-y-12 lg:grid-cols-2">
						<div
							class="mx-auto flex max-w-xs flex-col gap-y-2 rounded-xl border border-gray-200 p-4 dark:border-gray-700"
						>
							<dt class="text-lg text-gray-400">Weight ({getDiffLabel(weightDiff)})</dt>
							<dd class="order-first text-3xl font-semibold tracking-tight text-white">
								{log.weight} kg/lbs
							</dd>
						</div>
						<div
							class="mx-auto flex max-w-xs flex-col gap-y-2 rounded-xl border border-gray-200 p-4 dark:border-gray-700"
						>
							<dt class="text-lg text-gray-400">Body Fat ({getDiffLabel(bodyFatDiff)})</dt>
							<dd class="order-first text-3xl font-semibold tracking-tight text-white">
								{log.bodyFat ? log.bodyFat + '%' : 'N/A'}
							</dd>
						</div>
					</dl>
				</div>
			</div>
		</div>
	</div>
{/if}
