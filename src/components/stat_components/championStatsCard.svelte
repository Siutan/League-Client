<script>
  export let championStats;

  function getIcon(index) {
    return championStats[index].champion.icon;
  }
  function getGamesPlayed(index) {
    return championStats[index].count;
  }
  function getWinRate(index) {
    return Math.ceil(championStats[index].wins / championStats[index].count * 100) + "%";
  }
  function getKDA(index) {
    return Math.round(championStats[index].kills + championStats[index].assists / championStats[index].deaths * 100) / 100;
  }
</script>

<div
  class="relative bg-palette-900 bg-opacity-50 px-6 pt-5 pb-8 shadow-xl sm:mx-auto sm:max-w-lg sm:rounded-lg "
>
  <div class="mx-auto max-w-md">
    <div class="border-10 border-l-4 border-palette-100 mb-4">
      <p class="pl-1 text-palette-100">Stats</p>
    </div>
    <div class="flex flex-col gap-1">
      <div class="flex flex-col gap-2 text-white text-xs font-bold text-center">
        <div
          class="flex rounded-lg bg-palette-900 shadow-xl ring-1 ring-palette-600 p-2"
        >
          <div class="flex flex-col gap-4">
            {#each Array(3) as _, i}
              <div class="flex">
                <img
                  class="w-10 h-10 overflow-hidden border-solid border-2 border-palette-600 rounded-lg"
                  src={getIcon(i)}
                  alt="Champion icon"
                />
                <div class="flex flex-row p-2 pt-3 gap-2 text-palette-400">
                  <p class="text-yellow-600">{getGamesPlayed(i)} Played</p>
                  <p class="text-teal-900">{getWinRate(i)} WR</p>
                  <p class="text-indigo-400">{getKDA(i)} KDA</p>
                </div>
              </div>
            {/each}
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
