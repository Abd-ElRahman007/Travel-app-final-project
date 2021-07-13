/* Global Variables */
const geo=`http://api.geonames.org/searchJSON?q=london&maxRows=1&username=`;
const bit = `https://api.weatherbit.io/v2.0/current?lat=35.7796&lon=-78.6382&include=minutely&key=API_KEY`;
const bitforcast = `https://api.weatherbit.io/v2.0/forecast/daily?&lat=27&lon=30&key=`;
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getFullYear() + '/' + d.getMonth()+1 + '/' + d.getDate();

async function handleSubmit(event) {
    event.preventDefault();
    document.getElementById('infoContainer').classList.add('hide');
    //check the country name
    let countryName = document.getElementById('country').value;
    let dateLeave = document.getElementById('leave').value;
    let dateArrive = document.getElementById('arrive').value;
    if (document.getElementById(infoContainer).classList.contains('hide')) {
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
        const data = await postInfo('http://localhost:8000/getAll', { data: { 'country': countryName, 'dateleave': dateLeave,'datearrive':dateArrive }, apiUrls: { 'geoweather': geo, 'bitweather': bit, 'bitforcast': bitforcast } });
        document.getElementById('img').setAttribute('src', data.photoApiData.photo);
        document.getElementById('photoCaption').innerHTML = data.geoData.name;
        document.getElementById('longitude').innerHTML = data.geoData.longi;
        document.getElementById('latitude').innerHTML = data.geoData.lati;
        document.getElementById('currentWeather').innerHTML = data.bitCurrentData.weather;
        document.getElementById('leavingWeather').innerHTML = data.bitForcastData.weatherleave;
        document.getElementById('arrivingWeather').innerHTML = data.bitForcastData.weatherarrive;
        document.getElementById('leavingDate').innerHTML = data.data.dateleave;
        document.getElementById('arrivingDate').innerHTML = data.data.datearrive;
        const currentDate = newDate;
        const leavingday = data.data.dateleave;
        const sub = Math.abs(currentDate - leavingday);
        days = sub / (1000 * 3600 * 24);
        document.getElementById('daysLeft').innerHTML = days;
        document.getElementById('infoContainer').classList.remove('hide');
    }
}
export { handleSubmit };
