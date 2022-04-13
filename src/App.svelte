<script>
  //TODO:
  // - Write to file only if previous accounts not found, if found, prompt overwrite.
  // - Move the right side bar into its own component.
  // - Move Match Card into its own component.
  // - Make app read summoner names from savedData.json
  // - Start on the next dashboard summoner stats component.

  // props
  export let summonerName;

  //imports
  import { onMount } from "svelte";
  import LeftSidebar from "./components/leftSideBar.svelte";
  import BlankMatchCard from "./components/matchCardSkeleton.svelte";

  // get config
  let appConfig = {};
  let key = 0;

  onMount(() => {
    // get config data
    window.electronAPI
      .getPath()
      .then((userDataPath) => {
        appConfig = JSON.parse(userDataPath);
        console.log(appConfig);
      })
      .catch((err) => {
        console.log(err);
      });
  });

  //close btn
  function handleClose() {
    window.api.titlebar("kill");
  }
  //fetch summoner basic
  let summonerBasic;
  let summonerOverview;
  let perks;

  async function getData() {
    // summoner Basic
    let basicData = await fetch("https://api.leaguestats.gg/summoner/basic", {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ summoner: "homos in paris", region: "oc1" }),
    });
    summonerBasic = await basicData.json();
    console.log(summonerBasic);

    // summoner Overview
    let overviewData = await fetch(
      "https://api.leaguestats.gg/summoner/overview",
      {
        method: "POST", // or 'PUT'
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          accountId: summonerBasic.account.accountId,
          puuid: summonerBasic.account.puuid,
          region: "oc1",
          season: null,
        }),
      }
    );
    summonerOverview = await overviewData.json();
    console.log(summonerOverview);

    //summoner perks
    let getPerks = await fetch("https://api.leaguestats.gg/cdragon/runes");
    perks = await getPerks.json();
    console.log(perks);
  }

  // Get Champion Info
  function getChampion(info, matchIndex) {
    return summonerOverview.matchesDetails[matchIndex].champion[info];
  }

  // Get win or loss
  function getWinLoss(matchIndex) {
    if (summonerOverview.matchesDetails[matchIndex].result === "Win") {
      return "text-blue-500";
    } else {
      return "text-red-500";
    }
  }

  // Get Gamemode
  function getGamemode(matchIndex) {
    let gameMode = summonerOverview.matchesDetails[matchIndex].gamemode;
    switch (gameMode) {
      case 400:
        gameMode = "Draft 5v5";
        return gameMode;
      case 420:
        gameMode = "Solo/Duo";
        return gameMode;
      case 430:
        gameMode = "Blind 5v5";
        return gameMode;
      case 440:
        gameMode = "Ranked Flex";
        return gameMode;
      case 450:
        gameMode = "ARAM";
        return gameMode;
      case 1020:
        gameMode = "One for All";
        return gameMode;
    }
  }

  // Get Stats
  function getStats(stat, matchIndex) {
    // create switch case for each stat below
    let base = summonerOverview.matchesDetails[matchIndex].stats;
    switch (stat) {
      case "kda":
        return base.kills + "/" + base.deaths + "/" + base.assists;
      case "kda-ratio":
        return base["kda"];
      case "level":
        return summonerOverview.matchesDetails[matchIndex].level;
      case "kp":
        return base["kp"];
      case "gold":
        return formatThousand(base.gold);
      case "damage":
        return formatThousand(base.dmgChamp);
      case "minions":
        return base["minions"];
      case "vision":
        return base["vision"];
      case "time":
        return convertTime(summonerOverview.matchesDetails[matchIndex]["time"]);
        case "date":
        return timeAgo(summonerOverview.matchesDetails[matchIndex].date);
    }
  }
