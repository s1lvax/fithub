<script lang="ts">
	let { name }: { name: string } = $props();

	//extract initials
	let initials = name
		.split(' ')
		.map((n: string) => n.charAt(0))
		.join('')
		.toUpperCase();
</script>

<div class="group flex cursor-pointer flex-col items-center">
	<div
		class="flex h-16 w-16 transform items-center justify-center rounded-2xl bg-black text-lg font-bold
               text-white transition-transform group-hover:scale-110 group-hover:shadow-lg dark:bg-white dark:text-black"
	>
		{initials}
	</div>
	<p class="mt-2 text-lg font-semibold">{name}</p>
</div>
