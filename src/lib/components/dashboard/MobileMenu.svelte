<script lang="ts">
	let menuOpen = false;
</script>

<div class="absolute right-0 shrink-0 lg:hidden">
	<button
		onclick={() => (menuOpen = !menuOpen)}
		class="relative inline-flex items-center justify-center rounded-md bg-transparent p-2 text-cyan-200 hover:bg-white/10 hover:text-white focus:ring-2 focus:ring-white focus:outline-none dark:hover:bg-gray-800"
		aria-expanded={menuOpen}
	>
		<span class="sr-only">Open main menu</span>
		{#if menuOpen}
			<svg class="size-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
				<path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
			</svg>
		{:else}
			<svg class="size-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
				/>
			</svg>
		{/if}
	</button>

	{#if menuOpen}
		<div class="fixed inset-0 z-20 bg-black/25 dark:bg-black/50" aria-hidden="true"></div>
		<div
			class="absolute inset-x-0 top-0 z-30 mx-auto w-full max-w-3xl origin-top transform p-2 transition"
		>
			<div
				class="divide-y divide-gray-200 rounded-lg bg-white ring-1 shadow-lg ring-black/5 dark:divide-gray-700 dark:bg-black dark:ring-gray-600"
			>
				<div class="flex items-center justify-between px-4 pt-3 pb-2">
					<img
						class="h-8 w-auto"
						src="https://tailwindui.com/plus-assets/img/logos/mark.svg?color=cyan&shade=600"
						alt="Company Logo"
					/>
					<button
						onclick={() => (menuOpen = false)}
						class="p-2 text-gray-400 hover:text-gray-500 dark:text-gray-500 dark:hover:text-gray-300"
					>
						<span class="sr-only">Close menu</span>
						<svg
							class="size-6"
							fill="none"
							viewBox="0 0 24 24"
							stroke-width="1.5"
							stroke="currentColor"
						>
							<path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
						</svg>
					</button>
				</div>
				<div class="mt-3 space-y-1 px-2">
					<a
						href="#"
						class="block rounded-md px-3 py-2 text-base font-medium text-gray-900 hover:bg-gray-100 dark:text-gray-100 dark:hover:bg-gray-800"
						>Home</a
					>
					<a
						href="#"
						class="block rounded-md px-3 py-2 text-base font-medium text-gray-900 hover:bg-gray-100 dark:text-gray-100 dark:hover:bg-gray-800"
						>Profile</a
					>
					<a
						href="#"
						class="block rounded-md px-3 py-2 text-base font-medium text-gray-900 hover:bg-gray-100 dark:text-gray-100 dark:hover:bg-gray-800"
						>Resources</a
					>
					<a
						href="#"
						class="block rounded-md px-3 py-2 text-base font-medium text-gray-900 hover:bg-gray-100 dark:text-gray-100 dark:hover:bg-gray-800"
						>Company Directory</a
					>
					<a
						href="#"
						class="block rounded-md px-3 py-2 text-base font-medium text-gray-900 hover:bg-gray-100 dark:text-gray-100 dark:hover:bg-gray-800"
						>Openings</a
					>
				</div>
			</div>
		</div>
	{/if}
</div>
