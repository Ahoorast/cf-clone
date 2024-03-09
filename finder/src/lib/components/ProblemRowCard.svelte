<script lang="ts">
	import { createEventDispatcher } from "svelte";

    export let id: number | null;
    export let url: string | null;
    let title = `${url?.split("/")[2]}${url?.split("/")[4]}`;

    type dispatchEventType = "viewCode" | "viewStatement";
    type dispatchPayloadType = { id: number | null };
    const dispatch = createEventDispatcher<Record<dispatchEventType, dispatchPayloadType>>();
</script>

<div class="w-full flex justify-center border bg-gray-300 border-gray-400">
    <div class="py-3.5 px-1">
        <a href="https://{url}">{title}</a>
    </div>
    <div class="py-3 px-1">
        <button class="text-center text-blue-100 bg-blue-800 border-black rounded py-0.5 px-1 border text-xs"
            on:click={() => dispatch("viewCode", { id })}
        >
            View Code
        </button>
    </div>
    <div class="py-3 px-1">
        <button class="text-center text-blue-100 bg-green-700 border-black rounded py-0.5 px-1 border text-xs"
            on:click={() => dispatch("viewStatement", { id })}
        >
            View Statement
        </button>
    </div>
</div>
