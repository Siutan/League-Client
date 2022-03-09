<script>
    // imports
    export let summonerIcon;
    export let summonerLevel;
    export let summonerName;
    export let fetchSummonerOverview;

    // conditional output
    let yes = false;

    if (yes === true) {
        console.log(summonerName)
    }

    //close btn
    function handleClose(e) {
        window.api.titlebar("kill")
    }

    // Summoner Basic from Local Storage

    // Summoner Overview from Local Storage
    let summonerOverview = JSON.parse(localStorage.getItem("summonerOverview"));

    // Get Champion Info
    function getChampion(info, matchIndex) {
        return summonerOverview.matchesDetails[matchIndex].champion[info];
    }

    // Get Stats
    function getStats(stat, matchIndex) {
        if (stat === "level") {
            return summonerOverview.matchesDetails[matchIndex].level;
        } else {
            return summonerOverview.matchesDetails[matchIndex].stats[stat];
        }
    }

    // Get win or loss
    function getWinLoss(x) {
        console.log(summonerOverview.matchesDetails[x].result)
        if (summonerOverview.matchesDetails[x].result === "Win") {
            return "bg-blue-900"
        } else {
            return "bg-red-900"
        }
    }

    // Get Gamemode
    function getGamemode(matchIndex) {
        let gameMode = summonerOverview.matchesDetails[matchIndex].gamemode;
        switch (gameMode) {
            case 400 :
                gameMode = "Draft 5v5";
                return gameMode;
            case 420 :
                gameMode = "Solo/Duo";
                return gameMode;
            case 430 :
                gameMode = "Blind 5v5";
                return gameMode;
            case 440 :
                gameMode = "Ranked Flex";
                return gameMode;
            case 450 :
                gameMode = "ARAM";
                return gameMode;
        }
    }

    // Get Items
    function getItems(matchIndex, itemIndex){
        return summonerOverview.matchesDetails[matchIndex].items[itemIndex].image;
    }

    // define function to format thousands to k, eg: 1000 > 1k
    function formatThousand(num) {
        return Math.abs(num) > 999 ? Math.sign(num)*((Math.abs(num)/1000).toFixed(1)) + 'k' : Math.sign(num)*Math.abs(num)
    }

    // Get Gold
    function getGold(matchIndex) {
        let gold = summonerOverview.matchesDetails[matchIndex].stats.gold;
        console.log(gold);
        return formatThousand(gold);
    }

    // Get Damage
    function getDamage(matchIndex) {
        let damage = summonerOverview.matchesDetails[matchIndex].stats.dmgChamp;
        return formatThousand(damage);
    }



</script>

