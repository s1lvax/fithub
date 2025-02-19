<section aria-labelledby="announcements-title">
	<div
		class="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-black"
	>
		<div class="p-6">
			<h2 class="text-base font-medium text-gray-900 dark:text-gray-100" id="announcements-title">
				Daily Log
			</h2>
			<div class="mt-6 flow-root">
				<ul role="list" class="-my-5 divide-y divide-gray-200 dark:divide-gray-700">
					<li class="py-5">
						<div class="relative focus-within:ring-2 focus-within:ring-cyan-500">
							<form>
								<div class="space-y-12">
									<div class="border-b border-gray-300 pb-12 dark:border-gray-700">
										<div class="mt-2 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
											<div class="sm:col-span-3">
												<label
													for="first-name"
													class="block text-sm font-medium text-gray-700 dark:text-gray-300"
												>
													Weight
												</label>
												<div class="mt-2">
													<input
														type="text"
														name="first-name"
														id="first-name"
														autocomplete="given-name"
														required
														class="block w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-gray-900 shadow-sm placeholder:text-gray-400 focus:border-cyan-500 focus:ring-cyan-500 sm:text-sm dark:border-gray-600 dark:bg-black dark:text-gray-100 dark:placeholder-gray-500 dark:focus:border-cyan-400 dark:focus:ring-cyan-400"
													/>
												</div>
											</div>

											<div class="sm:col-span-3">
												<label
													for="last-name"
													class="block text-sm font-medium text-gray-700 dark:text-gray-300"
												>
													Bodyfat (optional)
												</label>
												<div class="mt-2">
													<input
														type="text"
														name="last-name"
														id="last-name"
														autocomplete="family-name"
														class="block w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-gray-900 shadow-sm placeholder:text-gray-400 focus:border-cyan-500 focus:ring-cyan-500 sm:text-sm dark:border-gray-600 dark:bg-black dark:text-gray-100 dark:placeholder-gray-500"
													/>
												</div>
											</div>
											<div class="col-span-full">
												<label
													for="cover-photo"
													class="block text-sm/6 font-medium text-gray-700 dark:text-gray-300"
													>Progress Picture</label
												>
												<div
													class="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10 dark:border-gray-500"
												>
													<div class="text-center">
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
														<div class="mt-4 flex text-sm/6 text-gray-700 dark:text-gray-300">
															<label
																for="file-upload"
																class="relative cursor-pointer rounded-md font-semibold focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 focus-within:outline-hidden hover:scale-110"
															>
																<span>Upload a file</span>
																<input
																	id="file-upload"
																	name="file-upload"
																	type="file"
																	class="sr-only"
																/>
															</label>
															<p class="pl-1">or drag and drop</p>
														</div>
														<p class="text-xs/5 text-gray-700 dark:text-gray-300">
															PNG, JPG, GIF up to 10MB
														</p>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
								<div class="mt-6">
									<button
										type="submit"
										class="flex w-full items-center justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 shadow-xs ring-gray-300 ring-inset hover:cursor-pointer hover:bg-gray-50 dark:bg-black dark:text-gray-100 dark:ring-gray-600 dark:hover:bg-gray-800"
										>Submit</button
									>
								</div>
							</form>
						</div>
					</li>
				</ul>
			</div>
		</div>
	</div>
</section>
