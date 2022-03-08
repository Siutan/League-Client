import App from './App.svelte';

fetch('https://api.leaguestats.gg/summoner/basic', {
	method: 'POST', // or 'PUT'
	headers: {
		'Content-Type': 'application/json',
	},
	body: JSON.stringify({summoner: "homos in paris", region:"oc1"}),
})
	.then(response => response.json())
	.then(data => {
		localStorage.setItem("summonerBasic", JSON.stringify(data))
	})
	.catch((error) => {
		console.error('Error:', error);
	});

let summonerData = JSON.parse(localStorage.getItem("summonerBasic"));

const app = new App({
	target: document.body,
	props: {
		summonerIcon: `${summonerData.account.profileIconId}`,
		summonerLevel: `${summonerData.account.summonerLevel}`,
		summonerName: `${summonerData.account.name}`,
	}

});

export default app;