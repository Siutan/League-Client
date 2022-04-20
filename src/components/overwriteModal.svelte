<script>
  import "tw-elements";
  import AccountCard from "./accountCard.svelte";

  // define variables
  let jsonFormData = {}; // form data
  let configJson = {}; // config data
  let leagueDir = ""; // league directory
  let accounts = []; // accounts data

  async function pog () {
    // get config data
    await window.electronAPI
      .getPath()
      .then((userDataPath) => {
        configJson = JSON.parse(userDataPath);
        leagueDir = configJson.appConfig.leagueDir;
        for (let i = 0; i < configJson.accounts.length; i++) {
          accounts.push(configJson.accounts[i]);
        }
        console.log(accounts);
      })
      .catch((err) => {
        console.log(err);
      });
  }
</script>

  <div class="absolute self-center text-black h-2xl w-2xl shadow-lg rounded-md bg-palette-800">
    <div class="flex place-items-start">
      <ul
        class="nav nav-tabs flex flex-col flex-wrap list-none border-b-0 pl-0 mr-4"
        id="tabs-tabVertical"
        role="tablist"
      >
        <li class="nav-item flex-grow text-center" role="presentation">
          <a
            href="#tabs-directories"
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
            data-bs-target="#tabs-directories"
            role="tab"
            aria-controls="tabs-directories"
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
          id="tabs-directories"
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
                <div class="mb-3 p-10">
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
          <div class="flex flex-row p-10">
            {#await pog()}
              loading...
            {:then lol}
              {#each accounts as {summonerName, userName}, i}
              <div class="p-3">
                <AccountCard index={i} summonerName={summonerName} username={userName} />
              </div>
                {/each}
            {/await}
          </div>
        </div>
      </div>
    </div>
  </div>
