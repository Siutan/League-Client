<script>
  //TODO:
  // - Write to file only if previous accounts not found, if found, prompt overwrite.
  // - Make app read summoner names from savedData.json

  // props go here

  //imports
  import "tw-elements";
  import LeftSidebar from "./components/leftSideBar.svelte";
  import RightSidebar from "./components/rightSideBar.svelte";
  import BlankMatchCard from "./components/matchCardSkeleton.svelte";
  import RankCard from "./components/rankCard.svelte";
  import ChampionStatsCard from "./components/championStatsCard.svelte";

  // get config
  let appConfig = {};

  // stats data
  let rankedJson = {};
  let championStats = {};

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

    rankedJson = {
      soloQ: {
        rank: summonerBasic.ranked.soloQ.fullRank,
        lp: summonerBasic.ranked.soloQ.leaguePoints,
        winRate: summonerBasic.ranked.soloQ.winrate,
        played:
          summonerBasic.ranked.soloQ.wins + summonerBasic.ranked.soloQ.losses,
      },
      flex5v5: {
        rank: summonerBasic.ranked.flex5v5.fullRank,
        lp: summonerBasic.ranked.flex5v5.leaguePoints,
        winRate: summonerBasic.ranked.flex5v5.winrate,
        played:
          summonerBasic.ranked.flex5v5.wins +
          summonerBasic.ranked.flex5v5.losses,
      },
    };

    console.log(rankedJson);

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

    championStats = summonerOverview.stats.champion;

    //summoner perks
    let getPerks = await fetch("https://api.leaguestats.gg/cdragon/runes");
    perks = await getPerks.json();
  }

  // Get Champion Info
  function getChampion(info, matchIndex) {
    return summonerOverview.matchesDetails[matchIndex].champion[info];
  }

  // Get win or loss
  function getWinLoss(matchIndex, usage) {
    // if usage = style, change style depending on win or loss
    if (usage === "style") {
      if (summonerOverview.matchesDetails[matchIndex].result === "Win") {
        return "text-blue-500";
      } else {
        return "text-red-500";
      }
    } else {
      // if usage = text, return win or loss
      if (summonerOverview.matchesDetails[matchIndex].result === "Win") {
        return "VICTORY";
      } else {
        return "DEFEAT";
      }
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
    let seconds = time - minutes * 60;
    return minutes + ":" + seconds;
  }
  function timeAgo(input) {
    const date = input instanceof Date ? input : new Date(input);
    const formatter = new Intl.RelativeTimeFormat("en");
    const ranges = {
      years: 3600 * 24 * 365,
      months: 3600 * 24 * 30,
      weeks: 3600 * 24 * 7,
      days: 3600 * 24,
      hours: 3600,
      minutes: 60,
      seconds: 1,
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

  console.log(summonerBasic);
</script>

<main class="overflow-hidden">
  <div
    class="bg-gray-500 flex flex-col h-screen bg-gradient-to-b from-pink-700 via-palette-600 to-palette-800"
  >
    <div class="relative h-5 bg-opacity-50" style="-webkit-app-region: drag">
      <span class="float-right top-2 right-2 ">
        <button
          on:click={handleClose}
          type="button"
          class="rounded-md pr-4 pt-2 inline-flex items-center justify-center text-gray-400 hover:text-red-500"
        >
          <span class="text-3xl font-medium">&times;</span>
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
              class="bg-palette-900 space-x-2 rounded-full h-14 w-32 flex items-center justify-center"
            >
              <img class="h-8 w-8" src="../public/img/play_btn.png" alt="" />
              <span class="text-lg text-white font-bold leading-none">PLAY</span
              >
            </div>
            <!-- Match History -->
            <div class="flex flex-row gap-8">
              <div
                class="overflow-hidden p-8 space-y-8 bg-palette-900 bg-opacity-50 h-full w-300 rounded-lg"
              >
                <div class="border-10 border-l-4 border-palette-100 mb-5">
                  <p class="pl-1 text-palette-100">Match History</p>
                </div>
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
                            <p class=" font-extrabold {getWinLoss(i, 'style')}">
                              {getWinLoss(i, 'text')}
                            </p>
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
                            <p class="text-yellow-600 ">
                              {getStats("gold", i)}
                            </p>
                            <p class="text-red-800 ">{getStats("damage", i)}</p>
                            <p class="text-purple-700">
                              {getStats("kp", i)}% KP
                            </p>
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
              <!--- Start other stats-->
              <div class="flex flex-col gap-3">
                {#await getData()}
                  <div class="text-white font-bold text-md">Loading...</div>
                {:then pog}
                  <RankCard {rankedJson} />
                  <ChampionStatsCard {championStats} />
                {/await}
              </div>
              <!--- End other stats-->
            </div>
          </div>
        </div>
        <!-- Main Content End -->

        <!-- Right Sidebar Start -->
        <RightSidebar />
        <!-- Right Sidebar End -->
      </div>
    </div>
  </div>
</main>
