<script lang="ts">
    export let searchValue:string = '';
</script>

<div class="w-full h-full flex justify-center">
    <textarea 
        class="w-1/3 h-full rounded px-3"
        rows="4"
        placeholder='Search query like: "DSU" & "merge" & "union"' 
        bind:value={searchValue} 
    />
    <a href="?search={searchValue}" class="bg-blue-900 hover:bg-blue-950 text-white rounded px-2 text-justify py-1.5">
        <button type="submit">
            Search
        </button>
    </a>
</div>
