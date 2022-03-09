import App from './App.svelte';

// fetch('https://api.leaguestats.gg/summoner/basic', {
// 	method: 'POST', // or 'PUT'
// 	headers: {
// 		'Content-Type': 'application/json',
// 	},
// 	body: JSON.stringify({summoner: "homos in paris", region:"oc1"}),
// })
// 	.then(response => response.json())
// 	.then(data => {
// 		localStorage.setItem("summonerBasic", JSON.stringify(data))
// 	})
// 	.catch((error) => {
// 		console.error('Error:', error);
// 	});

// fetch summoner overview
function fetchSummonerOverview() {

	let summonerOverview = JSON.parse(localStorage.getItem("summonerOverview"));

	// check if data is already in local storage
	if (summonerOverview) {
		return summonerOverview;
	} else {

		let myHeaders = new Headers();
		myHeaders.append("Content-Type", "application/json");

		let raw = JSON.stringify({
			"accountId": "UC--WcBjE0JWDSLVhwu3U9VluYmWj8k_l8985DOKnOJmE64TmOuoHXXh",
			"puuid": "t4ZkRVpaVkXeWGSE4j2Ft6qg0Q_qFtafPjGOPY6eTTAINOXAUh6SVEPkIIvP4alAVG1-gK8Vrb55WA",
			"region": "oc1",
			"season": null
		});

		let requestOptions = {
			method: 'POST',
			headers: myHeaders,
			body: raw,
			redirect: 'follow'
		};

		fetch("https://api.leaguestats.gg/summoner/overview", requestOptions)
			.then(response => response.text())
			.then(result => {
				localStorage.setItem("summonerOverview", result)
				return summonerOverview;
			})
			.catch(error => console.log('error', error));
	}

}

let summonerData = JSON.parse(localStorage.getItem("summonerBasic"));


const app = new App({
	target: document.body,
	props: {
		summonerIcon: `${summonerData.account.profileIconId}`,
		summonerLevel: `${summonerData.account.summonerLevel}`,
		summonerName: `${summonerData.account.name}`,
		fetchSummonerOverview: `${fetchSummonerOverview()}`,
	}

});

export default app;