import App from "./App.svelte";

//TODO:
// - package appConfig json by summonerNAme, username and password
// - pass to App.svelte

let appConfig = [];

async function pog () {
    // get config data
    await window.electronAPI
        .getPath()
        .then((userDataPath) => {
            appConfig = JSON.parse(userDataPath);
            console.log(appConfig);
        })
        .catch((err) => {
            console.log(err);
        });
}

pog().then(r =>{
    const app = new App({
        target: document.body,
        props: {
            summoner1: appConfig.accounts[0].summonerName,
        },
    });
});

export default app;
