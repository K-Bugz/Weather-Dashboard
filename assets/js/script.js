// Global Variables 
const apiKey = "fd491a535e375952c287ac394ad9eeea"; // const b/c it never changes (ask tutor why we need this)
var locations = []; // blank list of locations
// HTML element variables 
var searchInputEl = document.getElementById("search-input"); // grabbing the element
var searchFormEl = document.getElementById("search-form"); // el 
var forecastEl = document.getElementById("todaysForcast"); // el for forecast

// functions
function getLocation(event) { // Get latitude and longitude
    event.preventDefault();
    let geoLoco = searchInputEl.value;
    let url = getLocoAPI(geoLoco);
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
        weatherAPI(locations[0].lat, locations[0].lon); // passing the lat & lon from getLocation while calling weatherAPI
    })
}
// function to concatenate API for location
function getLocoAPI(q) { // this calls get location and q is the geoloco from the form.
    // http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}
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
        console.log(data);
        // Create city object w/ data that I want/need from API
        const curCity = {
            //Current data
            name: searchInputEl.value, curTemp: data.current.temp,
            curWind: data.current.wind_speed, curHumidity: data.current.humidity,
            curUV: data.current.uvi, icondata: data.current.weather[0].icon,
            // Day1 data
            day1TempMin: data.daily[0].temp.min,
            day1TempMax: data.daily[0].temp.max,
            day1Humidity: data.daily[0].humidity,
            day1WindSpeed: data.daily[0].wind_speed,

            // Day2 data
            day2TempMin: data.daily[1].temp.min,
            day2TempMax: data.daily[1].temp.max,
            day2Humidity: data.daily[1].humidity,
            day2WindSpeed: data.daily[1].wind_speed,
            // Day3 data
            day3TempMin: data.daily[2].temp.min,
            day3TempMax: data.daily[2].temp.max,
            day3Humidity: data.daily[2].humidity,
            day3WindSpeed: data.daily[2].wind_speed,
            // Day4 data
            day4TempMin: data.daily[3].temp.min,
            day4TempMax: data.daily[3].temp.max,
            day4Humidity: data.daily[3].humidity,
            day4WindSpeed: data.daily[3].wind_speed,
            // Day5 data
            day5TempMin: data.daily[4].temp.min,
            day5TempMax: data.daily[4].temp.max,
            day5Humidity: data.daily[4].humidity,
            day5WindSpeed: data.daily[4].wind_speed,
        };

        // current li retrieved by ID and text updated
        document.getElementById("temp").textContent = "Temp: " + curCity.curTemp + "\u2109";
        document.getElementById("wind").textContent = "Wind Speed: " + curCity.curWind + " mph";
        document.getElementById("humidity").textContent = "Humidity: " + curCity.curHumidity + "%";
        document.getElementById("uvIndex").textContent = "UV Index: " + curCity.curUV;
        // Day 1
        document.getElementById("day1TempHi").textContent = "Temp High: " + data.daily[0].temp.day1TempMax;
        document.getElementById("day1TempLow").textContent = "Temp Low: " + data.daily[0].temp.day1TempMin;
        document.getElementById("day1Wind").textContent = "Wind Speed: " + data.daily[0].temp.day1WindSpeed;
        document.getElementById("day1Hum").textContent = "Humidity: " + data.daily[0].temp.day1Humidity;
    })
}



// Event listerners
searchFormEl.addEventListener("submit", getLocation); // only passing the function
// querySelector("#search-input") this is anotherway to do this.