<main class="overflow-hidden">
    <div class="bg-gray-500 flex flex-col h-screen bg-background-1">
        <div class="relative h-5" style="-webkit-app-region: drag">
      <span class="absolute inset-y-1 right-2">
        <button on:click="{handleClose}" type="button" class="rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-red-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
          <span class="sr-only">Close menu</span>
            <!-- Heroicon name: outline/x -->
          <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </span>
            <div class="justify-center items-center">
                <!-- Left Sidebar Start -->
                <div class="flex flex-col items-center w-16 h-screen bg-black bg-opacity-50 text-gray-100 border-r-4 border-opacity-40 border-black">
                    <!-- Logo -->
                    <a class="flex items-center justify-center mt-10" href="#">
                        <svg class="w-8 h-8 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M11 17a1 1 0 001.447.894l4-2A1 1 0 0017 15V9.236a1 1 0 00-1.447-.894l-4 2a1 1 0 00-.553.894V17zM15.211 6.276a1 1 0 000-1.788l-4.764-2.382a1 1 0 00-.894 0L4.789 4.488a1 1 0 000 1.788l4.764 2.382a1 1 0 00.894 0l4.764-2.382zM4.447 8.342A1 1 0 003 9.236V15a1 1 0 00.553.894l4 2A1 1 0 009 17v-5.764a1 1 0 00-.553-.894l-4-2z" />
                        </svg>
                    </a>
                    <!-- Top Icons -->
                    <div class="top-50 flex flex-col items-center mt-20">
                        <!-- Home -->
                        <a class="flex items-center justify-center w-12 h-12 mt-2 rounded-full hover:bg-white hover:bg-opacity-5 hover:text-gray-300" href="#">
                            <svg class="w-6 h-6 stroke-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                            </svg>
                        </a>
                    </div>
                    <!-- Bottom Icons -->
                    <div class="flex flex-col items-center mt-20">
                        <!-- League of Legends -->
                        <a class="flex items-center justify-center w-12 h-12 mt-2 rounded-full hover:bg-white hover:bg-opacity-5 hover:text-gray-300" href="#">
                            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 30 30" width="30px" height="30px">
                                <g id="surface6542987">
                                    <path style=" stroke:none;fill-rule:nonzero;fill:rgb(93.333334%,93.333334%,93.333334%);fill-opacity:1;" d="M 7 4 L 9 7.25 L 9 22.75 L 6.875 26 L 21.957031 26 L 25 22 L 14 22 L 14 4 Z M 16 4.050781 L 16 6.058594 C 20.492188 6.558594 24 10.375 24 15 C 24 16.847656 23.4375 18.570312 22.480469 20 L 24.785156 20 C 25.554688 18.496094 26 16.800781 26 15 C 26 9.273438 21.597656 4.558594 16 4.050781 Z M 6.875 7.609375 C 5.09375 9.566406 4 12.15625 4 15 C 4 17.835938 5.089844 20.417969 6.855469 22.371094 L 7 22.15625 L 7 19.105469 C 6.363281 17.871094 6 16.480469 6 15 C 6 13.519531 6.363281 12.128906 7 10.894531 L 7 7.816406 Z M 6.875 7.609375 " />
                                </g>
                            </svg>
                        </a>
                        <!-- Valorant -->
                        <a class="flex items-center justify-center w-12 h-12 mt-2 rounded-full hover:bg-white hover:bg-opacity-5 hover:text-gray-300" href="#">
                            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24" width="24px" height="24px">
                                <g id="surface6550042">
                                    <path style=" stroke:none;fill-rule:nonzero;fill:rgb(93.333334%,93.333334%,93.333334%);fill-opacity:1;" d="M 16.191406 21 L 7.546875 21 L 0 12.375 L 0 2.320312 Z M 8.453125 19 L 11.808594 19 L 2 7.679688 L 2 11.625 Z M 21.535156 16 L 13.953125 16 L 24 3.085938 L 24 12.300781 Z M 18.042969 14 L 20.464844 14 L 22 11.695312 L 22 8.914062 Z M 18.042969 14 " />
                                </g>
                            </svg>
                        </a>
                        <!-- Legends of Runeterra -->
                        <a class="relative flex items-center justify-center w-12 h-12 mt-2 rounded hover:bg-white hover:bg-opacity-5 hover:text-gray-300" href="#">
                            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 48 48" width="30px" height="30px">
                                <g id="surface6557498">
                                    <path style=" stroke:none;fill-rule:nonzero;fill:rgb(93.333334%,93.333334%,93.333334%);fill-opacity:1;" d="M 24 43.996094 L 11.476562 38.957031 L 10.492188 28.425781 L 11.011719 27.875 C 11.601562 27.253906 11.925781 26.445312 11.925781 25.597656 C 11.925781 24.523438 11.421875 23.542969 10.539062 22.910156 L 9.929688 22.46875 L 8.519531 7.398438 L 15.949219 4 L 32.046875 4 L 39.480469 7.398438 L 38.066406 22.46875 L 37.457031 22.910156 C 36.578125 23.542969 36.070312 24.523438 36.070312 25.597656 C 36.070312 26.445312 36.394531 27.253906 36.984375 27.875 L 37.507812 28.425781 L 36.519531 38.957031 Z M 14.507812 36.605469 L 24 40.425781 L 33.488281 36.605469 L 34.148438 29.578125 C 33.296875 28.433594 32.835938 27.046875 32.835938 25.597656 C 32.835938 23.726562 33.625 21.945312 34.980469 20.691406 L 36.035156 9.460938 L 31.359375 7.324219 L 16.640625 7.324219 L 11.964844 9.460938 L 13.019531 20.691406 C 14.371094 21.945312 15.164062 23.726562 15.164062 25.597656 C 15.164062 27.046875 14.703125 28.433594 13.851562 29.578125 Z M 14.507812 36.605469 " />
                                    <path style=" stroke:none;fill-rule:nonzero;fill:rgb(93.333334%,93.333334%,93.333334%);fill-opacity:1;" d="M 31.417969 36 L 30.359375 33.351562 L 26.980469 23.695312 C 29.449219 20.84375 30.09375 18.023438 30.09375 15.863281 C 30.09375 11.839844 27.179688 10.050781 25.019531 10.050781 L 21.882812 10.039062 L 21.882812 10.035156 L 16.582031 10.035156 L 18.171875 13.214844 L 18.171875 33.351562 L 17.109375 36 L 22.941406 36 L 21.878906 33.351562 L 21.878906 27.863281 C 22.011719 27.769531 22.125 27.691406 22.15625 27.671875 C 22.886719 27.222656 23.550781 26.761719 24.160156 26.300781 L 26.648438 33.347656 L 26.121094 36 Z M 21.878906 24.039062 L 21.878906 13 L 24.652344 13 C 25.589844 13 26.914062 13.621094 26.914062 15.648438 C 26.914062 18.675781 25.222656 21.636719 21.878906 24.039062 Z M 21.878906 24.039062 " />
                                </g>
                            </svg>
                        </a>
                    </div>
                    <!-- Settings -->
                    <a class="flex items-center justify-center w-16 h-16 mt-auto rounded-full hover:bg-white hover:bg-opacity-5 hover:bg-gray-900" href="#">
                        <svg class="w-6 h-6 stroke-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </a>
                </div>
                <!-- Left Sidebar End  -->
                <!-- Main Content -->
                <div class="fixed top-40 inset-y-0 left-64 flex justify-center items-center">
                    <div class="container space-y-4">
                        <h1 class="text-4xl font-mono text-white font-extrabold">LEAGUE OF LEGENDS</h1>
                        <div class="bg-blue-100 space-x-2 rounded-full h-14 w-28 flex items-center justify-center">
                            <img class="h-8 w-8" src="../public/img/play_btn.png" alt="" />
                            <span class="text-lg font-extrabold leading-none">PLAY</span>
                        </div>
                        <!-- Match History -->
                        <div class="overflow-hidden p-10 space-y-8 bg-black bg-opacity-80 h-xl w-300 rounded-lg">
                            <!-- Match Card -->
                            <div class=" overflow-hidden justify-center items-center place-content-center relative {getWinLoss(0)} bg-opacity-50 rounded-lg h-28 w-full ">
                                <div class="relative text-white flex flex-wrap px-5 py-3">
                                    <div>
                                        <div class="flex">
                                            <div class="flex flex-col items-center justify-end">
                                                <div class="h-6 text-lg font-extrabold leading-none text-teal-500 uppercase">{getChampion("alias", 0)}</div>
                                                <div class="w-10 text-xs font-extrabold text-center text-teal-500">LVL {getStats("level" , 0)}</div>
                                                <div class="relative z-30 flex items-end h-6 text-sm font-extrabold text-white">{getGamemode(0)}</div>
                                            </div>
                                            <img class=" object-fill w-20 h-20 ml-2 rounded-full justify-center crop-champion items-center bg-blue-900" draggable="false" src={getChampion("icon", 0)} alt="" />
                                            <div class="flex flex-col justify-around ml-2">
                                                <img class="w-6 h-6 bg-center bg-cover rounded-md bg-blue-900" draggable="false" src="https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/data/spells/icons2d/summoner_flash.png" alt="" />
                                                <img class="w-6 h-6 bg-center bg-cover rounded-md bg-blue-900" draggable="false" src="https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/data/spells/icons2d/summoner_teleport.png" alt="" />
                                            </div>
                                            <div class="flex flex-col justify-around ml-1">
                                                <img class="w-6 h-6 rounded-md bg-blue-1000" draggable="false" src="https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/perk-images/styles/domination/electrocute/electrocute.png" alt="" />
                                                <img class="w-6 h-6 rounded-md bg-blue-1000" draggable="false" src="https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/perk-images/styles/7203_whimsy.png" alt="" />
                                            </div>
                                            <div class="flex flex-col items-center justify-center">
                                                <div class="pl-10 text-xl font-extrabold text-teal-500">
                                                    <span>{getStats("kills", 0)}</span>
                                                    <span>/</span>
                                                    <span class="text-red-500">{getStats("deaths", 0)}</span>
                                                    <span>/</span>
                                                    <span>{getStats("assists", 0)}</span>
                                                </div>
                                                <div class="relative pl-3 z-30 mt-2 text-xs font-extrabold text-white">{getStats("kda", 0)} KDA</div>
                                            </div>
                                            <div class="pl-10 flex items-center py-6 second">
                                                <div class="flex items-6-rows flex-wrap">
                                                    <div>
                                                        <div aria-haspopup="true">
                                                            <div class="relative">
                                                                <img class="relative z-10 bg-center bg-cover rounded-md bg-blue-1000 ml-1 w-8 h-8 cursor-pointer" draggable="false" src={getItems(0, 0)} alt="" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <div aria-haspopup="true">
                                                            <div class="relative">
                                                                <img class="relative z-10 bg-center bg-cover rounded-md bg-blue-1000 ml-1 w-8 h-8 cursor-pointer" draggable="false" src={getItems(0, 1)} alt="" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <div aria-haspopup="true">
                                                            <div class="relative">
                                                                <img class="relative z-10 bg-center bg-cover rounded-md bg-blue-1000 ml-1 w-8 h-8 cursor-pointer" draggable="false" src={getItems(0, 2)} alt="" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <div aria-haspopup="true">
                                                            <div class="relative">
                                                                <img class="relative z-10 bg-center bg-cover rounded-md bg-blue-1000 ml-1 w-8 h-8 cursor-pointer" draggable="false" src={getItems(0, 3)} alt="" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <div aria-haspopup="true">
                                                            <div class="relative">
                                                                <img class="relative z-10 bg-center bg-cover rounded-md bg-blue-1000 ml-1 w-8 h-8 cursor-pointer" draggable="false" src={getItems(0, 4)} alt="" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <div aria-haspopup="true">
                                                            <div class="relative">
                                                                <img class="relative z-10 bg-center bg-cover rounded-md bg-blue-1000 ml-1 w-8 h-8 cursor-pointer" draggable="false" src={getItems(0, 5)} alt="" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="relative ml-4">
                                                <div class="flex items-center">
                                                    <div class="ml-1 text-sm font-bold text-teal-500">{getStats("minions", 0)} cs</div>
                                                </div>
                                                <div class="flex items-center">
                                                    <div class="ml-1 text-sm font-bold gold">{getGold(0)}</div>
                                                </div>
                                                <div class="flex items-center">
                                                    <div class="ml-1 text-sm font-bold damage">{getDamage(0)}</div>
                                                </div>
                                                <div class="flex items-center">
                                                    <div class="ml-1 text-sm font-bold kp">{getStats("kp", 0)}%</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <!-- Match Card -->
                            <div class=" overflow-hidden justify-center items-center place-content-center relative bg-blue-900 bg-opacity-50 rounded-lg h-28 w-full ">
                                <div class="relative  text-white flex flex-wrap px-5 py-3">
                                    <div>
                                        <div class="flex">
                                            <div class="flex flex-col items-center justify-end">
                                                <div class="h-6 text-lg font-extrabold leading-none text-teal-500 uppercase">{getChampion("alias", 1)}</div>
                                                <div class="w-10 text-xs font-extrabold text-center text-teal-500">LVL {getStats("level", 1)}</div>
                                                <div class="relative z-30 flex items-end h-6 text-sm font-extrabold leading-none text-white">{getGamemode(1)}</div>
                                            </div>
                                            <img class="w-20 h-20 ml-2 rounded-full justify-center items-center bg-blue-900" src="https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/85.png" alt="" />
                                            <div class="flex flex-col justify-around ml-2">
                                                <img class="w-6 h-6 bg-center bg-cover rounded-md bg-blue-900" src="https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/data/spells/icons2d/summoner_flash.png" alt="" />
                                                <img class="w-6 h-6 bg-center bg-cover rounded-md bg-blue-900" src="https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/data/spells/icons2d/summoner_teleport.png" alt="" />
                                            </div>
                                            <div class="flex flex-col justify-around ml-1">
                                                <img class="w-6 h-6 rounded-md bg-blue-1000" src="https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/perk-images/styles/domination/electrocute/electrocute.png" alt="" />
                                                <img class="w-6 h-6 rounded-md bg-blue-1000" src="https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/perk-images/styles/7203_whimsy.png" alt="" />
                                            </div>
                                            <div class="flex flex-col items-center justify-center">
                                                <div class="pl-10 text-xl font-extrabold text-teal-500">
                                                    <span>{getStats("kills", 1)}</span>
                                                    <span>/</span>
                                                    <span class="text-red-500">{getStats("deaths", 1)}</span>
                                                    <span>/</span>
                                                    <span>{getStats("assists", 1)}</span>
                                                </div>
                                                <div class="relative z-30 pl-3 mt-2 text-xs font-extrabold text-white">{getStats("kda", 1)} KDA</div>
                                            </div>
                                            <div class="pl-10 flex items-center py-6 second">
                                                <div class="flex items-6-rows flex-wrap">
                                                    <div>
                                                        <div aria-haspopup="true">
                                                            <div class="relative">
                                                                <img class="relative z-10 bg-center bg-cover rounded-md bg-blue-1000 ml-1 w-8 h-8 cursor-pointer" draggable="false" src={getItems(1, 0)} alt="" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <div aria-haspopup="true">
                                                            <div class="relative">
                                                                <img class="relative z-10 bg-center bg-cover rounded-md bg-blue-1000 ml-1 w-8 h-8 cursor-pointer" draggable="false" src={getItems(1, 1)} alt="" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <div aria-haspopup="true">
                                                            <div class="relative">
                                                                <img class="relative z-10 bg-center bg-cover rounded-md bg-blue-1000 ml-1 w-8 h-8 cursor-pointer" draggable="false" src={getItems(1, 2)} alt="" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <div aria-haspopup="true">
                                                            <div class="relative">
                                                                <img class="relative z-10 bg-center bg-cover rounded-md bg-blue-1000 ml-1 w-8 h-8 cursor-pointer" draggable="false" src={getItems(1, 3)} alt="" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <div aria-haspopup="true">
                                                            <div class="relative">
                                                                <img class="relative z-10 bg-center bg-cover rounded-md bg-blue-1000 ml-1 w-8 h-8 cursor-pointer" draggable="false" src={getItems(1, 4)} alt="" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <div aria-haspopup="true">
                                                            <div class="relative">
                                                                <img class="relative z-10 bg-center bg-cover rounded-md bg-blue-1000 ml-1 w-8 h-8 cursor-pointer" draggable="false" src={getItems(1, 5)} alt="" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="relative ml-4">
                                                <div class="flex items-center">
                                                    <div class="ml-1 text-sm font-bold text-teal-300">{getStats("minions", 1)} <span class="font-normal">cs</span>
                                                    </div>
                                                </div>
                                                <div class="flex items-center">
                                                    <div class="ml-1 text-sm font-bold gold">{getGold(1)}</div>
                                                </div>
                                                <div class="flex items-center">
                                                    <div class="ml-1 text-sm font-bold damage">{getDamage(1)}</div>
                                                </div>
                                                <div class="flex items-center">
                                                    <div class="ml-1 text-sm font-bold kp">{getStats("kp", 1)}%</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <!-- Match Card -->
                            <div class="overflow-hidden justify-center items-center place-content-center relative bg-blue-900 bg-opacity-50 rounded-lg h-28 w-full ">
                                <div class="relative text-white flex flex-wrap px-5 py-3">
                                    <div>
                                        <div class="flex">
                                            <div class="flex flex-col items-center justify-end">
                                                <div class="h-6 text-lg font-extrabold leading-none text-teal-500 uppercase">{getChampion("alias", 2)}</div>
                                                <div class="w-10 text-xs font-extrabold text-center text-teal-500">LVL {getStats("level", 2)}</div>
                                                <div class="relative z-30 flex items-end h-6 text-sm font-extrabold leading-none text-white">{getGamemode(2)}</div>
                                            </div>
                                            <img class="w-20 h-20 ml-2 rounded-full justify-center items-center bg-blue-900" src="https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/85.png" alt="" />
                                            <div class="flex flex-col justify-around ml-2">
                                                <img class="w-6 h-6 bg-center bg-cover rounded-md bg-blue-900" src="https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/data/spells/icons2d/summoner_flash.png" alt="" />
                                                <img class="w-6 h-6 bg-center bg-cover rounded-md bg-blue-900" src="https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/data/spells/icons2d/summoner_teleport.png" alt="" />
                                            </div>
                                            <div class="flex flex-col justify-around ml-1">
                                                <img class="w-6 h-6 rounded-md bg-blue-1000" src="https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/perk-images/styles/domination/electrocute/electrocute.png" alt="" />
                                                <img class="w-6 h-6 rounded-md bg-blue-1000" src="https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/perk-images/styles/7203_whimsy.png" alt="" />
                                            </div>
                                            <div class="flex flex-col items-center justify-center">
                                                <div class="pl-10 text-xl font-extrabold text-teal-500">
                                                    <span>2</span>
                                                    <span>/</span>
                                                    <span>3</span>
                                                    <span>/</span>
                                                    <span>1</span>
                                                </div>
                                                <div class="relative z-30 mt-2 text-xs font-extrabold text-white">1 KDA</div>
                                            </div>
                                            <div class="pl-10 flex items-center py-6 second">
                                                <div class="flex items-6-rows flex-wrap">
                                                    <div>
                                                        <div aria-haspopup="true">
                                                            <div class="relative">
                                                                <img class="relative z-10 bg-center bg-cover rounded-md bg-blue-1000 ml-1 w-8 h-8 cursor-pointer" draggable="false" src={getItems(0, 3)} alt="" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <div aria-haspopup="true">
                                                            <div class="relative">
                                                                <img class="relative z-10 bg-center bg-cover rounded-md bg-blue-1000 ml-1 w-8 h-8 cursor-pointer" draggable="false" src={getItems(0, 3)} alt="" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <div aria-haspopup="true">
                                                            <div class="relative">
                                                                <img class="relative z-10 bg-center bg-cover rounded-md bg-blue-1000 ml-1 w-8 h-8 cursor-pointer" draggable="false" src={getItems(0, 3)} alt="" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <div aria-haspopup="true">
                                                            <div class="relative">
                                                                <img class="relative z-10 bg-center bg-cover rounded-md bg-blue-1000 ml-1 w-8 h-8 cursor-pointer" draggable="false" src={getItems(0, 3)} alt="" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <div aria-haspopup="true">
                                                            <div class="relative">
                                                                <img class="relative z-10 bg-center bg-cover rounded-md bg-blue-1000 ml-1 w-8 h-8 cursor-pointer" draggable="false" src={getItems(0, 3)} alt="" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <div aria-haspopup="true">
                                                            <div class="relative">
                                                                <img class="relative z-10 bg-center bg-cover rounded-md bg-blue-1000 ml-1 w-8 h-8 cursor-pointer" draggable="false" src={getItems(0, 3)} alt="" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="relative ml-4">
                                                <div class="flex items-center">
                                                    <div class="ml-1 text-sm font-bold text-teal-300">181 <span class="font-normal">cs</span>
                                                    </div>
                                                </div>
                                                <div class="flex items-center">
                                                    <div class="ml-1 text-sm font-bold gold">8.9k</div>
                                                </div>
                                                <div class="flex items-center">
                                                    <div class="ml-1 text-sm font-bold damage">7.6k</div>
                                                </div>
                                                <div class="flex items-center">
                                                    <div class="ml-1 text-sm font-bold kp">15%</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- Main Content End -->
                <!-- Right Sidebar Start -->
                <div>
                    <div class="absolute inset-y-96 right-0 h-72 w-16">
                        <div class="hover:w-80 hover:bg-opacity-90 overflow-visible duration-1000 absolute border-opacity-40 border-t-2 border-l-2 border-b-2 text-white p-3 bg-opacity-50 border-black bg-black rounded-l-3xl inset-y-0 right-0 w-20">
                            <div class="h-full items-center grid grid-cols-1 whitespace-nowrap">
                                <div class="flex space-x-16 rounded-full hover:bg-white hover:bg-opacity-5 items-center">
                                    <img class="h-12 w-12 border-2 border-black rounded-full" src="https://raw.communitydragon.org/latest/game/assets/ux/summonericons/profileicon2074.png" alt="icon-1">
                                    <span class="">{summonerName}</span>
                                </div>
                                <div class="flex space-x-16 rounded-full hover:bg-white hover:bg-opacity-5 items-center">
                                    <img class="h-12 w-12 border-2 border-black rounded-full" src="https://raw.communitydragon.org/latest/game/assets/ux/summonericons/profileicon2076.png" alt="icon-1">
                                    <span class="">Ntvvckda</span>
                                </div>
                                <div class="flex space-x-16 rounded-full hover:bg-white hover:bg-opacity-5 items-center">
                                    <img class="h-12 w-12 border-2 border-black rounded-full" src="https://raw.communitydragon.org/latest/game/assets/ux/summonericons/profileicon2077.png" alt="icon-1">
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

<style scoped>
    .match {
        transition-duration: 0.3s;
        transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
    }
    .game-status {
        top: 50%;
        left: 6px;
        transform: translateY(-50%) rotate(-90deg);
    }
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