<script lang="ts">
	import { goto } from '$app/navigation';

	let { hide } = $props();

	const handleNavigation = () => {
		goto('/create-profile');
	};
</script>

<div class="mt-10 flex flex-col justify-center gap-8">
	<button
		onclick={handleNavigation}
		disabled={hide}
		class="flex flex-row items-center gap-2 rounded-md border-1 border-black p-3 text-center transition-opacity duration-300 dark:border-gray-200 {hide
			? 'cursor-not-allowed opacity-70'
			: 'opacity-100 hover:cursor-pointer'}"
	>
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
			<path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0"></path>
			<path d="M16 19h6"></path>
			<path d="M19 16v6"></path>
			<path d="M6 21v-2a4 4 0 0 1 4 -4h4"></path>
		</svg>Create Profile</button
	>
</div>
