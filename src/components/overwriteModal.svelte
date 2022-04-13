<script>
    import Draggable from "./custom_components/draggable.svelte";



</script>

<Draggable>
  <div
    class="relative mx-auto text-black w-96 shadow-lg rounded-md bg-palette-500 bg-opacity-75"
  >
    <div class="flex justify-center">
      <div
        class="flex flex-col w-full max-w-md px-4 py-8 bg-palette-500 rounded-lg shadow dark:bg-gray-800 sm:px-6 md:px-8 lg:px-10 bg-opacity-75 "
      >
        <div class="self-center mb-6 text-xl font-light text-white font-bold">
          The Maximum Number of Accounts is 3, You'll need to overwrite one of the following accounts:

        </div>
        </div>
        <div class="text-center self-center mb-6 text-sm font-light text-white">
          Please restart the program after adding your account.
        </div>
        <button
          class="py-2 px-4 bg-teal-900 hover:bg-teal-500 focus:ring-purple-500 focus:ring-offset-purple-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg"
        >
          Cancel
        </button>
      </div>
    </div>
</Draggable>
