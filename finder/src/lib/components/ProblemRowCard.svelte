<script lang="ts">
    export let url: string | null;
    let title = `${url?.split("/")[2]}${url?.split("/")[4]}`;
</script>

<div class="w-full text-center">
    <a href="https://{url}">{title}</a>
</div>
