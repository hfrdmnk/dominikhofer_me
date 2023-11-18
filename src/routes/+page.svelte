<script lang="ts">
	import Logo from '$lib/components/logo.svelte';
</script>

<div class="min-h-[100svh] w-full flex flex-col gap-16 justify-between">
	<header class="py-6 container"><Logo class="h-8 w-8" /></header>
	<main class=" container flex flex-col gap-4 p-[5vw]" data-hover-group>
		<h2 class="font-serif text-4xl font-medium italic magnetic-type" data-hover-group="hero">
			<span data-hover-word="curious">Curious.</span>
			<span data-hover-word="creative">Creative.</span>
			<span data-hover-word="coder">Coder.</span>
		</h2>
		<p class="max-w-lg">
			Hi, I'm <a href="https://hoferdo.link/twitter" target="_blank">Dominik</a>.
		</p>
		<p class="max-w-lg">
			<span data-hover-word="curious"
				>I like to learn <span class="font-serif italic">&</span> understand more about the world we
				live in.</span
			>
			<span data-hover-word="creative"
				>While coming up with cool ideas <span class="font-serif italic">&</span> designing beautiful
				things.</span
			>
			<span data-hover-word="coder">And bringing them to life with fancy symbols.</span>
		</p>
		<p class="max-w-lg">
			<a href="mailto:hi@dominikhofer.me?subject=Hi%2C%20it's%20me!">Who are you?</a>
		</p>
	</main>
	<footer class="py-6 container text-xs text-zinc-400">Made in 2023 with ❤️ and 🧉</footer>
</div>

<style>
	[data-hover-word] {
		transition: all 0.3s ease-out;
	}

	[data-hover-group]:has([data-hover-word]:hover) [data-hover-word] {
		@apply opacity-25;
	}

	[data-hover-group]:has([data-hover-word='curious']:hover) [data-hover-word='curious'],
	[data-hover-group]:has([data-hover-word='creative']:hover) [data-hover-word='creative'],
	[data-hover-group]:has([data-hover-word='coder']:hover) [data-hover-word='coder'] {
		@apply opacity-100;
	}
</style>
