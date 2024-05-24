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
	<script
		defer
		data-domain="dominikhofer.me"
		src="https://analytics.linea.studio:8000/js/script.js"
	></script>
</svelte:head>

<slot />
