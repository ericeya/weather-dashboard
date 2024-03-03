

// const requestForecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${APIKey}`

// const requestApiUrl = `http://api.openweathermap.org/data/2.5/forecast?id=${APIKey}`
// const queryURL = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKey}`;

const searchCity = $('#searchbar')
const formSection = $('form')
const form= document.querySelector('form')
const weatherData = $('#weather-data')
const futureWeatherData = $('#future-weather-data')

function saveToLocalStorage(newList) {
    localStorage.setItem('saved-searches', JSON.stringify(newList))
}

function loadFromLocalStorage() {
    let savedSearches = localStorage.getItem('saved-searches')
    console.log(savedSearches)

    if (savedSearches===null) {
        savedSearches = []
        return savedSearches
    } else {
        savedSearches = JSON.parse(localStorage.getItem('saved-searches'))
        return savedSearches
    }
}

function searchWeather(event) {
    event.preventDefault();

    const city = searchCity.val()

    let savedSearches = loadFromLocalStorage()
    console.log(savedSearches)
    savedSearches.push(city)
    saveToLocalStorage(savedSearches)

    const weatherUrl = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=b3c89b198d75e42b324fef56894937ee`

    fetch(weatherUrl).then(function(response) {
        return response.json();
    })
    .then(function (data) {
        console.log(data);
        const currentTemp = data.main.temp
        const currentWind = data.wind.speed
        const cityName = data.name
        let currentWeather = data.weather[0].main
        const currentHumidity = data.main.humidity
        console.log(currentWeather)
        const cityLat = data.coord.lat
        const cityLon = data.coord.lon

        if (currentWeather ==='Clouds') {
            currentWeather = '☁️'
        } else if (currentWeather ==='Clear') {
            currentWeather = '☀️'
        } else if (currentWeather ==='Snow') {
            currentWeather = '🌨️'
        } else if (currentWeather ==='Rain') {
            currentWeather = '🌧️'
        } else if (currentWeather ==='Drizzle') {
            currentWeather = '🌦️'
        } else if (currentWeather ==='Thunderstorm') {
            currentWeather = '⛈️'
        }

        const currentCityData = $('<div>')
        currentCityData.addClass('card-container')
        
        weatherData.children('h2').text(`Current Weather in ${cityName} ${currentWeather}`)

        const currentCityTemp = $('<h4>')
        currentCityTemp.addClass('current-city-temp mx-3')
        currentCityTemp.attr('style', 'margin-top:2rem')
        currentCityTemp.text(`Temperature: ${currentTemp} \u2109`)

        const currentCityWind = $('<h4>')
        currentCityWind.addClass('current-city-wind mx-3')
        currentCityWind.text(`Wind: ${currentWind} MPH`)

        const currentCityHumidity = $('<h4>')
        currentCityHumidity.addClass('current-city-humidity mx-3')
        currentCityHumidity.text(`Humidity: ${currentHumidity}%`)

        weatherData.append(currentCityData)
        currentCityData.append(currentCityTemp)
        currentCityData.append(currentCityWind)
        currentCityData.append(currentCityHumidity)


        searchForecast(cityLat, cityLon)    
        
        
    })
}

function searchForecast(lat,lon) {
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?units=imperial&lat=${lat}&lon=${lon}&appid=b3c89b198d75e42b324fef56894937ee`

    fetch(forecastUrl).then(function(response) {
        return response.json();
    })
    .then(function (data) {
        console.log(data);
        const forecastData = data.list
        for (let i = 0; i < forecastData.length; i+=8) {
            let futureWeather = forecastData[i].weather[0].main
            const futureTemp = forecastData[i].main.temp
            const futureWind = forecastData[i].wind.speed
            const futureHumidity = forecastData[i].main.humidity

            if (futureWeather ==='Clouds') {
                futureWeather = '☁️'
            } else if (futureWeather ==='Clear') {
                futureWeather = '☀️'
            } else if (futureWeather ==='Snow') {
                futureWeather = '🌨️'
            } else if (futureWeather ==='Rain') {
                futureWeather = '🌧️'
            } else if (futureWeather ==='Drizzle') {
                futureWeather = '🌦️'
            } else if (futureWeather ==='Thunderstorm') {
                futureWeather = '⛈️'
            }

            const newCard = $('<div>')
            newCard.addClass('card col-lg-2 border m-3 text-bg-primary')
            newCard.attr('style', 'height: 300px')
            
            const newCardHeader = $('<div>')
            newCardHeader.addClass('card-header h3')
            newCardHeader.text('Day 2 - need dayjs()')

            const newCardBody = $('<div>')
            newCardBody.addClass('card-body h2 col justify-between')

            const newCardWeather = $('<div>')
            newCardWeather.addClass('card-text h4')
            newCardWeather.text(futureWeather)

            const newCardTemp = $('<div>')
            newCardTemp.addClass('card-text h4')
            newCardTemp.text(futureTemp)

            const newCardWind = $('<div>')
            newCardWind.addClass('card-text h4')
            newCardWind.text(futureWind)

            const newCardHumidity = $('<div>')
            newCardHumidity.addClass('card-text h4')
            newCardHumidity.text(futureHumidity)

            futureWeatherData.append(newCard)
            newCard.append(newCardHeader)
            newCard.append(newCardBody)
            newCardBody.append(newCardWeather)
            newCardBody.append(newCardTemp)
            newCardBody.append(newCardWind)
            newCardBody.append(newCardHumidity)
            
        }
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

form.addEventListener('submit', searchWeather)