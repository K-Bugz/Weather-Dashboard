// Global Variables 
const apiKey = "fd491a535e375952c287ac394ad9eeea"; // const b/c it never changes (ask tutor why we need this)
var locations = []; // blank list of location name's
// HTML element variables 
var searchInputEl = document.getElementById("search-input"); // grabbing the element
var searchFormEl = document.getElementById("search-form"); // el for search form
var forecastEl = document.getElementById("todaysForcast"); // el for forecast
var historyEl = document.getElementById("search-history"); // el for history


// functions
function updateHistory() { // append list of locations & set in localStorage for history
    if (localStorage["cityList"]) { // if we have history then update it. 
        historyEl.innerHTML += JSON.parse(localStorage["cityList"]);
    }
}
function getLocation(event) { // A function that recieves a name and returns its lat and lon. 
    event.preventDefault();
    let cityName = searchInputEl.value;
    let url = getLocoAPI(cityName);
    fetch(url).then(response => { // response from API is a string. We use json to make it an object
        // console.log(response); // called a buffer
        return response.json(); // parse into JSON object
    }).then(cities => {
        // console.log(cities); // array of top 5 locations
        if (cities.length == 1) {
            locations.push(cities[0].name);
            localStorage.setItem("cityList", JSON.stringify(locations)); // set local storage w/ new location
        }
        else { // Do modal 
        }
        weatherAPI(locations[0].lat, locations[0].lon); // passing the lat & lon from getLocation while calling weatherAPI
    })
}
// function to concatenate API for location. I kept this method but prefer template literal form. 
function getLocoAPI(q) { // this calls get location and q is the geoloco from the form.
    // http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}
    var url = "http://api.openweathermap.org/geo/1.0/direct?";
    var limit = 5;
    return url + "q=" + q + "&limit=" + limit + "&appid=" + apiKey; // concatended string will return.

}
// A function to get API call for Weather data but need lat,lon first. 
function weatherAPI(lat, lon) { // template literal!!!
    url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`;
    fetch(url).then(response => {
        return response.json();
    }).then(data => {
        // Create city object w/ data that I want/need from API
        data.daily.shift();// Shifts all values 1
        const curCity = {
            //Current data
            name: searchInputEl.value,
            curTemp: data.current.temp,
            curWind: data.current.wind_speed,
            curHumidity: data.current.humidity,
            curUV: data.current.uvi,
            icondata: data.current.weather[0].icon,
            // Day1 data
            day1TempMin: data.daily[0].temp.min,
            day1TempMax: data.daily[0].temp.max,
            day1Humidity: data.daily[0].humidity,
            day1WindSpeed: data.daily[0].wind_speed,
            day1weatherIcon: data.daily[0].weather[0].icon,
            // Day2 data
            day2TempMin: data.daily[1].temp.min,
            day2TempMax: data.daily[1].temp.max,
            day2Humidity: data.daily[1].humidity,
            day2WindSpeed: data.daily[1].wind_speed,
            day2weatherIcon: data.daily[1].weather[0].icon,
            // Day3 data
            day3TempMin: data.daily[2].temp.min,
            day3TempMax: data.daily[2].temp.max,
            day3Humidity: data.daily[2].humidity,
            day3WindSpeed: data.daily[2].wind_speed,
            day3weatherIcon: data.daily[2].weather[0].icon,
            // Day4 data
            day4TempMin: data.daily[3].temp.min,
            day4TempMax: data.daily[3].temp.max,
            day4Humidity: data.daily[3].humidity,
            day4WindSpeed: data.daily[3].wind_speed,
            day4weatherIcon: data.daily[3].weather[0].icon,
            // Day5 data
            day5TempMin: data.daily[4].temp.min,
            day5TempMax: data.daily[4].temp.max,
            day5Humidity: data.daily[4].humidity,
            day5WindSpeed: data.daily[4].wind_speed,
            day5weatherIcon: data.daily[4].weather[0].icon
        };

        // current li retrieved by ID and text updated
        document.getElementById("today").textContent = "Today's Weather for " + curCity.name.charAt(0).toUpperCase() + curCity.name.slice(1);
        document.getElementById("temp").textContent = "Temp: " + curCity.curTemp + "\u2109";
        document.getElementById("wind").textContent = "Wind Speed: " + curCity.curWind + " mph";
        document.getElementById("humidity").textContent = "Humidity: " + curCity.curHumidity + "%";
        document.getElementById("uvIndex").textContent = "UV Index: " + curCity.curUV;
        document.getElementById("weatherIcon").setAttribute("src", `http://openweathermap.org/img/wn/${curCity.icondata}@2x.png`);
        // InnerHTML renders the HTML that you pass vs textContent just for text into a doc

        // Day 1
        document.getElementById("day1TempHi").textContent = "Temp High: " + curCity.day1TempMax;
        document.getElementById("day1TempLow").textContent = "Temp Low: " + curCity.day1TempMin;
        document.getElementById("day1Wind").textContent = "Wind Speed: " + curCity.day1WindSpeed;
        document.getElementById("day1Hum").textContent = "Humidity: " + curCity.day1Humidity + "%";
        document.getElementById("weatherIconday1").setAttribute("src", `http://openweathermap.org/img/wn/${curCity.day1weatherIcon}@2x.png`);
        // Day 2
        document.getElementById("day2TempHi").textContent = "Temp High: " + curCity.day2TempMax;
        document.getElementById("day2TempLow").textContent = "Temp Low: " + curCity.day2TempMin;
        document.getElementById("day2Wind").textContent = "Wind Speed: " + curCity.day2WindSpeed;
        document.getElementById("day2Hum").textContent = "Humidity: " + curCity.day2Humidity + "%";
        document.getElementById("weatherIconday2").setAttribute("src", `http://openweathermap.org/img/wn/${curCity.day2weatherIcon}@2x.png`);
        // Day 3
        document.getElementById("day3TempHi").textContent = "Temp High: " + curCity.day3TempMax;
        document.getElementById("day3TempLow").textContent = "Temp Low: " + curCity.day3TempMin;
        document.getElementById("day3Wind").textContent = "Wind Speed: " + curCity.day3WindSpeed;
        document.getElementById("day3Hum").textContent = "Humidity: " + curCity.day3Humidity + "%";
        document.getElementById("weatherIconday3").setAttribute("src", `http://openweathermap.org/img/wn/${curCity.day3weatherIcon}@2x.png`);
        // Day 4
        document.getElementById("day4TempHi").textContent = "Temp High: " + curCity.day4TempMax;
        document.getElementById("day4TempLow").textContent = "Temp Low: " + curCity.day4TempMin;
        document.getElementById("day4Wind").textContent = "Wind Speed: " + curCity.day4WindSpeed;
        document.getElementById("day4Hum").textContent = "Humidity: " + curCity.day4Humidity + "%";
        document.getElementById("weatherIconday4").setAttribute("src", `http://openweathermap.org/img/wn/${curCity.day4weatherIcon}@2x.png`);
        // Day 5
        document.getElementById("day5TempHi").textContent = "Temp High: " + curCity.day5TempMax;
        document.getElementById("day5TempLow").textContent = "Temp Low: " + curCity.day5TempMin;
        document.getElementById("day5Wind").textContent = "Wind Speed: " + curCity.day5WindSpeed;
        document.getElementById("day5Hum").textContent = "Humidity: " + curCity.day5Humidity + "%";
        document.getElementById("weatherIconday5").setAttribute("src", `http://openweathermap.org/img/wn/${curCity.day5weatherIcon}@2x.png`);

        updateHistory(); // updates the search history. 
    })
}



// Event listerners
$(document).ready(function () {
    // localStorage.clear();
    updateHistory();
})
searchFormEl.addEventListener("submit", getLocation); // only passing the function
// querySelector("#search-input") this is anotherway to do this.
