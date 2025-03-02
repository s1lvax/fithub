<script lang="ts">
	import ProfileIcon from '$lib/components/ProfileIcon.svelte';
	import CreateProfileButton from '$lib/components/CreateProfileButton.svelte';
	import { enhance } from '$app/forms';
	import type { PageProps } from '../../routes/$types';

	let { data, form }: PageProps = $props();

	let selectedUser = $state('');

	const assignUser = (userId: string): void => {
		selectedUser = userId;
	};
</script>

<div class="flex min-h-screen flex-col items-center justify-center text-center">
	<h1 class="mb-10 text-4xl font-extrabold md:text-7xl">Welcome to Fithub</h1>
	{#if !data.users || data.users.length === 0}
		<h1 class="mb-6 text-xl font-semibold">Create your first profile</h1>
	{:else}
		<h1 class="mb-6 text-xl font-semibold">Choose your profile</h1>
	{/if}

	<!-- Profile Icons Grid -->
	<div class="flex justify-center gap-8">
		{#each data.users as user}
			<button type="button" class="icon" onclick={() => assignUser(user.id)}>
				<ProfileIcon name={user.name} />
			</button>
		{/each}
	</div>

	<!-- Show PIN Input when a Profile is Selected -->
	{#if selectedUser}
		<form
			method="POST"
			class="mt-6 flex flex-col items-center transition-all duration-300"
			use:enhance
		>
			<input type="text" name="userId" id="userId" hidden value={selectedUser} />
			<input
				type="password"
				required
				placeholder="Enter your PIN"
				name="pin"
				class="mt-4 w-48 rounded-md border border-black bg-white px-3 py-2 text-center text-lg
                       transition-all focus:ring-2 focus:ring-black
                       focus:outline-none dark:border-gray-600 dark:bg-black dark:text-white dark:focus:ring-white"
			/>
			<button
				type="submit"
				class="mt-6 w-48 rounded-md bg-black px-4 py-2 text-lg font-semibold text-white
                   transition-all hover:cursor-pointer hover:bg-gray-800 focus:ring-2
                   focus:ring-black focus:outline-none dark:bg-white dark:text-black dark:hover:bg-gray-200 dark:focus:ring-white"
			>
				Login
			</button>
		</form>
	{/if}

	<div class="errors mt-5 flex justify-center text-center">
		{#if form?.invalid}<p class="text-red-500">Letters are not allowed.</p>{/if}
		{#if form?.incorrect}<p class="text-red-500">The PIN must be between 4 and 6 characters</p>{/if}
		{#if form?.wrong}<p class="text-red-500">The PIN is wrong</p>{/if}
	</div>

	{#if data.users.length >= 3}
		<CreateProfileButton hide={true} />
	{:else}
		<CreateProfileButton hide={false} />
	{/if}
</div>
