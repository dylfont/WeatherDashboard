var APIkey = "9510ac21d4a2f3da6c213cec7857f623"
//var APIurl="https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}"
var APIurl2 = "https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}"
var searchInput = document.getElementById("searchInput")
var saveSearch = document.getElementById("saveSearch")
var weatherSection = document.getElementById("weatherSection")
var fiveDayForecast = document.getElementById("fiveDayForecast")
function saveCity() {
    var input = searchInput.value
    saveSearchFunc(input)
    console.log(input)
    var APIurl = "https://api.openweathermap.org/data/2.5/weather?q=" + input + "&appid=" + APIkey
    fetch(APIurl).then(function (res) {
        return res.json()
    }).then(function (data) {
        var APIurl2 = "https://api.openweathermap.org/data/2.5/onecall?lat=" + data.coord.lat + "&lon=" + data.coord.lon + "&units=imperial&appid=" + APIkey
        fetch(APIurl2).then(function (res) {
            return res.json()
        }).then(function (data) {
            console.log(data)
            fillWeatherDashboard(data)
            fillFiveDayForecast(data)
        })
    })
}
function saveSearchFunc(data) {
    var searches = JSON.parse(localStorage.getItem("searches")) || []
    searches.push(data)
    localStorage.setItem("searches", JSON.stringify(searches))
}
function fillFiveDayForecast(data) {
    for (let i = 1; i < 6; i++) {
        var day = data.daily[i]
        var card = document.createElement("div")
        card.classList.add("col-2")
        var temp = document.createElement("p")
        temp.textContent = "Temp: " + day.temp.day + "*F"
        card.appendChild(temp)
        var wind = document.createElement("p")
        wind.textContent = "Wind: " + day.wind_speed + "MPH"
        card.appendChild(wind)
        var humidity = document.createElement("p")
        humidity.textContent = "Humidity: " + day.humidity + "%"
        card.appendChild(humidity)
        fiveDayForecast.appendChild(card)
    }
}
function fillWeatherDashboard(data) {
    var card = document.createElement("div")
        card.classList.add("col-2", "card")
    var temp = document.createElement("p")
    temp.textContent = "Temp: " + data.current.temp + "*F"
    card.appendChild(temp)
    var wind = document.createElement("p")
    wind.textContent = "Wind: " + data.current.wind_speed + "MPH"
    card.appendChild(wind)
    var humidity = document.createElement("p")
    humidity.textContent = "Humidity: " + data.current.humidity + "%"
    card.appendChild(humidity)
    var uvi = document.createElement("p")
    uvi.textContent = "UV Index: " + data.current.uvi
    if (data.current.uvi < 3) {
        uvi.classList.add("bg-success")
    } else if (data.current.uvi < 6) {
        uvi.classList.add("bg-warning")
    } else {
        uvi.classList.add("bg-danger")
    }
    card.appendChild(uvi)
    weatherSection.appendChild(card)
}
const searchBTN = document.getElementById("searchBTN")
searchBTN.addEventListener("click", saveCity)