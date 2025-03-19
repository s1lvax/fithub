<script lang="ts">
	import { goto } from '$app/navigation';

	const handleClick = (range: '7' | '30' | 'all') => {
		goto(`?range=${range}`);
	};
</script>

<nav class="flex space-x-4">
	<a
		href="?range=7"
		class="rounded-md px-3 py-2 text-sm font-medium text-gray-100 dark:text-gray-300"
		on:click|preventDefault={() => handleClick('7')}>Last 7 Logs</a
	>
	<a
		href="?range=30"
		class="rounded-md px-3 py-2 text-sm font-medium text-gray-100 dark:text-gray-300"
		on:click|preventDefault={() => handleClick('30')}>Last 30 Logs</a
	>
	<a
		href="?range=all"
		class="rounded-md px-3 py-2 text-sm font-medium text-gray-100 dark:text-gray-300"
		on:click|preventDefault={() => handleClick('all')}>All Time</a
	>
</nav>
