<script>
  import "tw-elements";
  import { onMount } from "svelte";
  import Draggable from "./custom_components/draggable.svelte";

  // define variables
  let jsonFormData = {}; // form data
  let configJson = {}; // config data
  let leagueDir = ""; // league directory
  let accounts = {}; // accounts

  onMount(() => {
    // get config data
    window.electronAPI
      .getPath()
      .then((userDataPath) => {
        configJson = JSON.parse(userDataPath);
        leagueDir = configJson.appConfig.leagueDir;
        accounts = configJson.accounts;
        console.log(leagueDir);
      })
      .catch((err) => {
        console.log(err);
      });
  });
</script>

<Draggable>
  <div class="text-white h-xl w-300 shadow-lg rounded-md bg-palette-900">
    <div class="flex place-items-start">
      <ul
        class="nav nav-tabs flex flex-col flex-wrap list-none border-b-0 pl-0 mr-4"
        id="tabs-tabVertical"
        role="tablist"
      >
        <li class="nav-item flex-grow text-center" role="presentation">
          <a
            href="#tabs-homeVertical"
            class="
                  nav-link
                  block
                  font-medium
                  text-xs
                  leading-tight
                  uppercase
                  border-x-0 border-t-0 border-b-2 border-transparent
                  px-6
                  py-3
                  my-2
                  hover:border-transparent hover:bg-gray-100
                  focus:border-transparent
                  active
                  "
            id="tabs-home-tabVertical"
            data-bs-toggle="pill"
            data-bs-target="#tabs-homeVertical"
            role="tab"
            aria-controls="tabs-homeVertical"
            aria-selected="true">Directories</a
          >
        </li>
        <li class="nav-item flex-grow text-center" role="presentation">
          <a
            href="#tabs-profileVertical"
            class="
                  nav-link
                  block
                  font-medium
                  text-xs
                  leading-tight
                  uppercase
                  border-x-0 border-t-0 border-b-2 border-transparent
                  px-6
                  py-3
                  my-2
                  hover:border-transparent hover:bg-gray-100
                  focus:border-transparent
                  "
            id="tabs-profile-tabVertical"
            data-bs-toggle="pill"
            data-bs-target="#tabs-profileVertical"
            role="tab"
            aria-controls="tabs-profileVertical"
            aria-selected="false">Accounts</a
          >
        </li>
      </ul>
      <div class="tab-content" id="tabs-tabContentVertical">
        <div
          class="tab-pane fade show active"
          id="tabs-homeVertical"
          role="tabpanel"
          aria-labelledby="tabs-home-tabVertical"
        >
          <div class="tab-content" id="tabs-tabContent">
            <div
              class="tab-pane fade show active"
              id="tabs-home"
              role="tabpanel"
              aria-labelledby="tabs-home-tab"
            >
              <div>
                <div class="mb-3">
                  <label
                    for="leagueDir"
                    class="form-label inline-block mb-2 text-gray-700"
                    >League of Legends Directory</label
                  >
                  <input
                    type="text"
                    class="
                              form-control
                              block
                              w-full
                              px-3
                              py-1.5
                              text-base
                              font-normal
                              text-gray-700
                              bg-white bg-clip-padding
                              border border-solid border-gray-300
                              rounded
                              transition
                              ease-in-out
                              m-0
                              focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
                              "
                    id="leagueDir"
                    value={leagueDir}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          class="tab-pane fade"
          id="tabs-profileVertical"
          role="tabpanel"
          aria-labelledby="tabs-profile-tabVertical"
        >
          Tab 2 content vertical
        </div>
      </div>
    </div>
  </div>
</Draggable>
