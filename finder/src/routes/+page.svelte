<script lang="ts">
    import ProblemRowCard from "$comp/ProblemRowCard.svelte";
    export let data;
</script>


{#each data.problems as problem}
    <ProblemRowCard
        url={problem.url}
    />
{/each}
