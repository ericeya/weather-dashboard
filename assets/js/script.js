const APIKey = "b3c89b198d75e42b324fef56894937ee"

// const requestForecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${APIKey}`

// const requestApiUrl = `http://api.openweathermap.org/data/2.5/forecast?id=${APIKey}`
// const queryURL = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKey}`;

const searchCity = document.querySelector('#searchbar')

function searchWeather(event) {
    event.preventDefault()

    const city = searchCity.val()
    const weatherUrl = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKey}`

    fetch(weatherUrl).then(function(response) {
        return response.json();
    })
    .then(function (data) {
        console.log(data)
    })
}


// fetch(
//     requestApiUrl
//   )
//     .then(function (response) {
//       return response.json();
//     })
//     .then(function (data) {
//       console.log(data);
//     });


$('.search').on('submit', '#searchbar', searchWeather())