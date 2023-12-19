function chooseFunction() {
	var option = document.getElementById("option").value;
	if (option == "0") {
		searchShows();
	}
	else if (option == "1") {
		searchPeople();
	}
	else {
		console.log("Option invalid: Value of " + option + " not accepted.");
	}
}
// todo: combine into one function with url format as parameter
function searchShows() {
	var url = 'https://api.tvmaze.com/search/shows?q=';
	var xhr = new XMLHttpRequest();
	var query = document.getElementById("query").value;
	xhr.overrideMimeType("application/json");
	xhr.open('GET', url + query);
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
function searchPeople() {
	var url = 'https://api.tvmaze.com/search/people?q=';
	var xhr = new XMLHttpRequest();
	var query = document.getElementById("query").value;
	xhr.overrideMimeType("application/json");
	xhr.open('GET', url + query);
	xhr.onload = function() {
		if (xhr.status === 200) {
			console.log(xhr.responseText);
			var data = JSON.parse(xhr.responseText);
			var results = data;
			parseResults(results,"actor");
		}
		else {
			alert("Request failed. Returned status of " + xhr.status);
		}
	};
	xhr.send();
}
function checkPersonImage(item) {
	if (item.person.image == null) {
		return 'http://calumchilds.uosweb.co.uk/film-website/imgs/person-placeholder/' + Math.floor(Math.random() * 5) + '.jpg';
	}
	else if (item.person.image.medium == null) {
		return item.person.image;
	}
	else {
		return item.person.image.medium;
	}
}
function checkShowImage(item) {
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
// Put all the searching functions before here - unless you like blank screens.
function parseResults(results, type) {
	// Clears list so results of previous query disappear
	document.getElementById('results').innerHTML = "";
	document.getElementById('more-results').innerHTML = "";
	var resultList = document.querySelector('#results');
	if (type == "show") {
		results.forEach(function (item,index,results) {
			if (index < 5) {
				resultList.insertAdjacentHTML('beforeend', '<div class="column"><img src="' + checkShowImage(item) + '"><li><h2><a href="' + item.show.url + '">' + item.show.name + '</a></h2><p class="genres"><i class="fas fa-film" aria-hidden="true"></i> ' + item.show.type + " " + item.show.genres + '</p></li></div>');
			}
			else {
				return;
				/*document.getElementById("more-results").innerHTML += '<p align="center"><a class="button is-large" id="show-more-button">Show more results</a></p>';
				document.getElementById("show-more-button").addEventListener("click", function(){console.log("You clicked the Show More Results button!")});*/
			}
		});	
	} 
	else if (type == "actor") {
		results.forEach(function (item,index) {
			if (item.person.image.medium == null) {
				console.log("Image is null");
			}
			if (index < 5) {
				resultList.insertAdjacentHTML('beforeend', '<div class="column"><img src="' + checkPersonImage(item) + '"><li><h2><a href="' + item.person.url + '">' + item.person.name + '</a></h2><p class="birthday"><i class="fas fa-cake-candles" aria-hidden="true"></i> '+ item.person.birthday +'</p><p class="gender is-gender-'+ item.person.gender +'">'+ item.person.gender +'</p></li></div>');
			}
			else {
				return;
			}
		});
	}
}
function openNavBar() {
	var x = document.getElementById("navigationBar");
    if (x.className == "navbar-menu") {
        x.className += " responsive";
    } else {
        x.className = "navbar-menu";
    }    
    var y = document.getElementById("navbarBurger");
    if (y.className == "navbar-burger") {
        y.className += " is-active";
    } else {
        y.className = "navbar-burger";
    }
}