/* Global Variables */

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getFullYear() + '/' + d.getMonth() + 1 + '/' + d.getDate();

async function handleSubmit(event) {
    event.preventDefault();

    document.getElementById('infoContainer').classList.add('hide');
    //check the country name
    let countryName = document.getElementById('country').value;
    let dateLeave = document.getElementById('leave').value;
    let dateArrive = document.getElementById('arrive').value;
    console.log(countryName, dateLeave, dateArrive);
    const postInfo = async (url, data = {}) => {
        const res = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'same-origin',
            body: JSON.stringify(data),
        });
        try {
            const newInfo = await res.json();
            return newInfo;
        } catch (error) {
            console.log(error);
        }
    };
    const dataGeo = await postInfo('http://localhost:8000/getGeo', { data: { country: countryName } });
    const dataBitCurrent = await postInfo('http://localhost:8000/getBitWeather', { data: { long: dataGeo.geoData.longi, lat: dataGeo.geoData.lati } });
    const dataBitForcast = await postInfo('http://localhost:8000/getBitWeatherForcast', { data: { long: dataGeo.geoData.longi, lat: dataGeo.geoData.lati, dateleave: dateLeave, datearrive: dateArrive } });
    const pixabayData = await postInfo('http://localhost:8000/getPhoto', { data: { location: countryName } });
    document.getElementById('img').setAttribute('src', pixabayData.photoApiData.photo);
    document.getElementById('photoCaption').innerHTML = dataGeo.geoData.name;
    document.getElementById('longitude').innerHTML = dataGeo.geoData.longi;
    document.getElementById('latitude').innerHTML = dataGeo.geoData.lati;
    document.getElementById('currentWeather').innerHTML = dataBitCurrent.bitCurrentData.weather;
    document.getElementById('leavingWeather').innerHTML = dataBitForcast.bitForcastData.weatherleave;
    document.getElementById('arrivingWeather').innerHTML = dataBitForcast.bitForcastData.weatherarrive;
    document.getElementById('leavingDate').innerHTML = dateLeave;
    document.getElementById('arrivingDate').innerHTML = dateArrive;
    const currentDate = newDate;
    const leavingday = data.data.dateleave;
    const sub = Math.abs(currentDate - leavingday);
    days = sub / (1000 * 3600 * 24);
    document.getElementById('daysLeft').innerHTML = days;
    document.getElementById('infoContainer').classList.remove('hide');

}

export { handleSubmit };
