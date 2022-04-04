<script>
  import Draggable from "./custom_components/draggable.svelte";
  import Input from "./custom_components/Input.svelte";

  // define variables
  let jsonFormData = {}; // form data
  let configJson = {}; // config data

  function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    jsonFormData = Object.fromEntries(formData.entries());
    window.electronAPI.writeToFile(JSON.stringify(jsonFormData, null, 2));
  }

  function readData() {
    window.electronAPI
      .getPath()
      .then((userDataPath) => {
        console.log(userDataPath);
        configJson = userDataPath;
      })
      .catch((err) => {
        console.log(err);
      });
  }
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
          Add Your Account
        </div>

        <div class="text-center self-center mb-6 text-sm font-light text-white">
          Your account details will be added to a local JSON file in this
          programs directory and will only be sent directly to Riots servers.
          For more information please read the <a
            href="https://www.google.com/"
            target="_blank"
            class=" underline text-white">privacy policy</a
          >.
        </div>

        <div class="mt-8">
          <form autocomplete="off" on:submit={handleSubmit}>
            <div class="flex flex-col mb-2">
              <div class="flex relative">
                <Input
                  type="text"
                  label="Summoner Name"
                  name="Summoner Name"
                  placeholder="Summoner Name"
                />
              </div>
            </div>

            <div class="flex flex-col mb-2">
              <div class="flex relative">
                <Input
                  type="text"
                  label="Username"
                  name="Username"
                  placeholder="Username"
                />
              </div>
            </div>

            <div class="flex flex-col mb-6">
              <div class="flex relative">
                <Input
                  type="password"
                  label="Password"
                  name="Password"
                  placeholder="Password"
                />
              </div>
            </div>

            <div class="flex w-full">
              <button
                on:click={readData}
                class="py-2 px-4 bg-teal-900 hover:bg-teal-500 focus:ring-purple-500 focus:ring-offset-purple-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg"
              >
                Read File
              </button>
              <div class="flex w-full">
                <button
                  class="py-2 px-4 bg-teal-900 hover:bg-teal-500 focus:ring-purple-500 focus:ring-offset-purple-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg"
                >
                  Write File
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</Draggable>
