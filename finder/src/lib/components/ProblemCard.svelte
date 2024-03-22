<script lang="ts">
    export let problemHtml: string | null;
</script>

{#if problemHtml}
<div class="text-xs bg-gray-200">
    {@html problemHtml}
</div>
{:else}
    <div>
        loading
    </div>
{/if}
