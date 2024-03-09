<script lang="ts">
    import ProblemCard from "$comp/ProblemCard.svelte";
    import ProblemRowCard from "$comp/ProblemRowCard.svelte";
    export let data;
</script>


{#each data.problems as problem, idx}
    <ProblemRowCard
        id={idx}
        url={problem.url}
    />
{/each}


