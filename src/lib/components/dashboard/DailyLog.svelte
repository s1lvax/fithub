<script lang="ts">
	let files: File[] = [];
	let isDragging = $state(false);
	let isFileSelected = $state(false);
	let formError: string | null = $state(null);
	let successMessage: string | null = $state(null);
	let formDisabled = $state(false);
	let alreadySubmitted = $state(false);

	// Check if user has already submitted today
	const checkSubmissionStatus = async () => {
		try {
			const response = await fetch('/api/logs/check');
			const result = await response.json();

			if (result.submittedToday) {
				formDisabled = true;
				alreadySubmitted = true;
			}
		} catch (error) {
			console.error('Error checking submission status:', error);
		}
	};

	// Run check on mount
	$effect(() => {
		checkSubmissionStatus();
	});

	// Handle File Input
	const handleFileInput = (event: Event) => {
		const target = event.target as HTMLInputElement;
		files = target.files ? Array.from(target.files) : [];
		isFileSelected = files.length > 0;
	};

	// Drag & Drop Handlers
	const handleDragOver = (event: DragEvent) => {
		event.preventDefault();
		isDragging = true;
	};

	const handleDragLeave = (event: DragEvent) => {
		event.preventDefault();
		isDragging = false;
	};

	const handleDrop = (event: DragEvent) => {
		event.preventDefault();
		isDragging = false;
		files = event.dataTransfer?.files ? Array.from(event.dataTransfer.files) : [];
		isFileSelected = files.length > 0;
	};

	// Form Submission Handler
	const handleSubmit = async (event: Event) => {
		event.preventDefault();
		formError = null;
		successMessage = null;

		const formData = new FormData(event.target as HTMLFormElement);
		if (files.length > 0) {
			formData.append('picture', files[0]);
		}

		try {
			const response = await fetch('/api/logs/create', {
				method: 'POST',
				body: formData
			});

			const result = await response.json();

			if (!response.ok) {
				formError = result.error || 'Something went wrong!';
			} else {
				successMessage = 'Daily log submitted successfully!';
				formDisabled = true;
				alreadySubmitted = true;
			}
		} catch (error) {
			formError = 'Failed to submit. Please try again.';
		}
	};
</script>

<div
	class="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-black"
