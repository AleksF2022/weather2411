const API_KEY = "e1925445427c432483395911230805";
const input = document.querySelector('.input');
const form = document.querySelector('.form');
const card = document.querySelector('.card');

async function getCurrentWeather(city) {
    const url = `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}&aqi=no&lang=ru`
    const response = await fetch(url);
    const data = await response.json();
    return data
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
    const data = await getCurrentWeather(city)

    if (data.error) {
        showError(data.error.message)
    } else {

        const currentWeather = {
            city_name: data.location.name,
            country: data.location.country,
            temp_c: Math.round(data.current.temp_c),
            icon: data.current.condition.icon,
            condition: data.current.condition.text,
            localtime: data.location.localtime,
        }
        showCard(currentWeather)
    }
}










