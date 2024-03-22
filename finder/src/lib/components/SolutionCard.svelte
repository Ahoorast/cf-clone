<script lang="ts">
    import { CodeBlock } from "svhighlight";
    import 'highlight.js/styles/base16/dracula.css';

    export let solution: string | undefined | null;
</script>

{#if solution === undefined || solution === null}
    <div class="text-xs bg-purple-950 h-screen">
        <p class="text-white text-center">No solution found</p>
    </div>
{:else}
    <div class="text-xs bg-purple-950 h-screen">
        <CodeBlock language="C++" 
            code={solution}
            dimensions="text-xs" 
        />
    </div>
{/if}
