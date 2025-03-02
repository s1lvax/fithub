<script lang="ts">
	import { enhance } from '$app/forms';
	import type { PageProps } from '../../routes/create-profile/$types';
	let { form }: PageProps = $props();
</script>

<div class="flex min-h-screen flex-col items-center justify-center text-center">
	<h1 class="mb-10 text-4xl font-extrabold md:text-7xl">Welcome to Fithub</h1>
	<h1 class="mb-6 text-xl font-semibold">Register Your Profile</h1>

	<!-- Registration Form -->
	<form class="flex flex-col items-center gap-4" method="POST" use:enhance>
		<!-- Family Name Input -->
		<div class="flex flex-col items-center">
			<label for="familyName" class="mb-2 text-lg font-semibold">Family Name</label>
			<input
				type="text"
				id="familyName"
				name="familyName"
				placeholder="Enter your family name"
				class="w-64 rounded-md border border-black bg-white px-3 py-2 text-center text-lg
                       transition-all focus:ring-2 focus:ring-black
                       focus:outline-none dark:border-gray-600 dark:bg-black dark:text-white dark:focus:ring-white"
				required
			/>
		</div>

		<!-- First Name Input -->
		<div class="flex flex-col items-center">
			<label for="firstName" class="mb-2 text-lg font-semibold">First Name</label>
			<input
				type="text"
				id="firstName"
				name="firstName"
				placeholder="Enter your first name"
				class="w-64 rounded-md border border-black bg-white px-3 py-2 text-center text-lg
                       transition-all focus:ring-2 focus:ring-black
                       focus:outline-none dark:border-gray-600 dark:bg-black dark:text-white dark:focus:ring-white"
				required
			/>
		</div>

		<!-- PIN Input -->
		<div class="flex flex-col items-center">
			<label for="pin" class="mb-2 text-lg font-semibold">PIN (4-6 numbers)</label>
			<input
				type="password"
				id="pin"
				name="pin"
				placeholder="Enter your PIN"
				class="w-64 rounded-md border border-black bg-white px-3 py-2 text-center text-lg
                       transition-all focus:ring-2 focus:ring-black
                       focus:outline-none dark:border-gray-600 dark:bg-black dark:text-white dark:focus:ring-white"
				required
			/>
		</div>

		<!-- Submit Button -->
		<button
			type="submit"
			class="mt-6 w-48 rounded-md bg-black px-4 py-2 text-lg font-semibold text-white
                   transition-all hover:cursor-pointer hover:bg-gray-800 focus:ring-2
                   focus:ring-black focus:outline-none dark:bg-white dark:text-black dark:hover:bg-gray-200 dark:focus:ring-white"
		>
			Register
		</button>

		<div class="errors mt-5 flex justify-center text-center">
			{#if form?.missing}<p class="text-red-500">All input fields are required.</p>{/if}
			{#if form?.invalid}<p class="text-red-500">PIN must be numbers only.</p>{/if}
			{#if form?.incorrect}<p class="text-red-500">PIN must be between 4-6 numbers.</p>{/if}
			{#if form?.toomany}<p class="text-red-500">You can't have more than 3 profiles.</p>{/if}
		</div>
		<div class="errors mt-5 flex justify-center text-center">
			{#if form?.success}
				<p class="text-green-500">
					Successfully registred ! You can now <a href="/" class="text-blue-400 underline">Login</a>
				</p>
			{/if}
		</div>
	</form>
</div>
