
var path = require('path');

//* declare express
const express = require('express');
const fetch = require('node-fetch');

//* start the instance of the app
const app = express();
app.use(express.static('dist'));

//* require bodyParser
const bodyParser = require('body-parser');

//* set bodyParser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//* require cors
const cors = require('cors');
app.use(cors());

//* declare the dotenv.
const dotenv = require('dotenv');
const { json } = require('express');
dotenv.config();

app.get('/', function (req, res) {
    res.sendFile(path.resolve('dist/index.html'));
});

app.post('/getGeo', async function (req, res) {
    const countryTitle = req.body.data.country;
    const geoKey = process.env.API_GEONAMES;
    const geoUrl = `http://api.geonames.org/searchJSON?q=${countryTitle}&maxRows=1&username=${geoKey}`;
    const geoApi = await fetch(geoUrl);
    try {
        const jsonGeoApi = await geoApi.json();
        const geoData = {
            "longi": jsonGeoApi.geonames[0].lng,
            "lati": jsonGeoApi.geonames[0].lat,
            "name": jsonGeoApi.geonames[0].toponymName
        };
        console.log(geoData);
        res.send(geoData);
    } catch (error) {
        console.log('error', error);
    }
});
app.post('/getBitWeather', async function (req, res) {
    const coordinates = {
        long: req.body.data.long,
        lat: req.body.data.lat
    };
    const bitweatherkey = process.env.API_WEATHERBIT;
    const bitweatherUrl = `https://api.weatherbit.io/v2.0/current?lat=${coordinates.lat}&lon=${coordinates.long}&include=minutely&key=${bitweatherkey}`;
    const bitCurrent = await fetch(bitweatherUrl);
    try {
        const jsonBitCurrent = await bitCurrent.json();
        const bitCurrentData = {
            "weather": jsonBitCurrent.data[0].temp,
            "weatherState": jsonBitCurrent.data[0].weather.description
        };
        console.log(bitCurrentData);
        res.send(bitCurrentData);
    } catch (error) {
        console.log('error', error);
    }
});
app.post('/getBitWeatherForcast', async function (req, res) {
    const coordinate = {
        "long": req.body.data.long,
        "lat": req.body.data.lat,
        "leave": req.body.data.dateleave,
        "arrive": req.body.data.datearrive
    };
    console.log(coordinate);
    const bitweatherForcastkey = process.env.API_WEATHERBIT;
    const bitforcastUrl = `https://api.weatherbit.io/v2.0/forecast/daily?&lat=${coordinate.lat}&lon=${coordinate.long}&key=${bitweatherForcastkey}`;
    const bitForcast = await fetch(bitforcastUrl);
    try {
        const jsonBitForcast = await bitForcast.json();
        let bitForcastData = {};
        for (const time of jsonBitForcast.data) {
            if (time.valid_date == coordinate.leave) {
                bitForcastData.weatherleave = time.temp;
                bitForcastData.weatherleaveState = time.weather.description;
            }
            if (time.valid_date == coordinate.arrive) {
                bitForcastData.weatherarrive = time.temp;
                bitForcastData.weatherarriveState = time.weather.description;
            }
        }
        console.log(bitForcastData);
        res.send(bitForcastData);
    } catch (error) {
        console.log('error', error);
    }
});
app.post('/getPhoto', async function (req, res) {
    const location = {
        "location": req.body.data.location,
        "pixabayKey": process.env.API_PIXABAY
    };
    const pixabayUrl = `https://pixabay.com/api/?key=${location.pixabayKey}&q=${location.location}&pretty=true&image_type=photo`;
    const pixabayData = await fetch(pixabayUrl);
    try {
        const jsonPixabay = await pixabayData.json();
        const photoApi = {
            "photo": jsonPixabay.hits[0].largeImageURL
        };
        console.log("pixabayPhoto", photoApi);
        res.send(photoApi);
    } catch (error) {
        console.log("error", error);
    }
});



// Setup Server
const port = 8000;
const server = app.listen(port, listening);
function listening() {
    console.log(`server is running on localhost:${port}!`);
}
