<script>
  export let index;
  export let summonerIcon;
  export let summonerName;
  export let username;

  console.log(index, summonerName, username);
</script>

<div
  class="relative bg-palette-900 text-white px-2 pt-5 pb-5 shadow-xl ring-1 ring-palette-600/5 sm:mx-auto sm:max-w-lg sm:rounded-lg sm:px-8"
>
  <div class="flex flex-row">
    <img
      class="w-20 rounded-full"
      src="https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/profile-icons/3505.jpg"
      alt="summoner Icon"
    />
    <div class="flex flex-col px-5 pt-5 text-center">
      <p class="font-sans text-lg">{summonerName}</p>
      <p class="text-sm text-gray-400 ">{username}</p>
    </div>
    <div class="flex justify-center">
      <div class="dropend self-center ">
        <button
          class="
          dropdown-toggle
          px-1 self-center bg-palette-800 text-white font-medium text-3xl leading-tight uppercase rounded shadow-md hover:bg-palette-700 hover:shadow-lg focus:bg-palette-700 focus:shadow-lg focus:outline-none active:shadow-lg transition duration-150 ease-in-out"
          type="button"
          id="dropdownMenuButton1e"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <img
            class="w-10"
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAABmJLR0QA/wD/AP+gvaeTAAAA+klEQVRoge2UPW4CMRBGl0hAxUILHCcH4OcYQHJLQiJBRMHvNYD+Ueys5MIDpY34nmRt8c08e0eyi0IIIYQQQgghhBAvAdAGvoBf4GZrBSyA1ks4gCGwxecfGGTtsAnUzXtgBHRsjYGjZRtvIlk4gG8rOADdSN4NJHPnEOkdwJ+Fo9gGVjOxmpWTp3cAVws7DwSl1VycPJnjI8y9xoDGkzyZI/yRg30/HwjqbOfk6R1U7zN2kWKXrAecrWYWs2fhAFpU7zPAyS5UaWsaNK+BpnOILBwFMAgkMdZAP9qcmaOeyBz4oXpBrsASmLkTyNQhhBBCCCGEEOIduQP6+MAjh1XVlAAAAABJRU5ErkJggg=="
            alt="ellipsis menu"
          />
        </button>
        <ul
          class="
          dropdown-menu
          min-w-max
          absolute
          hidden
          bg-gray-800
          text-base
          z-50
          float-left
          py-2
          list-none
          text-left
          rounded-lg
          shadow-lg
          mt-1
          hidden
          m-0
          bg-clip-padding
          border-none
        "
          aria-labelledby="dropdownMenuButton1e"
        >
          <li>
            <a
              class="
              dropdown-item
              text-sm
              py-2
              px-4
              font-normal
              block
              w-full
              whitespace-norap
              bg-transparent
              text-gray-100
              hover:bg-gray-700
            "
              type="button"
              data-bs-toggle="collapse"
              data-bs-target={`#collapseAccount-${index}`}
              aria-expanded="false"
              aria-controls={`collapseAccount-${index}`}
              href="#">Edit Account</a
            >
          </li>
          <li>
            <a
              class="
              dropdown-item
              text-sm
              py-2
              px-4
              font-normal
              block
              w-full
              whitespace-nowrap
              bg-transparent
              text-red-300
              hover:bg-red-900
            "
              href="#">Delete Account</a
            >
          </li>
        </ul>
      </div>
    </div>
  </div>

  <div style="min-height: 12px;">
    <div class="collapse collapse-vertical" id={`collapseAccount-${index}`}>
      <div
        class="block mt-8 rounded-lg shadow-lg text-white max-w-sm"
        style="width: 260px;"
      >
        <form>
          <div class="form-group mb-6">
            <small class="block mt-1 text-xs text-gray-100"
              >All details are kept on your system and is only used to interface
              with Riot's servers.</small
            >
            <label
              for={`summonerName-${index}`}
              class="form-label inline-block mb-2 text-gray-100"
              >Summoner Name</label
            >
            <input
              type="text"
              class="form-control
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
        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              id={`summonerName-${index}`}
              placeholder={summonerName}
            />

            <label
              for={`username-${index}`}
              class="form-label inline-block mb-2 text-gray-100">Username</label
            >
            <input
              type="text"
              class="form-control
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
        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              id={`username-${index}`}
              aria-describedby="emailHelp"
              placeholder={username}
            />
            <label
              for={`password-${index}`}
              class="form-label inline-block mb-2 text-gray-100">Password</label
            >
            <input
              type="password"
              class="form-control block
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
        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              id={`password-${index}`}
              placeholder="Password"
            />
            <button
              type="submit"
              class="
      px-6
      py-2.5
      bg-gray-600
      text-white
      font-medium
      text-xs
      leading-tight
      uppercase
      rounded
      shadow-md
      hover:bg-gray-700 hover:shadow-lg
      focus:bg-gray-700 focus:shadow-lg focus:outline-none focus:ring-0
      active:bg-gray-800 active:shadow-lg
      transition
      duration-150
      ease-in-out">Done</button
            >
          </div>
        </form>
      </div>
    </div>
  </div>
</div>
