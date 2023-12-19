// todo: combine into one function with url format as parameter
function searchStuff() {
	var countryCode = document.getElementById("option").value;
	var url = 'https://api.tvmaze.com/schedule?country='+countryCode;
	var xhr = new XMLHttpRequest();
	xhr.overrideMimeType("application/json");
	xhr.open('GET', url);
	xhr.onload = function() {
		if (xhr.status === 200) {
			console.log(xhr.responseText);
			var data = JSON.parse(xhr.responseText);
			var results = data;
			parseResults(results,"show"); 
		}
		else {
			alert("Request failed. Returned status of " + xhr.status);
		}
	};
	xhr.send();
}
function checkImage(item) {
	if (item.show.image == null) {
		return 'http://calumchilds.uosweb.co.uk/film-website/imgs/tv-placeholder/' + Math.floor(Math.random() * 5) + '.jpg';
	}
	else if (item.show.image.medium == null) {
		return item.show.image;
	}
	else {
		return item.show.image.medium;
	}
}
function checkNetwork(item) {
	if (item.show.network == null) {
		return 'No TV Channel/Network Provided';
	}
	else {
		return item.show.network.name;
	}
}
/* Put all the searching functions before here - unless you like blank screens. */
function parseResults(results, type) {
	// Clears list so results of previous query disappear
	document.getElementById('results').innerHTML = "";
	document.getElementById('more-results').innerHTML = "";
	var resultList = document.querySelector('#results');
	results.forEach(function (item,index) {
		resultList.insertAdjacentHTML('beforeend', '<div class="card"><div class="card-content"><div class="columns"><div class="column is-three-quarters"><h2 class="title"><a href="'+ item.show.url +'" target="_blank">' + item.show.name + '</a></h2><h3 class="subtitle"><strong>'+ item.airtime +'</strong> &middot; '+ checkNetwork(item) +' &middot; Episode '+ item.number + '</h3><p>'+ item.show.summary +'</p></div><div class="column"><p align="center"><img src="'+ checkImage(item) +'" alt="'+ item.show.name +' poster"></p></div></div></div><br>');
	});
}