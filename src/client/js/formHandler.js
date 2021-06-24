/* Global Variables */
const baseURL = 'http://api.openweathermap.org/data/2.5/forecast?zip=';
const apiKey = '&APPID=19cf35cd1b69bd22f1004ed12615e958&units=metric';
const generateButton = document.getElementById('generate');
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();
const getNewData = async (url,zip,key)=>{
    const infoApi = await fetch(url+zip+key);
    try{
        const finalData = await infoApi.json();
        console.log(finalData);
        return finalData
    }catch(error){
        console.log('error',error);
    }
}
generateButton.addEventListener('click',callback);
function callback(){
    const zipCode = document.querySelector('#zip').value;
    getNewData(baseURL, zipCode, apiKey)
    .then(function(data){
      const feelings = document.getElementById('feelings').value;
      let temp = data.list[0].main.temp;
      postRequest('/addData', {date:d,temperture:temp,content:feelings})
      UI()
    });}
/*THE SECTION BELOW IS FROM UDACITY LESSONS AND IT POSTS THE DATA*/
const postRequest = async (url='',data ={})=>{
    const response = await fetch(url,{
        method:"POST",
        credentials:'same-origin',
        headers:{
            'Content-Type':'application/json',
        },
        body:JSON.stringify(data),
    });
    try{
        const newData = await response.json();
        return newData;
    }catch(error){
        console.log('error',error)
    }
}
const UI = async (url)=>{
    const req = await fetch('/allData');
    try{
        const theFinalData = await req.json();
        console.log(theFinalData);
        document.getElementById('date').innerHTML = `date:${theFinalData.date}`;
        document.getElementById('temp').innerHTML = `temperature:${theFinalData.temp}`;
        document.getElementById('content').innerHTML = `feeling:${theFinalData.content}`;
    }catch(error){
        console.log('error',error)
    }
}