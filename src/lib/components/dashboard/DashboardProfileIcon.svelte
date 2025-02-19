<script lang="ts">
	let { name }: { name: string } = $props();

	//extract initials
	let initials = name
		.split(' ')
		.map((n: string) => n.charAt(0))
		.join('')
		.toUpperCase();
</script>

<div class="group flex flex-col items-center">
	<div
		class="flex h-18 w-18 transform items-center justify-center rounded-full bg-black text-lg font-bold
               text-white dark:bg-white dark:text-black"
	>
		{initials}
	</div>
</div>
