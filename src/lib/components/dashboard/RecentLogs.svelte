<script lang="ts">
	import RecentLogsProfileIcon from './RecentLogsProfileIcon.svelte';

	let { name }: { name: string } = $props();
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
					<li class="py-4">
						<div class="flex items-center space-x-4">
							<div class="shrink-0">
								<RecentLogsProfileIcon {name} />
							</div>
							<div class="min-w-0 flex-1">
								<p class="truncate text-sm font-medium text-gray-900 dark:text-gray-100">
									2025-02-19
								</p>
								<p class="truncate text-sm text-gray-500 dark:text-gray-400">
									Weight + Bodyfat + Picture
								</p>
							</div>
							<div>
								<a
									href="#"
									class="inline-flex items-center rounded-full bg-white px-2.5 py-1 text-xs font-semibold text-gray-900 ring-1 shadow-xs ring-gray-300 ring-inset hover:bg-gray-50 dark:bg-black dark:text-gray-100 dark:ring-gray-600 dark:hover:bg-gray-800"
									>View</a
								>
							</div>
						</div>
					</li>
					<li class="py-4">
						<div class="flex items-center space-x-4">
							<div class="shrink-0">
								<RecentLogsProfileIcon {name} />
							</div>
							<div class="min-w-0 flex-1">
								<p class="truncate text-sm font-medium text-gray-900 dark:text-gray-100">
									2025-02-18
								</p>
								<p class="truncate text-sm text-gray-500 dark:text-gray-400">
									Weight + Bodyfat + Picture
								</p>
							</div>
							<div>
								<a
									href="#"
									class="inline-flex items-center rounded-full bg-white px-2.5 py-1 text-xs font-semibold text-gray-900 ring-1 shadow-xs ring-gray-300 ring-inset hover:bg-gray-50 dark:bg-black dark:text-gray-100 dark:ring-gray-600 dark:hover:bg-gray-800"
									>View</a
								>
							</div>
						</div>
					</li>
				</ul>
			</div>
			<div class="mt-6">
				<a
					href="#"
					class="flex w-full items-center justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 shadow-xs ring-gray-300 ring-inset dark:bg-black dark:text-gray-100 dark:ring-gray-600"
					>View all</a
				>
			</div>
		</div>
	</div>
</section>