>
	<div class="p-6">
		<h2 class="text-base font-medium text-gray-900 dark:text-gray-100" id="announcements-title">
			Daily Log
		</h2>

		{#if alreadySubmitted}
			<p class="mt-2 text-sm text-green-500">You have already submitted today's log.</p>
		{/if}
		<div class="mt-6 flow-root">
			<ul role="list" class="-my-5 divide-y divide-gray-200 dark:divide-gray-700">
				<li class="py-5">
					<div class="relative focus-within:ring-2 focus-within:ring-cyan-500">
						<form
							method="POST"
							onsubmit={handleSubmit}
							class={formDisabled ? 'pointer-events-none opacity-50' : ''}
						>
							<div class="space-y-12">
								<div class="dark:border-gray-700">
									<div class="mt-2 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
										<!-- Weight Input -->
										<div class="sm:col-span-3">
											<label
												for="weight"
												class="block text-sm font-medium text-gray-700 dark:text-gray-300"
											>
												Weight
											</label>
											<div class="mt-2">
												<input
													type="text"
													name="weight"
													id="weight"
													required
													disabled={formDisabled}
													class="block w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-gray-900 shadow-sm placeholder:text-gray-400 focus:border-cyan-500 focus:ring-cyan-500 sm:text-sm dark:border-gray-600 dark:bg-black dark:text-gray-100"
												/>
											</div>
										</div>

										<!-- Bodyfat Input -->
										<div class="sm:col-span-3">
											<label
												for="bodyfat"
												class="block text-sm font-medium text-gray-700 dark:text-gray-300"
											>
												Bodyfat (optional)
											</label>
											<div class="mt-2">
												<input
													type="text"
													name="bodyfat"
													id="bodyfat"
													disabled={formDisabled}
													class="block w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-gray-900 shadow-sm placeholder:text-gray-400 focus:border-cyan-500 focus:ring-cyan-500 sm:text-sm dark:border-gray-600 dark:bg-black dark:text-gray-100"
												/>
											</div>
										</div>

										<div class="col-span-full">
											<label
												for="cover-photo"
												class="block text-sm/6 font-medium text-gray-700 dark:text-gray-300"
											>
												Progress Picture (Optional)
											</label>
											<div
												role="region"
												class={`mt-2 flex justify-center rounded-lg border border-dashed px-6 py-10 transition-all duration-500 ease-in-out ${
													isFileSelected
														? 'border-2 border-green-500'
														: 'border-gray-900/25 dark:border-gray-500'
												}`}
												ondragover={handleDragOver}
												ondragleave={handleDragLeave}
												ondrop={handleDrop}
											>
												<div class="text-center">
													{#if isFileSelected}
														<svg
															class="animate-checkmark mx-auto size-12 text-green-500"
															viewBox="0 0 24 24"
															fill="none"
															stroke="currentColor"
															stroke-width="2"
															stroke-linecap="round"
															stroke-linejoin="round"
														>
															<path d="M20 6L9 17l-5-5" />
														</svg>
													{:else}
														<svg
															class="mx-auto size-12 text-gray-300"
															viewBox="0 0 24 24"
															fill="currentColor"
															aria-hidden="true"
															data-slot="icon"
														>
															<path
																fill-rule="evenodd"
																d="M1.5 6a2.25 2.25 0 0 1 2.25-2.25h16.5A2.25 2.25 0 0 1 22.5 6v12a2.25 2.25 0 0 1-2.25 2.25H3.75A2.25 2.25 0 0 1 1.5 18V6ZM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0 0 21 18v-1.94l-2.69-2.689a1.5 1.5 0 0 0-2.12 0l-.88.879.97.97a.75.75 0 1 1-1.06 1.06l-5.16-5.159a1.5 1.5 0 0 0-2.12 0L3 16.061Zm10.125-7.81a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0Z"
																clip-rule="evenodd"
															/>
														</svg>
													{/if}
													<div class="mt-4 flex text-sm/6 text-gray-700 dark:text-gray-300">
														<label
															for="picture"
															class="relative cursor-pointer rounded-md font-semibold focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 focus-within:outline-hidden"
														>
															<span>Upload an image</span>
															<input
																id="picture"
																name="picture"
																type="file"
																class="sr-only"
																onchange={handleFileInput}
															/>
														</label>
														<p class="pl-1">or drag and drop</p>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>

								<!-- Submit Button -->
								<div class="mt-6">
									<button
										type="submit"
										disabled={formDisabled}
										class="flex w-full items-center justify-center gap-2 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 shadow-xs ring-gray-300 ring-inset hover:cursor-pointer disabled:cursor-not-allowed disabled:opacity-50 dark:bg-black dark:text-gray-100 dark:ring-gray-600"
									>
										Submit
									</button>
								</div>
							</div>
						</form>

						<!-- Error Messages -->
						<div class="errors mt-5 flex justify-center text-center">
							{#if formError}
								<p class="text-red-500">{formError}</p>
							{/if}
							{#if successMessage}
								<p class="text-green-500">{successMessage}</p>
							{/if}
						</div>
					</div>
				</li>
			</ul>
		</div>
	</div>
</div>

<style>
	.animate-checkmark {
		animation: checkmark 0.5s ease-in-out;
	}

	@keyframes checkmark {
		0% {
			transform: scale(0);
			opacity: 0;
		}
		50% {
			transform: scale(1.2);
			opacity: 1;
		}
		100% {
			transform: scale(1);
			opacity: 1;
		}
	}
</style>
