<script lang="ts">
    import { CodeBlock } from "svhighlight";
    import 'highlight.js/styles/base16/dracula.css';

    export let solution: string;
</script>

<div class="text-xs">
    <CodeBlock language="C++" code={solution} dimensions="text-xs"/>
</div>
