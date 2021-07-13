// $.getJSON(pixabay, function(data){
// if (parseInt(data.totalHits) > 0)
//     $.each(data.hits, function(i, hit){ console.log(hit.pageURL); });
// else
//     console.log('No hits');
// });

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
    //res.sendFile(path.resolve('src/client/views/index.html'));
});

app.post('getAll', async function (req, res) {
    const data = {
        'country': req.body.data.country,
        'dateleave': req.body.data.dateleave,
        'datearrive': req.body.data.datearrive
    };
    const keys = {
        geo: process.env.API_GEONAMES,
        bitweather: process.env.API_WEATHERBIT,
        pixabay: process.env.API_PIXABAY
    };
    const urls = {
        geo: `http://api.geonames.org/searchJSON?q=${data.country}&maxRows=1&username=${keys.geo}`,
        bitweather: `https://api.weatherbit.io/v2.0/current?lat=${geoData.lati}&lon=${geoData.longi}&include=minutely&key=${keys.bitweather}`,
        bitforcast: `https://api.weatherbit.io/v2.0/forecast/daily?&lat=${geoData.lati}&lon=${geoData.longi}&key=${keys.bitweather}`,
        pixabay: "https://pixabay.com/api/?key=" + keys.pixabay + "&q=" + encodeURIComponent(data.country) + "&category=travel&pretty=true&image_type=photo&orientation=horizontal"
    };
    console.log(data);
    const geoApi = await fetch(urls.geo);
    try {
        const jsonGeoApi = await geoApi.json();
        const geoData = {
            longi: jsonGeoApi.geonames[0].lng,
            lati: jsonGeoApi.geonames[0].lat,
            name: jsonGeoApi.geonames[0].toponymName
        };
        console.log(geoData);
        res.send(geoData.name);
    } catch (error) {
        console.log('error', error);
    }
    const bitCurrent = await fetch(urls.bitweather);
    try {
        const jsonBitCurrent = await bitCurrent.json();
        const bitCurrentData = {
            weather: jsonBitCurrent.data[0].temp
        };
        console.log(bitCurrentData);
        res.send(bitCurrentData);
    } catch (error) {
        console.log('error', error);
    }
    const bitForcast = await fetch(urls.bitforcast);
    try {
        const jsonBitForcast = await bitForcast.json();
        const bitForcastData = {
            weatherleave: '',
            weatherarrive:''
        };
        for (const time of jsonBitForcast.data) {
            if (time.valid_date == data.dateleave) {
                bitForcastData.weatherleave = jsonBitForcast.temp;
            }
            if (time.valid_date == data.datearrive) {
                bitForcastData.weatherarrive = jsonBitForcast.temp;
            }
        }
        console.log(bitForcastData);
        res.send(bitForcastData);
    } catch (error) {
        console.log('error',error);
    }
    const photoApi = await fetch(urls.pixabay);
    try {
        const jsonPhotoApi = photoApi.json();
        const photoApiData = {
            photo: ''
        };
        if (jsonPhotoApi.totalHits <= 0) {
            console.log('no Hits');
        } else {
            photoApiData.photo = hits[0].largeImageURL;
        }
        console.log(photoApiData);
        res.send(photoApiData);
    } catch (error) {
console.log('error',error);
    }
});


// Setup Server
const port = 8000;
const server = app.listen(port, listening);
function listening() {
    console.log(`server is running on localhost:${port}!`);
}
