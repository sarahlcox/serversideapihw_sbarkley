$(document).ready(function() {
//get user input address from local storage
localStorage.getItem("userCity");
//get data input and address info on the page
pushInfo(localStorage.getItem("userCity")); 
var apiKey="09306c19b054cde7fcad1767802d4bbf";
// api.openweathermap.org/data/2.5/forecast?q=test&appid={API key}

//     // access the Open Weather API
//     console.log(userInput);
    function fiveDayCards(userCity){
        //erase/empty page
        $("#daily-view").empty();
        var queryURL ="https://api.openweathermap.org/data/2.5/forecast?q="+userCity+"&appid="+apiKey;
        // console.log(queryURL);
        //fetch from API
        $.ajax({
            url: queryURL,
            method: "GET"
        })
        // We store all of the retrieved data inside of an object called "fivedayobject"
        .then(function(fivedayobject) {
                for (var i=0;i<5;i++){
                    var dailyView=$("<div>").addClass("daily-view");
                    // dailyView.hide();
                    var dateList=moment(fivedayobject.list[i*8].dt_txt).format("ll");
                    var icons=fivedayobject.list[i*8].weather[0].icon;
                    icons="http://openweathermap.org/img/wn/"+icon+".png";
                    var temp=(fivedayobject.list[i*8].main.temp -273.15) * 1.80 + 32;
        // var humidity=fivedayobject.list[i*8].main.humidity;
      //console.log(fivedayobject.list[i*8]);
    // console.log(moment(fivedayobject.list[i*8].dt_txt).format("ll"));
// Transfer content to HTML
                    //date
                    dailyView.append($("<h3>").html("<strong>"+dateList+"</strong>"));
                    //icon
                    dailyView.append($("<img>").attr("src" + icons));
                    // console.log(fivedayobject.list[i*8].weather[0].icon);
                    //temp
                    dailyView.append($("<p>").html("Temperature: "+temp.toFixed(2)+"F"));
                    // console.log(fivedayobject.list[i*8].main.temp);
                    //hum
                    dailyView.append($("<p>").text("Humidity: " + fivedayobject.list[i*8].main.humidity));
                    // console.log(fivedayobject.list[i*8].main.humidity);
                    $("daily-view").append(dailyView);
      }
  });
}


//     // This function handles events where one button is clicked
//     function searchAndStore(userSearch){
//         // onclick event for search request
//         $(".search-input").on("submit", function(event) {
//             event.preventDefault();
//             // This line grabs the input from the textbox
//             var userCity = $("#user-input").val().trim();
//             cityinfo(userCity);
//         });
// }

// function oneday(userCity){
//1. url
//api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}
var onedayURL = "https://api.openweathermap.org/data/2.5/weather?q="+userSearch+"&appid="+apiKey;
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
});


}

// oneday("chicago");


 
}); 