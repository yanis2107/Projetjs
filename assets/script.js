const WeatherIcons = {
    'Rain':'raindrop',
    'Clouds':'wi-day-cloudy',
    'Clear':'wi-day-haze',
    'Snow':'wi-day-snow-wind'
}
ville =  document.querySelector("#ville");
async function loadcity(scity = null) {
    let cit = null;
    if(scity == null)
    {
        let ip = await(await fetch("https://api.ipify.org?format=json")).json();
        let url = 'http://api.ipstack.com/'+ip.ip+'?access_key=15ea2292c38db989c0782b01865b7a37&format=1';
        let obj = await (await fetch(url)).json();
        cit = obj.city;
    }else
        cit = scity;
        console.log(cit);
        let weather = await(await fetch('http://api.openweathermap.org/data/2.5/weather?q='+cit+'&appid=4e9ce9b914b9fab4f1f457b8f93eb421&lang=fr&units=metric')).json();
        console.log(weather);
    displayWeatherInfos(weather);
}
loadcity(null);

function displayWeatherInfos(data){
    const name = data.name;
    const temperature = data.main.temp;
    const conditions = data.weather[0].main;
    const description = data.weather[0].description;
    let app = document.body;
    document.querySelector('#ville').textContent = name;
    document.querySelector('#temperature').textContent = Math.round(temperature);
    document.querySelector('#conditions').textContent = description;
    app.className = "";
    app.classList.add(conditions);
    document.querySelector('.wi').className = "wi "+WeatherIcons[conditions];
}

function look(){
    let c = document.getElementById("city").value;
    loadcity(c);
}