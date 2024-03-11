<script lang="ts">
    import "../app.css";
    import { sidebar } from "$stores/sidebar";
</script>

<!-- https://kit.svelte.dev/docs/state-management#storing-state-in-the-url -->

<div class="w-full">
    {#if $sidebar.problem}
        <div>
        </div>
    {/if}
    <slot />
</div>
