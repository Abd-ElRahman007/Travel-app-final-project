// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express')
// Start up an instance of app
const app = express();
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());
// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
const port = 8000;
const server = app.listen(port,listing);
function listing(){
    console.log(`localhost:${port}`);
}
const postData = app.post('/addData',(req,res)=>{
    projectData['date'] = req.body.date;
    projectData['temp'] = req.body.temperture;
    projectData['content'] = req.body.content;
    console.log(projectData);
});
const getData = app.get('/allData',(req,res)=>{res.send(projectData);console.log(projectData);});