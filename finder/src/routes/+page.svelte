<script lang="ts">
    import { page } from "$app/stores";
    import ProblemCard from "$comp/ProblemCard.svelte";
    import ProblemRowCard from "$comp/ProblemRowCard.svelte";
    import SolutionCard from "$comp/SolutionCard.svelte";
    import SearchBar from "$comp/SearchBar.svelte";
    import type { PageData } from "./$types";
	import { onMount } from "svelte";

    export let data;

    $: console.log(data);


    let codeId: Id;
    let statementId: Id;
    type Id = {
        rowId: number;
        codeId: number | undefined;
        statementId: number | undefined;
    } | undefined;

    let searchValue: string = '';

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
            data.problems[id.rowId].problem.statement = responseData.problem[0].statement;
            data = data;
        } catch (e) {
            console.log(e);
        }
    }

    async function handleSearch() {
        console.log("CALLED SEARCH");
        try {
            const response = await fetch('/api/search/', {
                method: 'post',
                body: JSON.stringify({
                    query: searchValue,
                })
            });
            const responseData: PageData = await response.json();
            console.log(responseData);
            data = responseData;
            $page.url.hash = '';
            codeId = undefined;
            statementId = undefined;
        } catch (e) {
            console.log(e);
        }
    }

    // onMount(() => {
    //     if ($page.url.search.startsWith("?search=")) {
    //         const newSearchValue = decodeURIComponent($page.url.search.split('=')[1]);
    //         if (newSearchValue !== searchValue) {
    //             searchValue = newSearchValue;
    //             handleSearch();
    //         }
    //     }
    //     console.log("MOUNT ", searchValue);
    // })

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
        if ($page.url.search.startsWith("?search=")) {
            const newSearchValue = decodeURIComponent($page.url.search.split('=')[1]);
            if (newSearchValue !== searchValue) {
                searchValue = newSearchValue;
                handleSearch();
            }
        }
    }

    $: {
        if (statementId !== undefined) {
            getStatement(statementId);
        }
    }
</script>

<div class="w-full text-center h-10 bg-gray-200">
    <SearchBar 
        searchValue={searchValue}
    />
</div>

<div>
    {data.problems.length} results
</div>


<div class="border-1 bg-gray-600 w-full h-1"></div>

<div class="w-full flex">
    {#if (codeId !== undefined || statementId !== undefined)}
        <div class="w-full overflow-y-auto h-screen">
            {#if codeId?.codeId !== undefined}
                {#key codeId.codeId}
                <SolutionCard 
                    solution={data.problems[codeId.rowId].submission?.solution}
                />
                {/key}
            {/if}
            {#if statementId?.statementId !== undefined}
                <ProblemCard 
                    problemHtml={data.problems[statementId.rowId].problem.statement}
                />
            {/if}
        </div>    
        <div class="h-screen border-2 border-lime-700">
        </div>
    {/if}
    <div class="overflow-y-auto h-screen w-full">
        <table class="w-full">
            <thead></thead>
            <tbody>
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
</div>
