<script lang="ts">
	import Welcome from '$lib/components/Welcome.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<Welcome users={data.users} />
