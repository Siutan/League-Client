<script>
    import Draggable from "./draggable.svelte";
</script>


<Draggable>
    <div
            class="relative mx-auto text-black p-5 w-96 shadow-lg rounded-md bg-sienna-100 bg-transparent-20"
    >
        <div class="items-center">
            <h2>Add Account</h2>
        </div>
        <form action="">
            <div class="mt-4">
                <div>
                    <label class="block" >Username</label>
                        <input type="text" placeholder="Email" required
                               class="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600">
                </div>
                <div class="mt-4">
                    <label class="block">Password</label>
                        <input type="password" placeholder="Password" required
                               class="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600">
                </div>
            </div>
            <div class="items-center px-4 py-3">
                <button
                        class="px-4 py-2 bg-green-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-300"
                >
                    OK
                </button>
            </div>
        </form>

        </div>
</Draggable>