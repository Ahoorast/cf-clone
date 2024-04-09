<script lang="ts">
    import { page } from "$app/stores";
    import ProblemCard from "$comp/ProblemCard.svelte";
    import ProblemRowCard from "$comp/ProblemRowCard.svelte";
    import SolutionCard from "$comp/SolutionCard.svelte";
    import SearchBar from "$comp/SearchBar.svelte";
    import type { PageData } from "./$types";

    export let data;

    let problemId: Id;

    type Id = {
        rowId: number | undefined;
        codeId: number | undefined;
        statementId: number | undefined;
    } | undefined;

    enum sidebarState {
        NONE,
        CODE,
        STATEMENT,
        NOTE,
    };

    let sidebar: sidebarState = sidebarState.NONE;

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
        if (id.rowId === undefined) {
            return;
        }
        if (id.statementId === undefined) {
            return;
        }
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
        try {
            const response = await fetch('/api/search/', {
                method: 'post',
                body: JSON.stringify({
                    query: searchValue,
                })
            });
            const responseData: PageData = await response.json();
            data = responseData;
            $page.url.hash = '';
            problemId = undefined;
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
            problemId = getId();
            sidebar = sidebarState.CODE;
        } else if ($page.url.hash.startsWith("#statement")) {
            problemId = getId();
            sidebar = sidebarState.STATEMENT;
        } else if ($page.url.hash.startsWith("#notes")) {
            problemId = getId();
            sidebar = sidebarState.NOTE;
        } else {
            problemId = undefined;
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
        if (sidebar === sidebarState.STATEMENT) {
            getStatement(problemId);
        }
    }
</script>

<div class="sticky top-0">
    <div class="w-full text-center h-10 bg-gray-200">
        <SearchBar 
            searchValue={searchValue}
        />
    </div>

    <div class="w-full h-10 bg-gray-200 px-1 text-sm">
        {data.problems.length} results
    </div>

    <div class="border-1 bg-gray-600 w-full h-1"></div>
</div>


<div class="w-full flex">
    {#if problemId?.rowId !== undefined }
        <div class="w-full overflow-y-auto h-screen">
            {#if sidebar === sidebarState.CODE}
                {#key problemId.codeId}
                <SolutionCard 
                    solution={data.problems[problemId.rowId].submission?.solution}
                />
                {/key}
            {/if}
            {#if sidebar === sidebarState.STATEMENT}
                <ProblemCard 
                    problemHtml={data.problems[problemId.rowId].problem.statement}
                />
            {/if}
        </div>    
        <div class="h-screen border-2 border-lime-700">
        </div>
    {/if}
    <div class="overflow-y-auto h-screen w-full">
        <table class="table-auto w-full text-center">
            <thead>
                <tr>
                    <th></th>
                    <th></th>
                    <th></th>
                    <th></th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {#each data.problems as problem, idx}
                    {#key problemId}
                    <ProblemRowCard
                        indx={idx}
                        url={problem.problem.url}
                        selected={(problemId?.codeId === data.problems[idx].submission?.id || problemId?.statementId === data.problems[idx].problem.id)}
                    />
                    {/key}
                {/each}
            </tbody>
        </table>
    </div>
</div>
