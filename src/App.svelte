<script>
  // imports
  export let summonerIcon;
  export let summonerLevel;
  export let summonerName;
  import LeftSidebar from "./components/leftSideBar.svelte";
  import BlankMatchCard from "./components/matchCard.svelte";

  //close btn
  function handleClose() {
    window.api.titlebar("kill");
  }
  //fetch summoner basic
  let summonerBasic;
  let summonerOverview;
  let perks;

  async function getsums() {
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

    // sumoner Overview
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
      return "bg-blue-900";
    } else {
      return "bg-red-900";
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
    }
  }

  // Get Stats
  function getStats(stat, matchIndex) {
    if (stat === "level") {
      return summonerOverview.matchesDetails[matchIndex].level;
    } else {
      return summonerOverview.matchesDetails[matchIndex].stats[stat];
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

  // Get Gold
  function getGold(matchIndex) {
    let gold = summonerOverview.matchesDetails[matchIndex].stats.gold;
    return formatThousand(gold);
  }

  // Get Damage
  function getDamage(matchIndex) {
    let damage = summonerOverview.matchesDetails[matchIndex].stats.dmgChamp;
    return formatThousand(damage);
  }

  // get runes
  function getPerks(perkType, matchIndex) {
    if (perkType === "primary") {

      try {
        let perk = summonerOverview.matchesDetails[matchIndex].perks.selected[0];
        let primaryPerk = perks.perks[perk].icon;
        primaryPerk = primaryPerk.substring(primaryPerk.indexOf("Styles/") + 1);
        primaryPerk = `https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/perk-images/s${primaryPerk.toLowerCase()}`
        return primaryPerk;
      } catch (error) {
        return "https://upload.wikimedia.org/wikipedia/commons/thumb/5/50/Black_colour.jpg/220px-Black_colour.jpg";
      }

    } else {

      try {
        let perk = summonerOverview.matchesDetails[matchIndex].perks.secondaryStyle;
        let secondaryPerk = perks.perkstyles[perk].icon;
        secondaryPerk = secondaryPerk.substring(secondaryPerk.indexOf("Styles/") + 1);
        secondaryPerk = `https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/perk-images/s${secondaryPerk.toLowerCase()}`
        return secondaryPerk;
      } catch (error) {
        return "https://upload.wikimedia.org/wikipedia/commons/thumb/5/50/Black_colour.jpg/220px-Black_colour.jpg";
      }

    }
  }

  //get summoner spells
  function getSpells(spellIndex, matchIndex) {
    if (spellIndex === 1) {
      try {
        return summonerOverview.matchesDetails[matchIndex].summonerSpell1.icon;
      } catch (error) {
        return "https://upload.wikimedia.org/wikipedia/commons/thumb/5/50/Black_colour.jpg/220px-Black_colour.jpg";
      }
    } else if (spellIndex === 2) {
      try {
        return summonerOverview.matchesDetails[matchIndex].summonerSpell2.icon;
      } catch (error) {
        return "https://upload.wikimedia.org/wikipedia/commons/thumb/5/50/Black_colour.jpg/220px-Black_colour.jpg";
      }
    }
  }
</script>

<main class="overflow-hidden">
  <div class="bg-gray-500 flex flex-col h-screen bg-background-1">
    <div class="relative h-5" style="-webkit-app-region: drag">
      <span class="absolute inset-y-1 right-2">
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
              class="overflow-hidden p-10 space-y-8 bg-black bg-opacity-80 h-xl w-300 rounded-6xl"
            >
              <!-- Match Card -->
              {#await getsums()}
                <BlankMatchCard/>
                <BlankMatchCard/>
                <BlankMatchCard/>
              {:then pog}
                {#each Array(3) as _, i}
                  <div
                    class=" overflow-hidden justify-center items-center place-content-center relative bg-opacity-50 rounded-3xl h-28 w-full place-items-center {getWinLoss(
                      i
                    )} "
                  >
                    <div
                      class=" text-white flex flex-wrap place-content-center h-full"
                    >
                      <div>
                        <div class="flex">
                          <div class="flex flex-col items-center justify-end">
                            <div
                              class="h-6 text-base font-extrabold leading-none text-teal-500 uppercase"
                            >
                              {getChampion("alias", i)}

                            </div>
                            <div
                              class="w-10 text-xs font-extrabold text-center text-teal-500"
                            >
                              LVL {getStats("level", i)}
                            </div>
                            <div
                              class="relative z-30 flex items-end h-6 text-sm font-extrabold text-white"
                            >
                              {getGamemode(i)}
                            </div>
                          </div>
                          <img
                            class=" object-fill w-20 h-20 ml-2 rounded-full justify-center crop-champion items-center bg-blue-900"
                            draggable="false"
                            src={getChampion("icon", i)}
                            alt=""
                          />
                          <div class="flex flex-col justify-around ml-2">
                            <img
                              class="w-6 h-6 bg-center bg-cover rounded-md bg-blue-900"
                              draggable="false"
                              src={getSpells(1, i)}
                              alt=""
                            />
                            <img
                              class="w-6 h-6 bg-center bg-cover rounded-md bg-blue-900"
                              draggable="false"
                              src={getSpells(2, i)}
                              alt=""
                            />
                          </div>
                          <div class="flex flex-col justify-around ml-1">
                            <img
                              class="w-6 h-6 rounded-md bg-blue-1000"
                              draggable="false"
                              src={getPerks("primary", i)}
                              alt=""
                            />
                            <img
                              class="w-6 h-6 rounded-md bg-blue-1000"
                              draggable="false"
                              src={getPerks("secondary", i)}
                              alt=""
                            />
                          </div>
                          <div
                            class="flex flex-col items-center justify-center"
                          >
                            <div
                              class="pl-8 text-base font-extrabold text-teal-500"
                            >
                              <span>{getStats("kills", i)}</span>
                              <span>/</span>
                              <span class="text-red-500"
                                >{getStats("kills", i)}</span
                              >
                              <span>/</span>
                              <span>{getStats("assists", i)}</span>
                            </div>
                            <div
                              class="relative pl-3 z-30 mt-2 text-xs font-extrabold text-white"
                            >
                              {getStats("kda", i)} KDA
                            </div>
                          </div>
                          <div class="pl-10 flex items-center py-6 second">
                            <div class="flex items-6-rows flex-wrap">
                              <div>
                                <div aria-haspopup="true">
                                  <div class="relative">
                                    <img
                                      class="relative z-10 bg-center bg-cover rounded-md bg-blue-1000 ml-1 w-8 h-8 cursor-pointer"
                                      draggable="false"
                                      src={getItems(0, i)}
                                      alt=""
                                    />
                                  </div>
                                </div>
                              </div>
                              <div>
                                <div aria-haspopup="true">
                                  <div class="relative">
                                    <img
                                      class="relative z-10 bg-center bg-cover rounded-md bg-blue-1000 ml-1 w-8 h-8 cursor-pointer"
                                      draggable="false"
                                      src={getItems(1, i)}
                                      alt=""
                                    />
                                  </div>
                                </div>
                              </div>
                              <div>
                                <div aria-haspopup="true">
                                  <div class="relative">
                                    <img
                                      class="relative z-10 bg-center bg-cover rounded-md bg-blue-1000 ml-1 w-8 h-8 cursor-pointer"
                                      draggable="false"
                                      src={getItems(2, i)}
                                      alt=""
                                    />
                                  </div>
                                </div>
                              </div>
                              <div>
                                <div aria-haspopup="true">
                                  <div class="relative">
                                    <img
                                      class="relative z-10 bg-center bg-cover rounded-md bg-blue-1000 ml-1 w-8 h-8 cursor-pointer"
                                      draggable="false"
                                      src={getItems(3, i)}
                                      alt=""
                                    />
                                  </div>
                                </div>
                              </div>
                              <div>
                                <div aria-haspopup="true">
                                  <div class="relative">
                                    <img
                                      class="relative z-10 bg-center bg-cover rounded-md bg-blue-1000 ml-1 w-8 h-8 cursor-pointer"
                                      draggable="false"
                                      src={getItems(4, i)}
                                      alt=""
                                    />
                                  </div>
                                </div>
                              </div>
                              <div>
                                <div aria-haspopup="true">
                                  <div class="relative">
                                    <img
                                      class="relative z-10 bg-center bg-cover rounded-md bg-blue-1000 ml-1 w-8 h-8 cursor-pointer"
                                      draggable="false"
                                      src={getItems(5, i)}
                                      alt=""
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div class="relative ml-4">
                            <div class="flex items-center">
                              <div class="ml-1 text-sm font-bold text-teal-500">
                                {getStats("minions", i)}
                              </div>
                            </div>
                            <div class="flex items-center">
                              <div class="ml-1 text-sm font-bold gold">
                                {getGold(i)}
                              </div>
                            </div>
                            <div class="flex items-center">
                              <div class="ml-1 text-sm font-bold damage">
                                {getDamage(i)}
                              </div>
                            </div>
                            <div class="flex items-center">
                              <div class="ml-1 text-sm font-bold kp">
                                {getStats("kp", i)}%
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <!-- End Await -->
                {/each}
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

<style>
  .crop-champion {
    background-size: 74px;
    background-position: center;
  }
  .gold {
    color: #f3a05a;
  }
  .damage {
    color: #e25656;
  }
  .kp {
    color: #b78787;
  }
</style>
