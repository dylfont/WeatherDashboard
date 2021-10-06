var APIkey = "9510ac21d4a2f3da6c213cec7857f623"
//var APIurl="https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}"
var APIurl2 = "https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}"
var searchInput = document.getElementById("searchInput")
var weatherSection = document.getElementById("weatherSection")
var fiveDayForecast = document.getElementById("fiveDayForecast")
function saveCity() {
    var input = searchInput.value
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
            
            weatherSection.appendChild(uvi)
        })
    })
}

const searchBTN = document.getElementById("searchBTN")
searchBTN.addEventListener("click", saveCity)