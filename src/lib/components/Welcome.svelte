<script lang="ts">
	import ProfileIcon from '$lib/components/ProfileIcon.svelte';
	import CreateProfileButton from '$lib/components/CreateProfileButton.svelte';

	let { users } = $props();

	let selectedUser = $state(0);

	const assignUser = (userId: number): void => {
		selectedUser = userId;
	};
</script>

<div class="flex min-h-screen flex-col items-center justify-center text-center">
	<h1 class="mb-10 text-4xl font-extrabold md:text-7xl">Welcome to Openfit</h1>
	<h1 class="mb-6 text-xl font-semibold">Choose your profile</h1>

	<!-- Profile Icons Grid -->
	<div class="flex justify-center gap-8">
		{#each users as user}
			<button type="button" class="icon" onclick={() => assignUser(user.id)}>
				<ProfileIcon name={user.name} />
			</button>
		{/each}
	</div>

	<!-- Show PIN Input when a Profile is Selected -->
	{#if selectedUser}
		<div class="mt-6 flex flex-col items-center transition-all duration-300">
			<input
				type="password"
				placeholder="Enter your PIN"
				class="mt-4 w-48 rounded-md border border-black bg-white px-3 py-2 text-center text-lg
                       transition-all focus:ring-2 focus:ring-black
                       focus:outline-none dark:border-gray-600 dark:bg-black dark:text-white dark:focus:ring-white"
			/>
		</div>
	{/if}

	{#if users.length >= 3}
		<CreateProfileButton hide={true} />
	{:else}
		<CreateProfileButton hide={false} />
	{/if}
</div>
