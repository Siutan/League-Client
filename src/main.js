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

// testing pass through
function pog() {
  return "pog"
}

const app = new App({
	target: document.body,
	props: {
		name: 'world',
		lmao: `${console.log(localStorage.getItem('summonerBasic'))}`,
	}

});

export default app;