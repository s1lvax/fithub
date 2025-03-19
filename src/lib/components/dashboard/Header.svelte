<script>
	import NavLinks from '$lib/components/dashboard/NavLinks.svelte';
	import Search from '$lib/components/dashboard/Search.svelte';
	import MobileMenu from '$lib/components/dashboard/MobileMenu.svelte';
</script>

<header class="bg-white pb-24 dark:bg-black">
	<div class="mx-auto max-w-3xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
		<div class="relative flex flex-wrap items-center justify-center lg:justify-between">
			<div class="w-full py-5 lg:border-t lg:border-white/20">
				<div class="lg:grid lg:grid-cols-3 lg:items-center lg:gap-8">
					<div class="hidden lg:col-span-2 lg:block">
						<NavLinks />
					</div>
					<Search />
				</div>
			</div>
			<MobileMenu />
		</div>
	</div>
</header>
