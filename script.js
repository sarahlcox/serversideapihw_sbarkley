$(document).ready(function() {
    //define global variables
//var test = "Chicago";
var apiKey="09306c19b054cde7fcad1767802d4bbf";

// api.openweathermap.org/data/2.5/forecast?q=test&appid={API key}

// create click event for the search city bar/button
// $("#citybutton").click(function(e){
//     e.preventDefault();
//     //get user input from input form in top bar.
//     var userInput = $("#input-text").val().trim();

//     // access the Open Weather API
//     console.log(userInput);
function fiveday(city){
var queryURL ="https://api.openweathermap.org/data/2.5/forecast?q="+city+"&appid="+apiKey;

console.log(queryURL);



$.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(fivedayobject) {
      for (var i=0;i<5;i++){
      //console.log(fivedayobject.list[i*8]);
    console.log(moment(fivedayobject.list[i*8].dt_txt).format("ll"));
    //date
    //icon
    console.log(fivedayobject.list[i*8].weather[0].icon);
    //temp
    console.log(fivedayobject.list[i*8].main.temp);
    //hum

    console.log(fivedayobject.list[i*8].main.humidity);
      }
  });
}

function oneday(city){
//1. url
//api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}
var onedayURL = "https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid="+apiKey;
console.log(onedayURL);
//2. ajax
$.ajax(
{
    url: onedayURL,
    method: "GET"
})
.then(function(onedayforcast)
{
    console.log(onedayforcast);
    //3. get data
    //city, 
    //date, 
    //icon, 
    //temp, 
    //humidity, 
    //wind speed,
    //lon
    var lon=(onedayforcast.coord.lon);
    var lat=(onedayforcast.coord.lat);
    //lat
    //uv index: lon & lat => call a second ajax using lon and lat
    //http://api.openweathermap.org/data/2.5/uvi?lat={lat}&lon={lon}&appid={API key}
    var uvURL="http://api.openweathermap.org/data/2.5/uvi?lat="+lat+"&lon="+lon+"&appid="+apiKey+"";
    console.log(uvURL);
    //ajax call


//4.append to html
})


}

oneday("chicago");
 
}); 