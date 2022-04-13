import App from "./App.svelte";

//TODO:
// - package appConfig json by summonerNAme, username and password
// - pass to App.svelte

const app = new App({
  target: document.body,
  props: {
    summonerName: "Homos in paris",
  },
});

export default app;
