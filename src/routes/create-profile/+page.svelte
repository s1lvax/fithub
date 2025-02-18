<script lang="ts">
	import RegisterForm from '$lib/components/RegisterForm.svelte';
	import type { PageProps } from './$types';

	let { data, form }: PageProps = $props();
</script>

<RegisterForm {data} {form} />
