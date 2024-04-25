<script lang="ts">
    import Editor from "@tinymce/tinymce-svelte";
    export let id: number | undefined;
    let notes: string = "this is wtf";
    $: console.log(notes);
</script>


<Editor
    apiKey=process.env.TINYMCE_API_KEY
    bind:value={notes}
/>
