<script>
  import { onMount } from "svelte";
  import Draggable from "./custom_components/draggable.svelte";
  import Input from "./custom_components/Input.svelte";
  import Modal from "./custom_components/modal.svelte";
  import overwriteModal from "./settingsModal.svelte";

  let showModal = false;
  let modalContent;

  // pass in component as parameter and toggle modal state
  function toggleModal(component) {
    modalContent = component;
    showModal = !showModal;
    console.log(showModal);
  }

  // define variables
  let jsonFormData = {}; // form data
  let configJson = {}; // config data

  onMount(async () => {
    // get config data
    window.electronAPI
      .getPath()
      .then((userDataPath) => {
        configJson = JSON.parse(userDataPath);
        console.log(configJson);
      })
      .catch((err) => {
        console.log(err);
      });
  });

  function readData() {
    window.electronAPI
      .getPath()
      .then((userDataPath) => {
        configJson = JSON.parse(userDataPath);
        console.log(configJson);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleSubmit(e) {
    //prevent form submission
    e.preventDefault();
    //get form data and put into json
    const formData = new FormData(e.target);
    jsonFormData = Object.fromEntries(formData.entries());
    console.log(jsonFormData);

    for (let i = 0; i < configJson["accounts"].length; i++) {
      let existsFlag = configJson["existing"];

      if (existsFlag === i) {
        // write data to config file
        configJson["accounts"][i]["summonerName"] =
          jsonFormData["SummonerName"];
        configJson["accounts"][i]["userName"] = jsonFormData["UserName"];
        configJson["accounts"][i]["password"] = jsonFormData["Password"];
        configJson["accounts"][i]["exists"] = 1;
        configJson["existing"] = i + 1;
        break;
      } else if (existsFlag === 3) {
        // write data to config file
        console.log("need to overwrite");
        // set modal to true
        toggleModal(overwriteModal);
        break;
      } else {
        // write data to config file
        console.log("the current existsFlag is: " + existsFlag);
      }
    }

    // write data to config file
    window.electronAPI.writeToFile(JSON.stringify(configJson, null, 2));
  }
</script>

{#if showModal}
  <Modal on:click={toggleModal} {modalContent} />
{/if}

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
        <div class="text-center self-center mb-6 text-sm font-light text-white">
          Please restart the program after adding your account.
        </div>

        <div class="mt-8">
          <form autocomplete="off" on:submit={handleSubmit}>
            <div class="flex flex-col mb-2">
              <div class="flex relative">
                <Input
                  type="text"
                  label="SummonerName"
                  name="SummonerName"
                  placeholder="Summoner Name"
                />
              </div>
            </div>

            <div class="flex flex-col mb-2">
              <div class="flex relative">
                <Input
                  type="text"
                  label="UserName"
                  name="UserName"
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
                class="py-2 px-4 bg-teal-900 hover:bg-teal-500 focus:ring-purple-500 focus:ring-offset-purple-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg"
              >
                Set Form Data || Add Account
              </button>
            </div>
          </form>
          <button
            on:click={readData}
            class="py-2 px-4 bg-teal-900 hover:bg-teal-500 focus:ring-purple-500 focus:ring-offset-purple-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg"
          >
            Read File
          </button>
        </div>
      </div>
    </div>
  </div>
</Draggable>