// convert seconds into minutes + seconds to 2 seconds
  function convertTime(time) {
    let minutes = Math.floor(time / 60);
    let seconds = (time  - minutes * 60);
    return minutes + ":" + seconds;
  }
  function timeAgo(input) {
    const date = (input instanceof Date) ? input : new Date(input);
    const formatter = new Intl.RelativeTimeFormat('en');
    const ranges = {
      years: 3600 * 24 * 365,
      months: 3600 * 24 * 30,
      weeks: 3600 * 24 * 7,
      days: 3600 * 24,
      hours: 3600,
      minutes: 60,
      seconds: 1
    };
    const secondsElapsed = (date.getTime() - Date.now()) / 1000;
    for (let key in ranges) {
      if (ranges[key] < Math.abs(secondsElapsed)) {
        const delta = secondsElapsed / ranges[key];
        return formatter.format(Math.round(delta), key);
      }
    }
  }

  // Get Items
  function getItems(itemIndex, matchIndex) {
    let item = summonerOverview.matchesDetails[matchIndex].items[itemIndex];
    if (item === null) {
      return "https://upload.wikimedia.org/wikipedia/commons/thumb/5/50/Black_colour.jpg/220px-Black_colour.jpg";
    } else {
      return summonerOverview.matchesDetails[matchIndex].items[itemIndex].image;
    }
  }

  // define function to format thousands to k, eg: 1000 > 1k
  function formatThousand(num) {
    return Math.abs(num) > 999
      ? Math.sign(num) * (Math.abs(num) / 1000).toFixed(1) + "k"
      : Math.sign(num) * Math.abs(num);
  }

  // // get runes
  // function getPerks(perkType, matchIndex) {
  //   if (perkType === "primary") {
  //     try {
  //       let perk =
  //         summonerOverview.matchesDetails[matchIndex].perks.selected[0];
  //       let primaryPerk = perks.perks[perk].icon;
  //       primaryPerk = primaryPerk.substring(primaryPerk.indexOf("Styles/") + 1);
  //       primaryPerk = `https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/perk-images/s${primaryPerk.toLowerCase()}`;
  //       return primaryPerk;
  //     } catch (error) {
  //       return "https://upload.wikimedia.org/wikipedia/commons/thumb/5/50/Black_colour.jpg/220px-Black_colour.jpg";
  //     }
  //   } else {
  //     try {
  //       let perk =
  //         summonerOverview.matchesDetails[matchIndex].perks.secondaryStyle;
  //       let secondaryPerk = perks.perkstyles[perk].icon;
  //       secondaryPerk = secondaryPerk.substring(
  //         secondaryPerk.indexOf("Styles/") + 1
  //       );
  //       secondaryPerk = `https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/perk-images/s${secondaryPerk.toLowerCase()}`;
  //       return secondaryPerk;
  //     } catch (error) {
  //       return "https://upload.wikimedia.org/wikipedia/commons/thumb/5/50/Black_colour.jpg/220px-Black_colour.jpg";
  //     }
  //   }
  // }
  //
  // //get summoner spells
  // function getSpells(spellIndex, matchIndex) {
  //   if (spellIndex === 1) {
  //     try {
  //       return summonerOverview.matchesDetails[matchIndex].summonerSpell1.icon;
  //     } catch (error) {
  //       return "https://upload.wikimedia.org/wikipedia/commons/thumb/5/50/Black_colour.jpg/220px-Black_colour.jpg";
  //     }
  //   } else if (spellIndex === 2) {
  //     try {
  //       return summonerOverview.matchesDetails[matchIndex].summonerSpell2.icon;
  //     } catch (error) {
  //       return "https://upload.wikimedia.org/wikipedia/commons/thumb/5/50/Black_colour.jpg/220px-Black_colour.jpg";
  //     }
  //   }
  // }
</script>

