<script>
	import '../app.css';
	// import { createMagneticType } from '$lib/utils/magnetic-type';
	import { onMount } from 'svelte';

	onMount(() => {
		// createMagneticType();
	});
</script>

<svelte:head>
	<title>dominikhofer dot me</title>
	<meta name="description" content="My always-in-progress home on the internet." />
	<meta property="og:image" content="https://dominikhofer.me/og-image.png" />
</svelte:head>

<slot />
