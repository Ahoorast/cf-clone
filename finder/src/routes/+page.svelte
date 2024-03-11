<script lang="ts">
    import { page } from "$app/stores";
    import ProblemCard from "$comp/ProblemCard.svelte";
    import ProblemRowCard from "$comp/ProblemRowCard.svelte";
    import SolutionCard from "$comp/SolutionCard.svelte";

    export let data;
    let codeId: number | undefined;
    let statementId: number | undefined;

    function getId() {
        return parseInt($page.url.hash.split('-')[1]);
    }
    // async function getStatement(id: number) {
    //     console.log("HI");
    //     try {
    //         const response = await fetch('/get_statement', {
    //             method: 'get',
    //             data: JSON.stringify({ id: id }),
    //         });
    //
    //         console.log(response);
    //     } catch (e) {
    //         console.log(e);
    //     }
    // }
    $: {
        if ($page.url.hash.startsWith("#code")) {
            codeId = getId();
            statementId = undefined;
        } else if ($page.url.hash.startsWith("#statement")) {
            codeId = undefined;
            statementId = getId()
        } else {
            codeId = undefined;
            statementId = undefined;
        }
    }
    // $: {
    //     if (codeId !== undefined) {
    //         console.log("HI");
    //         getStatement(codeId);
    //     }
    // }
</script>

<div class="w-full flex">
    {#if (codeId !== undefined || statementId !== undefined)}
        <div class="w-full">
            {#if codeId !== undefined}
                <SolutionCard id={codeId} />
            {/if}
            {#if statementId !== undefined}
                <ProblemCard id={statementId} />
            {/if}
        </div>    
    {/if}
    <table class="w-full">
        <thead></thead>
        <tbody class="overflow-y-scroll">
            {#each data.problems as problem, idx}
                {#key codeId}
                {#key statementId}
                <ProblemRowCard
                    id={idx}
                    url={problem.url}
                    selected={(codeId === idx || statementId === idx)}
                />
                {/key}
                {/key}
            {/each}
        </tbody>
    </table>
</div>
