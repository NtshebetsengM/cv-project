const weatherCont = document.getElementById('weather-cont')

weatherCont.addEventListener('click', () => console.log("clicked"))


navigator.geolocation.getCurrentPosition(async position => {
    const lat = position.coords.latitude;
    const long = position.coords.longitude;
    const apiKey = "686e4332ae1595567be7c5967ad6a159";

    try {
        // Reverse Geocoding - get city name
        const geoRes = await fetch(`http://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${long}&limit=5&appid=${apiKey}`);
        if (!geoRes.ok) {
            throw new Error("City not found");
        }
        const geoData = await geoRes.json();
        const name = geoData[0].name;
        const state = geoData[0].state;
        const country = geoData[0].country;
       

        // Weather Data
        const weatherRes = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=metric&appid=${apiKey}`);
        if (!weatherRes.ok) {
            throw new Error("Weather data not available");
        }
        const weatherData = await weatherRes.json();
        const temp = Math.round(weatherData.main.temp);
        const weatherMessage = `The temperature in <strong>${name}</strong>, ${state} (${country}) is  <strong>${temp}</strong>°C.`
            

        weatherCont.innerHTML = weatherMessage ;
        
    } catch (err) {
        console.error(err);
    }
});
