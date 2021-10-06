var APIkey = "9510ac21d4a2f3da6c213cec7857f623"
//var APIurl="https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}"
var APIurl2 = "https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}"
var searchInput = document.getElementById("searchInput")
var saveSearch = document.getElementById("saveSearch")
var weatherSection = document.getElementById("weatherSection")
var fiveDayForecast = document.getElementById("fiveDayForecast")
function saveCity() {
    var input = searchInput.value
    saveSearch(input)
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
function saveSearch(data){
var searches = localStorage.getItem("searches")||[]
searches.push(data)
}
function fillFiveDayForecast(data){
    for(let i=1;i<6;i++){
var day = data.daily[i]
var temp = document.createElement("p")
    temp.textContent = "Temp: " + day.temp.day + "*F"
    fiveDayForecast.appendChild(temp)
    var wind = document.createElement("p")
    wind.textContent = "Wind: " + day.wind_speed+ "MPH"
    fiveDayForecast.appendChild(wind)
    var humidity = document.createElement("p")
    humidity.textContent = "Humidity: " + day.humidity + "%"
    fiveDayForecast.appendChild(humidity)
    }
}
function fillWeatherDashboard(data){
    var temp = document.createElement("p")
    temp.textContent = "Temp: " + data.current.temp + "*F"
    weatherSection.appendChild(temp)
    var wind = document.createElement("p")
    wind.textContent = "Wind: " + data.current.wind + "MPH"
    weatherSection.appendChild(wind)
    var humidity = document.createElement("p")
    humidity.textContent = "Humidity: " + data.current.humidity + "%"
    weatherSection.appendChild(humidity)
    var uvi = document.createElement("p")
    uvi.textContent = "UV Index: " + data.current.uvi 
    if(data.current.uvi<3){
        uvi.classList.add("bg-success")
    }else if(data.current.uvi<6){
        uvi.classList.add("bg-warning")
    }else{
        uvi.classList.add("bg-danger")
    }
    weatherSection.appendChild(uvi)
}
const searchBTN = document.getElementById("searchBTN")
searchBTN.addEventListener("click", saveCity)