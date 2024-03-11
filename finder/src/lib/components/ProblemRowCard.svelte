<script lang="ts">
    export let id: number;
    export let url: string | null;
    export let selected: boolean | null;
    let title = `${url?.split("/")[2]}${url?.split("/")[4]}`;

    function bgColor() {
        return selected ? "bg-gray-400" : "bg-gray-200";
    }

</script>

<tr class="flex justify-center border {bgColor()} rounded border-gray-700">
    <td class="py-3.5 px-1 w-1/3 text-right">
        <a class="underline font-bold hover:text-blue-500" href="https://{url}">{title}</a>
    </td>
    <td class="py-3 px-1 w-1/3 text-center">
        <a class="text-center text-blue-100 bg-blue-800 hover:bg-blue-900 border-black rounded py-0.5 px-1 border text-xs"
            href="#code-{id}"
        >
            View Code
        </a>
    </td>
    <td class="py-3 px-1 w-1/3 text-left">
        <a class="text-center text-blue-100 bg-green-700 hover:bg-green-800 border-black rounded py-0.5 px-1 border text-xs"
            href="#statement-{id}"
        >
            View Statement
        </a>
    </td>
</tr>
