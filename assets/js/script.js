

// const requestForecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${APIKey}`

// const requestApiUrl = `http://api.openweathermap.org/data/2.5/forecast?id=${APIKey}`
// const queryURL = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKey}`;

const searchCity = $('#searchbar')
const formSection = $('form')
const formmm= document.querySelector('form')
console.log(searchCity)

console.log(searchCity.val())


function searchWeather(event) {
    event.preventDefault();
    console.log("hello");

    const city = searchCity.val()
    const weatherUrl = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=b3c89b198d75e42b324fef56894937ee`
    console.log(weatherUrl);

    fetch(weatherUrl).then(function(response) {
        return response.json();
    })
    .then(function (data) {
        console.log(data)
    })
}

function searchForecast


// fetch(
//     requestApiUrl
//   )
//     .then(function (response) {
//       return response.json();
//     })
//     .then(function (data) {
//       console.log(data);
//     });

formmm.addEventListener('submit', searchWeather)