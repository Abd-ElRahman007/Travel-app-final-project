

// Create a new date instance dynamically with JS

async function handleSubmit(event) {
    event.preventDefault();
    document.getElementById('hider').addEventListener('click', () => {
        document.getElementById('infoContainer').classList.add('hide');
    });
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
    document.getElementById('img').setAttribute('src', pixabayData.photo);
    document.getElementById('photoCaption').innerHTML = dataGeo.name;
    document.getElementById('longitude').innerHTML = dataGeo.longi;
    document.getElementById('latitude').innerHTML = dataGeo.lati;
    document.getElementById('currentWeather').innerHTML = dataBitCurrent.weather + " C&deg;";
    document.getElementById('leavingWeather').innerHTML = dataBitForcast.weatherleave + " C&deg;";
    document.getElementById('arrivingWeather').innerHTML = dataBitForcast.weatherarrive + " C&deg;";
    document.getElementById('leavingDate').innerHTML = dateLeave;
    document.getElementById('arrivingDate').innerHTML = dateArrive;
    const today = new Date();
    let dateleft = today.getMonth() + 1 + '-' + today.getDate() + '-' + today.getFullYear();
    let leave = dateLeave;
    getCountDown();
    function getCountDown() {
        let leftDate = new Date(leave);
        let now = new Date(dateleft);
        let sub = (leftDate.getTime() - now.getTime()) / 1000;
        sub = Math.abs(Math.floor(sub));
        let days = Math.floor(sub / (24 * 60 * 60));
        document.getElementById('daysLeft').innerHTML = days;
    }
    document.getElementById('infoContainer').classList.remove('hide');

}

export { handleSubmit };
