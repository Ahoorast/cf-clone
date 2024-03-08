<script lang="ts">
    let number = 0;
</script>



<p>{number}</p>
<button class="text-red-900 w-full" on:click={() => {number += 1}}>increase</button>
