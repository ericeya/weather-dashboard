

// const requestForecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${APIKey}`

// const requestApiUrl = `http://api.openweathermap.org/data/2.5/forecast?id=${APIKey}`
// const queryURL = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKey}`;

const searchCity = $('#searchbar')
const formSection = $('form')
const form= document.querySelector('form')
const weatherData = $('#weather-data')
const futureWeatherData = $('#future-weather-data')
const searchArea = $('#search-area')
const now = dayjs().format('MM/DD/YYYY')
const recentCityContainer = $('.recent-city-container')

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

function displayRecentSearches () {
    let savedSearches = JSON.parse(localStorage.getItem('saved-searches'))

    // This empty function prevents the lists from stacking multiple times on refresh.
    recentCityContainer.empty()

    // For loop goes through only the first 5 elements in the array and displays them.
    if (savedSearches !== null) {
    for (let i = 0; i < 5; i++) {
        const recentSearch = savedSearches[i];

        const recentCityList = $('<div>')
        recentCityList.addClass('h4 px-2 m-4 h-auto rounded bg-secondary d-flex align-items-center uniquecity')
        recentCityList.attr('style', 'width: 90%; min-height: 50px; cursor: pointer')
        recentCityList.attr('id', `recent-search-button-${[i]}`)
        recentCityList.attr('data-city-name', `${savedSearches[i]}`)

        const recentCityName = $('<h4>')
        recentCityName.attr('style', 'margin:auto')
        recentCityName.attr('id', `recent-search-button-${[i]}`)
        recentCityName.text(recentSearch)

        recentCityContainer.append(recentCityList)
        recentCityList.append(recentCityName)
       }
    }
}

function searchWeather(event) {
    event.preventDefault();

    const city = searchCity.val()
   
    // This is the API URL for current weather data.
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

        if (currentWeather ==='Clouds' || currentWeather ==='Haze') {
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
        } else if (currentWeather ==='Fog' || currentWeather==='Mist'){
            currentWeather = '🌫️'
        } else if (currentWeather ==='Tornado') {
            currentWeather = '🌪️'
        }

        // This empty() function is to prevent data from stacking on searching new cities.
        $('#weather-data').children('div').empty()
        $('#future-weather-data').empty()

        // create elements and place them into appropriate element body in html.
        const currentCityData = $('<div>')
        currentCityData.addClass('card-container')
        currentCityData.attr('id', 'card-data')
        
        weatherData.children('h2').text(`Current Weather in ${cityName} (${dayjs().format('M/D/YY')}) ${currentWeather} `)

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
        
        // This would return [] if there's no data in localStorage
        let savedSearches = loadFromLocalStorage() 

        // This looks for existing city name in the localStorage and if it does, it won't add.
        // By using .unshift, we're adding the most recent search to the top.
        const comparisonSearch = savedSearches.includes(cityName)
        if (comparisonSearch === false) {
            savedSearches.unshift(cityName)
        }
        
        saveToLocalStorage(savedSearches)
    
        displayRecentSearches()
        
    })

}

function searchWeatherByClick(id) {
    
    let city;
    const tableCity = recentCityContainer.children()
    for (let i = 0; i < tableCity.length; i++) {
        const tableCityChild = tableCity[i].attributes[2].nodeValue
        console.log(tableCityChild);
        const tableCityChildName = tableCity[i].attributes[3].nodeValue
        console.log(tableCityChildName);
        if (tableCityChild === id) {
            city = tableCityChildName
        }   
    }
    
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

        if (currentWeather ==='Clouds' || currentWeather ==='Haze') {
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
        } else if (currentWeather ==='Fog' || currentWeather==='Mist'){
            currentWeather = '🌫️'
        } else if (currentWeather ==='Tornado') {
            currentWeather = '🌪️'
        }

        // This empty() function is to prevent data from stacking on searching new cities.
        $('#weather-data').children('div').empty()
        $('#future-weather-data').empty()

        // create elements and place them into appropriate element body in html.
        const currentCityData = $('<div>')
        currentCityData.addClass('card-container')
        currentCityData.attr('id', 'card-data')
        
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

        // The Forecast API requires latitude and longitude. This info is available in the current weather data.
        // Hence, it has been passed through as a parameter to the searchForecast function.
        searchForecast(cityLat, cityLon)    
        
        // This would return [] if there's no data in localStorage
        let savedSearches = loadFromLocalStorage() 

        // This looks for existing city name in the localStorage and if it does, it won't add.
        // By using .unshift, we're adding the most recent search to the top.
        const comparisonSearch = savedSearches.includes(cityName)
        if (comparisonSearch === false) {
            savedSearches.unshift(cityName)
        }
        
        saveToLocalStorage(savedSearches)
    
        displayRecentSearches()
        
    })

}

// This function is very similar to get searchWeather function. Variables have been given a slightly different name for less confusion.
function searchForecast(lat,lon) {
    // Fetch forecast API URL with lat/lon passed thru from searchWeather func
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
            const futureDate = dayjs(forecastData[i].dt_txt)
            const formattedDate = futureDate.format('M/D/YY [-] h A')

            if (futureWeather ==='Clouds' || futureWeather ==='Haze') {
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
            } else if (futureWeather ==='Fog' || futureWeather==='Mist'){
                futureWeather = '🌫️'
            } else if (futureWeather ==='Tornado') {
                futureWeather = '🌪️'
            }

            // create elements and place them into appropriate element body in html.
            const newCard = $('<div>')
            newCard.addClass('card col-lg-2 border m-3 text-bg-primary')
            newCard.attr('style', 'min-height: 300px')
            
            const newCardHeader = $('<div>')
            newCardHeader.addClass('card-header h3')
            newCardHeader.text(formattedDate)

            const newCardBody = $('<div>')
            newCardBody.addClass('card-body h2 d-flex flex-column justify-content-evenly')

            const newCardWeather = $('<div>')
            newCardWeather.addClass('card-text h2')
            newCardWeather.text(futureWeather)

            const newCardTemp = $('<div>')
            newCardTemp.addClass('card-text h4')
            newCardTemp.text(`Temp: ${futureTemp} \u2109`)

            const newCardWind = $('<div>')
            newCardWind.addClass('card-text h4')
            newCardWind.text(`Wind: ${futureWind} MPH`)

            const newCardHumidity = $('<div>')
            newCardHumidity.addClass('card-text h4')
            newCardHumidity.text(`Humidity: ${futureHumidity}%`)

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

// This function is required to grab the id of the recent search list when clicked on by using event.target.id.
// Once the id is grabbed, it's passed as a parameter to searchWeatherByClick which is same function as searchWeather
// First portion of searchWeatherByClick has been modified to grab proper city name to search thru element attributes.
function mouseClickValue(event) {
    const mousePointer = event.target.id
    console.log(mousePointer);
    searchWeatherByClick(mousePointer)
}

// This function loads from localStorage to show saved recent search lists.
displayRecentSearches()

form.addEventListener('submit', searchWeather)


recentCityContainer.on('click', mouseClickValue)




