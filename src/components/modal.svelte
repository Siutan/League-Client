<script>
    export let modalContent;
</script>

<div on:click|self class='modal z-50 flex absolute my-20 inset-y-0 left-0 w-auto h-auto align-middle'>
    <div class='content '>
        <svelte:component on:click this={modalContent}/>
    </div>
</div>

<style>
    .modal {
        justify-content: center;
        align-items: center;
    }
</style>