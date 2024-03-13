<script lang="ts">
    export let problemHtml: string;
    export let id: number;
    $: console.log(problemHtml);
</script>

<div>
    {id}
</div>
<div class="text-xs">
    {@html problemHtml}
</div>
