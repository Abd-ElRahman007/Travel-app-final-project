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
    const dataGeo = await postInfo('http://localhost:8000/getGeo', { "data": { "country": countryName } });
    const dataBitCurrent = await postInfo('http://localhost:8000/getBitWeather', { "data": { "long": dataGeo.longi, "lat": dataGeo.lati } });
    const dataBitForcast = await postInfo('http://localhost:8000/getBitWeatherForcast', { "data": { "long": dataGeo.longi, "lat": dataGeo.lati, "dateleave": dateLeave, "datearrive": dateArrive } });
    const pixabayData = await postInfo('http://localhost:8000/getPhoto', { "data": { "location": countryName } });
    //document.getElementById('img').setAttribute('src', pixabayData.total);
    document.getElementById('photoCaption').innerHTML = dataGeo.name;
    document.getElementById('longitude').innerHTML = dataGeo.longi;
    document.getElementById('latitude').innerHTML = dataGeo.lati;
    document.getElementById('currentWeather').innerHTML = dataBitCurrent.weather;
    document.getElementById('leavingWeather').innerHTML = dataBitForcast.weatherleave;
    document.getElementById('arrivingWeather').innerHTML = dataBitForcast.weatherarrive;
    document.getElementById('leavingDate').innerHTML = dateLeave;
    document.getElementById('arrivingDate').innerHTML = dateArrive;
    document.getElementById('daysLeft').innerHTML = n.total;
    document.getElementById('infoContainer').classList.remove('hide');

}

export { handleSubmit };
