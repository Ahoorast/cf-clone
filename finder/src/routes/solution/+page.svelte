<script lang="ts">
    /** @type {import('./$types').PageData} */
    export let data;
    $: console.log(data);
</script>
<h1>HELLO</h1>
<div>
    {data.sth}
</div>
