<script lang="ts">
  import '../app.css';
  import Navbar from '$lib/components/Navbar.svelte';
  import type { Snippet } from 'svelte';

  let { children }: { children: Snippet } = $props();
</script>

<svelte:head>
  <title>Ireland Road Trip 2026 — Wild Atlantic Way</title>
</svelte:head>

<Navbar />

<main>
  {@render children()}
</main>
