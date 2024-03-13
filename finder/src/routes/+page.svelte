<script lang="ts">
    import { page } from "$app/stores";
    import ProblemCard from "$comp/ProblemCard.svelte";
    import ProblemRowCard from "$comp/ProblemRowCard.svelte";
    import SolutionCard from "$comp/SolutionCard.svelte";

    export let data;
    let codeId: Id;
    let statementId: Id;
    type Id = {
        rowId: number;
        codeId: number | undefined;
        statementId: number | undefined;
    } | undefined;

    function getId(): Id {
        const rowId = parseInt($page.url.hash.split('-')[1]);
        return {
            rowId: rowId,
            codeId: data.problems[rowId].submission?.id,
            statementId: data.problems[rowId].problem.id,
        };
    }

    async function getStatement(id: Id) {
        if (id === undefined) {
            return;
        }
        // if (data.problems[id.rowId].problem.statement !== null) {
        //     return;
        // }
        try {
            const req = new Request(`/api/problem/${id.statementId}`);
            const response = await fetch(req);
            const responseData: { 
                problem: {
                    id: number;
                    statement: string | null;
                    createdAt: Date;
                    url: string | null;
                }[] 
            } = await response.json();
            console.log(responseData);
            data.problems[id.rowId].problem.statement = responseData.problem[0].statement;
            data = data;
        } catch (e) {
            console.log(e);
        }
    }

    $: {
        if ($page.url.hash.startsWith("#code")) {
            codeId = getId();
            statementId = undefined;
        } else if ($page.url.hash.startsWith("#statement")) {
            codeId = undefined;
            statementId = getId();
        } else {
            codeId = undefined;
            statementId = undefined;
        }
    }

    $: {
        if (statementId !== undefined) {
            getStatement(statementId);
        }
    }
</script>

<div class="w-full flex">
    {#if (codeId !== undefined || statementId !== undefined)}
        <div class="w-full border-1 border-black">
            {#if codeId?.codeId !== undefined}
                <SolutionCard 
                    id={codeId.codeId}
                    solution={data.problems[codeId.rowId].submission?.solution}
                />
            {/if}
            {#if statementId?.statementId !== undefined}
                <ProblemCard 
                    id={statementId.statementId} 
                    problemHtml={data.problems[statementId.rowId].problem.statement}
                />
            {/if}
        </div>    
        <div class="h-screen border-2 border-lime-700">
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
                    url={problem.problem.url}
                    selected={(codeId?.codeId === data.problems[idx].submission?.id || statementId?.statementId === data.problems[idx].problem.id)}
                />
                {/key}
                {/key}
            {/each}
        </tbody>
    </table>
</div>
