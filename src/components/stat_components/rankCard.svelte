<script>
  export let rankedJson;

  let rankedSolo = rankedJson.soloQ.rank;
  let rankedFlex = rankedJson.flex5v5.rank;
  let soloLp = rankedJson.soloQ.lp;
  let flexLp = rankedJson.flex5v5.lp;
  let soloWinRate = rankedJson.soloQ.winRate;
  let flexWinRate = rankedJson.flex5v5.winRate;
  // need to make icons for ranks (bronze, silver, etc)
  // let soloIcons;
  // let flexIcons;
  let soloGamesPlayed = rankedJson.soloQ.played;
  let flexGamesPlayed = rankedJson.flex5v5.played;
</script>

<div
  class="relative bg-palette-900 bg-opacity-50 px-6 pt-5 pb-8 shadow-xl sm:mx-auto sm:max-w-lg sm:rounded-lg "
>
  <div class="mx-auto max-w-md">
    <div class="border-10 border-l-4 border-palette-100 mb-4">
      <p class="pl-1 text-palette-100">Rank</p>
    </div>
    <div class="flex flex-col gap-3">
      <div class="flex flex-row text-white text-center font-bold">
        <div
          class="flex rounded-lg bg-palette-900 shadow-xl ring-1 ring-palette-600 p-2 pr-5"
        >
          <img
            class="w-20 p-1"
            src="https://static.u.gg/assets/lol/ranks/2d/bronze.svg"
            alt="bronze solo icon"
          />
          <div class="flex flex-col">
            <p class="text-palette-600 text-xs font-semibold">Ranked Solo</p>
            <div class="flex gap-1">
              <p class="text-ranks-100 capitalize">{rankedSolo}</p>
              <p class="text-palette-600">/ {soloLp} LP</p>
            </div>
            <p class="text-xs text-palette-600">
              {soloWinRate} WR {soloGamesPlayed} Games
            </p>
          </div>
        </div>
      </div>
      <div class="flex flex-row text-white text-center font-bold">
        <div
          class="flex rounded-lg bg-palette-900 shadow-xl ring-1 ring-palette-600 p-2 pr-5"
        >
          <img
            class="w-20 p-1"
            src="https://static.u.gg/assets/lol/ranks/2d/bronze.svg"
            alt="bronze flex icon"
          />
          <div class="flex flex-col">
            <p class="text-palette-600 text-xs font-semibold">Ranked Flex</p>
            <div class="flex gap-1">
              <p class="text-ranks-100">{rankedFlex}</p>
              <p class="text-palette-600">/ {flexLp} LP</p>
            </div>
            <p class="text-xs text-palette-600">
              {flexWinRate} WR {flexGamesPlayed} Games
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
