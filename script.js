var APIkey="9510ac21d4a2f3da6c213cec7857f623"
var APIurl="https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}"
var APIurl2= "https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}"


function saveCity(){
  console.log("hello") 
}

const searchBTN= document.getElementById("searchBTN")
searchBTN.addEventListener("click",saveCity)