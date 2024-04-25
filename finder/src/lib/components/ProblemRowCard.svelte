<script lang="ts">
    export let indx: number;
    export let url: string | null;
    export let selected: boolean | null;
    let title = `${url?.split("/")[2]}${url?.split("/")[4]}`;

    function bgColor() {
        return selected ? "bg-gray-400" : "bg-gray-200";
    }
    

</script>

<tr class="justify-center border {bgColor()} rounded border-gray-700">
    <td class="py-3.5 px-1">
        <a class="underline font-bold hover:text-blue-500" href="https://{url}">{title}</a>
    </td>
    <td class="py-3 px-1">
        <a class="text-center text-blue-100 bg-blue-800 hover:bg-blue-900 border-black rounded py-1 px-2 border text-xs"
            href="#code-{indx}"
        >
            View Code
        </a>
    </td>
    <td class="py-3 px-1">
        <a class="text-center text-blue-100 bg-green-700 hover:bg-green-800 border-black rounded py-1 px-2 border text-xs"
            href="#statement-{indx}"
        >
            View Statement
        </a>
    </td>
    <td class="py-3 px-1">
        <a class="text-center text-blue-100 bg-yellow-700 hover:bg-yellow-800 border-black rounded py-1 px-2 border text-xs"
            href="#notes-{indx}"
        >
            Notes 
        </a>
    </td>
</tr>
