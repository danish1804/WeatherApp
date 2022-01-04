const apikey = "3265874a2c77ae4a04bb96236a642d2f";
//const declared variable are unchanging(immutable)
//var is not used as because it is not block scoped
//DOM 
const main = document.getElementById("main");
const form = document.getElementById("form");
const search = document.getElementById("search");

const url = (city) =>
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`;

async function getWeatherByLocation(city) {
    const resp = await fetch(url(city), { origin: "cors" });
    const respData = await resp.json();

    console.log(respData);

    addWeatherToPage(respData);
}

function addWeatherToPage(data) {

    if(data.message==='city not found'){
        const weather = document.createElement("div");
        weather.classList.add("weather");
        weather.innerHTML = `
        <h2>You are too Hot to handle</h2>
    `;
    main.innerHTML = "";
    
    main.appendChild(weather);
    }else{

        const temp = KtoC(data.main.temp);
    
        const weather = document.createElement("div");
        weather.classList.add("weather");
    
        weather.innerHTML = `
            <h2><img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" /> ${temp}°C <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" /></h2>
            <small>${data.weather[0].main}</small>
        `;
    
        // cleanup
        main.innerHTML = "";
    
        main.appendChild(weather);
    }
}

//declarative function
function KtoC(K) {
    return Math.floor(K - 273.15);
}

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const city = search.value;

    /*if (city === 'Abhinandita' || city === 'abhinandita') {
        const weather = document.createElement("div");
        weather.classList.add("weather");
        weather.innerHTML = `
        <h2>You are too hot to handle </h2>`
    }*/
     if (city) {
        getWeatherByLocation(city);
    }
});