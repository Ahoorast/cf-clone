<script lang="ts">
    import { CodeBlock } from "svhighlight";
    import 'highlight.js/styles/base16/dracula.css';

    export let solution: string;
    $: console.log(solution);
</script>

<div class="text-xs bg-purple-950 h-screen">
    <CodeBlock language="C++" code={solution} dimensions="text-xs"/>
</div>
