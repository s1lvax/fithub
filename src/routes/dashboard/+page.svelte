<script lang="ts">
	import Header from '$lib/components/dashboard/Header.svelte';
	import ProfileOverview from '$lib/components/dashboard/ProfileOverview.svelte';
	import Stats from '$lib/components/dashboard/Stats.svelte';
	import DailyLog from '$lib/components/dashboard/DailyLog.svelte';
	import RecentLogs from '$lib/components/dashboard/RecentLogs.svelte';
</script>

<div class="min-h-full">
	<Header />
	<main class="-mt-24 pb-8">
		<div class="mx-auto max-w-3xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
			<h1 class="sr-only">Profile</h1>
			<div class="grid grid-cols-1 items-start gap-4 lg:grid-cols-3 lg:gap-8">
				<div class="grid grid-cols-1 gap-4 lg:col-span-2">
					<ProfileOverview />
					<Stats />
				</div>
				<div class="grid grid-cols-1 gap-4">
					<DailyLog />
					<RecentLogs />
				</div>
			</div>
		</div>
	</main>
</div>
