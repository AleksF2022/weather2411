const API_KEY = "e1925445427c432483395911230805";
const input = document.querySelector('.input');
const form = document.querySelector('.form');
const card = document.querySelector('.card');



async function getCurrentWeather(city) {
    const url = `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}&aqi=no&lang=ru`
    const response = await fetch(url);
    const currentData = await response.json();
    return currentData
}
function showCard({ city_name, country, temp_c, icon, condition, localtime }) {
    const cardInner = `<h2 class="card-city">${city_name}<span>${country}</span></h2>
                             <div class="card-weather">
                             <div class="card-value">${temp_c}<sup>°c</sup></div>
                             <img class="card-img" src="${icon}" alt="Weather">
                             </div>
                             <div class="card-description">${condition}</div><div class="card-description">${localtime}</div>`
    card.innerHTML = cardInner
}
function showError(errorMessage) {
    const cardInner = `<h2 class="card-city">${errorMessage}</h2>`
    card.innerHTML = cardInner
}


form.onsubmit = async (event) => {
    event.preventDefault()
    const city = input.value.trim()
    input.value = ""
    const currentData = await getCurrentWeather(city)

    if (currentData.error) {
        showError(currentData.error.message)
    } else {

        const currentWeather = {
            city_name: currentData.location.name,
            country: currentData.location.country,
            temp_c: Math.round(currentData.current.temp_c),
            icon: currentData.current.condition.icon,
            condition: currentData.current.condition.text,
            localtime: currentData.location.localtime,
        }
        showCard(currentWeather)
    }
}