<main class="overflow-hidden">
  <div class="bg-gray-500 flex flex-col h-screen bg-gradient-to-b from-black via-palette-600 to-palette-800">
    <div class="relative h-10 bg-opacity-50" style="-webkit-app-region: drag">
      <span class="absolute inset-y-0 right-2">
        <button
          on:click={handleClose}
          type="button"
          class="rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-red-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
        >
          <span class="sr-only">Close menu</span>
          <!-- Heroicon name: outline/x -->
          <svg
            class="h-6 w-6"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </span>
      <div class="justify-center items-center">
        <!-- Left Sidebar Start -->
        <LeftSidebar />
        <!-- Left Sidebar End  -->
        <!-- Main Content -->
        <div
          class="fixed top-40 inset-y-0 left-48 flex justify-center items-center"
        >
          <div class="container space-y-4">
            <h1 class="text-4xl font-mono text-white font-extrabold">
              LEAGUE OF LEGENDS
            </h1>
            <div
              class="bg-blue-100 space-x-2 rounded-full h-14 w-32 flex items-center justify-center"
            >
              <img class="h-8 w-8" src="../public/img/play_btn.png" alt="" />
              <span class="text-lg font-extrabold leading-none">PLAY</span>
            </div>
            <!-- Match History -->
            <div
              class="overflow-hidden p-8 space-y-8 bg-palette-900 bg-opacity-50 h-xl w-300 rounded-xl"
            >
              <!-- Match Card -->
              {#await getData()}
                <BlankMatchCard />
                <BlankMatchCard />
                <BlankMatchCard />
              {:then pog}
                {#each Array(3) as _, i}
                  <div
                    class="relative bg-palette-900 px-5 pt-5 pb-5 shadow-xl ring-1 ring-palette-600 sm:mx-auto sm:rounded-lg sm:px-8"
                  >
                    <div class="relative mx-auto">
                      <div class="grid grid-cols-6 gap">
                        <!-- Champion Icon and Lane -->
                        <div
                          class=" w-20 h-20 overflow-hidden border-solid border-2 border-palette-600 rounded-lg"
                        >
                          <img
                            src={getChampion("icon", i)}
                            alt="Champion Icon"
                          />
                          <img
                            class="absolute w-8 inset-14 bg-palette-900 rounded-md"
                            src="https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-clash/global/default/assets/images/position-selector/positions/icon-position-middle.png"
                            alt="Champion Icon"
                          />
                        </div>
                        <!-- Outcome and Gamemode -->
                        <div class="pl-5 pt-3 text-center">
                          <p class=" font-extrabold {getWinLoss(i)}">VICTORY</p>
                          <p class="text-gray-500 font-semibold">
                            {getGamemode(i)}
                          </p>
                        </div>
                        <!-- KDA -->
                        <div class="pl-5 pt-3 text-center">
                          <p class="text-gray-200 font-bold">
                            {getStats("kda", i)}
                          </p>
                          <p
                            class="inline-block text-gray-400 text-xs font-thin"
                          >
                            {getStats("kda-ratio", i)} KDA
                          </p>
                        </div>
                        <!-- Items -->
                        <div
                          class=" w-24 h-20 grid grid-cols-3 grid-rows-2 gap-x-1 gap-y-0"
                        >
                          <img
                            class="rounded-lg"
                            src={getItems("0", i)}
                            alt="Item 1"
                          />
                          <img
                            class="rounded-lg"
                            src={getItems("1", i)}
                            alt="Item 2"
                          />
                          <img
                            class="rounded-lg"
                            src={getItems("2", i)}
                            alt="Item 3"
                          />
                          <img
                            class="rounded-lg"
                            src={getItems("3", i)}
                            alt="Item 4"
                          />
                          <img
                            class="rounded-lg"
                            src={getItems("4", i)}
                            alt="Item 5"
                          />
                          <img
                            class="rounded-lg"
                            src={getItems("5", i)}
                            alt="Item 6"
                          />
                        </div>
                        <!-- CS + Gold + DMG + KP -->
                        <div
                          class="pl-5 text-left text-xs font-bold grid grid-cols-1 grid-rows-4 uppercase"
                        >
                          <p class="text-green-500">
                            {getStats("minions", i)} CS
                          </p>
                          <p class="text-yellow-600 ">{getStats("gold", i)}</p>
                          <p class="text-red-800 ">{getStats("damage", i)}</p>
                          <p class="text-purple-700">{getStats("kp", i)}% KP</p>
                        </div>
                        <!-- Gametime -->
                        <div
                          class="pt-3 text-gray-500 text-center text-lg font-thin"
                        >
                          <p>{getStats("date", i)}</p>
                          <p>{getStats("time", i)}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                {/each}
                <!-- End Await -->
              {/await}
            </div>
          </div>
        </div>

        <!-- Main Content End -->
        <!-- Right Sidebar Start -->
        <div>
          <div class="absolute inset-y-96 right-0 h-72 w-16">
            <div
              class="hover:w-80 hover:bg-opacity-90 overflow-visible duration-1000 absolute border-opacity-40 border-t-2 border-l-2 border-b-2 text-white p-3 bg-opacity-50 border-black bg-black rounded-l-3xl inset-y-0 right-0 w-20"
            >
              <div
                class="h-full items-center grid grid-cols-1 whitespace-nowrap"
              >
                <div
                  class="flex space-x-16 rounded-full hover:bg-white hover:bg-opacity-5 items-center"
                >
                  <img
                    class="h-12 w-12 border-2 border-black rounded-full"
                    src="https://raw.communitydragon.org/latest/game/assets/ux/summonericons/profileicon2074.png"
                    alt="icon-1"
                  />
                  <span class="">{summonerName}</span>
                </div>
                <div
                  class="flex space-x-16 rounded-full hover:bg-white hover:bg-opacity-5 items-center"
                >
                  <img
                    class="h-12 w-12 border-2 border-black rounded-full"
                    src="https://raw.communitydragon.org/latest/game/assets/ux/summonericons/profileicon2076.png"
                    alt="icon-1"
                  />
                  <span class="">Ntvvckda</span>
                </div>
                <div
                  class="flex space-x-16 rounded-full hover:bg-white hover:bg-opacity-5 items-center"
                >
                  <img
                    class="h-12 w-12 border-2 border-black rounded-full"
                    src="https://raw.communitydragon.org/latest/game/assets/ux/summonericons/profileicon2077.png"
                    alt="icon-1"
                  />
                  <span class="">Madart</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- Right Sidebar End -->
      </div>
    </div>
  </div>
</main>
