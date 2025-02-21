<script lang="ts">
	import Welcome from '$lib/components/Welcome.svelte';
	import type { PageProps } from './$types';

	let { data, form }: PageProps = $props();
</script>

<Welcome {data} {form} />
