<script lang="ts">
    import "../app.css";
    import { sidebar } from "$stores/sidebar";
</script>

<div class="w-full">
    {#if $sidebar.problem}
        <div>
        </div>
    {/if}
    <slot />
</div>
