// Global Variables 
const apiKey = "fd491a535e375952c287ac394ad9eeea"; // const b/c it never changes (ask tutor why we need this)
var returnDataFromApi = JSON.stringify // JSON object
var locations = []; // blank list of locations
// HTML element variables 
var searchInputEl = document.getElementById("search-input"); // grabbing the element
var searchFormEl = document.getElementById("search-form"); // get el

// functions
function getLocation(event) { // Get latitude and longitude
    event.preventDefault();
    let geoLoco = searchInputEl.value;
    let url = conCatAPI(geoLoco);
    fetch(url).then(response => { // response from API is a string. We use json to make it an object
        // console.log(response); // called a buffer
        return response.json(); // parse into JSON object
    }).then(cities => {
        // console.log(cities); // array of top 5 locations
        if (cities.length == 1) {
            locations.push(cities[0]);
        }
        else { // modal 

        }
        // TODOs
        weatherAPI(locations[0].lat, locations[0].lon);
        console.log(locations[0]);

    })
}
// function to concatenate API for location
function conCatAPI(q) { // this calls get location and q is the geoloco from the form.
    var url = "http://api.openweathermap.org/geo/1.0/direct?";
    var limit = 5;
    return url + "q=" + q + "&limit=" + limit + "&appid=" + apiKey; // concatended string will return.
}
// A function to get API call for Weather data
function weatherAPI(lat, lon) { // template literal!!!
    url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`;
    fetch(url).then(response => {
        return response.json();
    }).then(data => {
        console.log(data.current.temp);
    })
}
// Event listerners
searchFormEl.addEventListener("submit", getLocation); // only passing the function

// querySelector("#search-input") this is anotherway to do this.

// http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}
// http://api.openweathermap.org/geo/1.0/direct?q=London&limit=5&appid={API key}