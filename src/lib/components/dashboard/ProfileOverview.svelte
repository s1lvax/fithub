<script lang="ts">
	import DashboardProfileIcon from '$lib/components/dashboard/DashboardProfileIcon.svelte';

	let fullName = $state('');
	let avgWeight = $state(null);
	let avgBodyFat = $state(null);
	let currentStreak = $state(0);
	let loading = $state(true); // Track loading state

	const fetchStats = async () => {
		try {
			const response = await fetch('/api/logs/stats');
			const result = await response.json();

			if (result) {
				fullName = result.fullName;
				avgWeight = result.avgWeight;
				avgBodyFat = result.avgBodyFat;
				currentStreak = result.currentStreak;
			}
		} catch (error) {
			console.error('Error fetching stats:', error);
		} finally {
			loading = false; // Set loading to false after fetching
		}
	};

	$effect(() => {
		fetchStats();
	});
</script>

<section aria-labelledby="profile-overview-title">
	<div
		class="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-black"
	>
		<h2 class="sr-only" id="profile-overview-title">Profile Overview</h2>
		<div class="bg-white p-6 dark:bg-black">
			<div class="sm:flex sm:items-center sm:justify-between">
				<div class="sm:flex sm:space-x-5">
					<div class="shrink-0">
						{#if loading}
							<!-- Skeleton for Profile Icon -->
							<div class="h-16 w-16 animate-pulse rounded-full bg-gray-200 dark:bg-gray-700"></div>
						{:else}
							<DashboardProfileIcon name={fullName} />
						{/if}
					</div>
					<div class="mt-4 text-center sm:mt-0 sm:pt-1 sm:text-left">
						{#if loading}
							<!-- Skeleton for Welcome Message -->
							<div class="h-4 w-32 animate-pulse rounded bg-gray-200 dark:bg-gray-700"></div>
							<div class="mt-2 h-6 w-48 animate-pulse rounded bg-gray-200 dark:bg-gray-700"></div>
							<div class="mt-2 h-4 w-40 animate-pulse rounded bg-gray-200 dark:bg-gray-700"></div>
						{:else}
							<p class="text-sm font-medium text-gray-600 dark:text-gray-400">Welcome back,</p>
							<p class="text-xl font-bold text-gray-900 sm:text-2xl dark:text-gray-100">
								{fullName}
							</p>
							<p class="text-sm font-medium text-gray-600 dark:text-gray-400">
								to your Fithub account
							</p>
						{/if}
					</div>
				</div>
				<div class="mt-5 flex justify-center sm:mt-0">
					{#if loading}
						<!-- Skeleton for Logout Button -->
						<div class="h-10 w-24 animate-pulse rounded bg-gray-200 dark:bg-gray-700"></div>
					{:else}
						<form method="POST" action="?/logout">
							<button
								type="submit"
								class="flex items-center justify-center gap-2 rounded-md bg-black px-3 py-2 text-sm font-semibold text-white ring-1 shadow-xs hover:cursor-pointer dark:bg-white dark:text-black"
							>
								Logout
								<svg
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									stroke-linecap="round"
									stroke-linejoin="round"
									width="24"
									height="24"
									stroke-width="2"
								>
									<path
										d="M14 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2"
									></path>
									<path d="M9 12h12l-3 -3"></path>
									<path d="M18 15l3 -3"></path>
								</svg>
							</button>
						</form>
					{/if}
				</div>
			</div>
		</div>
		<div
			class="grid grid-cols-1 divide-y divide-gray-200 border-t border-gray-200 bg-gray-50 sm:grid-cols-3 sm:divide-x sm:divide-y-0 dark:divide-gray-700 dark:border-gray-700 dark:bg-black"
		>
			<div class="px-6 py-5 text-center text-sm font-medium">
				{#if loading}
					<!-- Skeleton for Average Weight -->

					<div
						class="mx-auto mt-2 h-4 w-24 animate-pulse rounded bg-gray-200 dark:bg-gray-700"
					></div>
				{:else}
					<span class="text-gray-900 dark:text-gray-100">{avgWeight ?? '?'}</span>
					<span class="text-gray-600 dark:text-gray-400">Average Weight</span>
				{/if}
			</div>
			<div class="px-6 py-5 text-center text-sm font-medium">
				{#if loading}
					<!-- Skeleton for Average BodyFat -->

					<div
						class="mx-auto mt-2 h-4 w-24 animate-pulse rounded bg-gray-200 dark:bg-gray-700"
					></div>
				{:else}
					<span class="text-gray-900 dark:text-gray-100">{avgBodyFat ?? '?'}%</span>
					<span class="text-gray-600 dark:text-gray-400">Average BodyFat</span>
				{/if}
			</div>
			<div class="px-6 py-5 text-center text-sm font-medium">
				{#if loading}
					<!-- Skeleton for Current Streak -->

					<div
						class="mx-auto mt-2 h-4 w-24 animate-pulse rounded bg-gray-200 dark:bg-gray-700"
					></div>
				{:else}
					<span class="text-gray-900 dark:text-gray-100">🔥{currentStreak ?? '?'}</span>
					<span class="text-gray-600 dark:text-gray-400">Current Streak</span>
				{/if}
			</div>
		</div>
	</div>
</section>
