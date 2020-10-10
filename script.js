$(document).ready(function() {
//get user input address from local storage
// localStorage.getItem("userCity");
//get data input and address info on the page
// getInfo(localStorage.getItem("userCity")); 
var apiKey="09306c19b054cde7fcad1767802d4bbf";
// api.openweathermap.org/data/2.5/forecast?q=test&appid={API key}
var dashboard = $(".card-body");
var userCity;
var Chicago;
//     // access the Open Weather API

//     // access the Open Weather API
    function getInfo(){
        //clears dashboard and 5 day containers 
        // dashboard.empty();
        // $("#daily-view").empty();
        // console.log(queryURL);
        //fetch from API
        var currentDayURL ="https://api.openweathermap.org/data/2.5/weather?q="+Chicago+"&appid="+apiKey;
        var fiveDayURL ="https://api.openweathermap.org/data/2.5/forecast?q="+Chicago+"&appid="+apiKey;

        $.ajax({
            url: currentDayURL,
            method: "GET",

        })
        .then(function (currentWeatherData){
            console.log(currentDayURL);

            // basically same variables as 5 day
            // var getDate = new Date (currentWeatherData.list[0].dt_txt)
            // var dateformat=moment(currentWeatherData.list[i*8].dt_txt).format("ll");
            // var cityName = $(".cityName").text(currentWeatherData.city.name);
            // var iconcode = currentWeatherData.list[0].weather[0].icon;
            // var iconsUrl="http://openweathermap.org/img/wn/"+icons+".png";
            // var temp=(fiveDayObject.list[i*8].main.temp -273.15) * 1.80 + 32;



        })

        $.ajax({
            url: fiveDayURL,
            method: "GET",

        })
        // We store all of the retrieved data inside of an object called "fiveDayObject"
        .then(function(fiveDayObject) {
                for (i=0;i<5;i++){
                    var newDiv=$("<div>");
                    newDiv.attr('class','daily-view col');
                    $("daily-view").append(newDiv);
                    // newDiv.hide();
                    var dateList=moment(fiveDayObject.list[i*8].dt_txt).format("ll");
                    var iconcode=fiveDayObject.list[i*8].weather[0].icon;
                    var iconurl="http://openweathermap.org/img/wn/"+iconcode+".png";
                    var temp=(fiveDayObject.list[i*8].main.temp -273.15) * 1.80 + 32;
                    // var humidity=fiveDayObject.list[i*8].main.humidity;
                    //console.log(fiveDayObject.list[i*8]);
                    //  console.log(moment(fiveDayObject.list[i*8].dt_txt).format("ll"));

                    // Transfer content to HTML
                    //date
                    newDiv.append($("<h3>").html("<strong>"+dateList+"</strong>").attr("class", "date"));
                    //icon
                    newDiv.append($("<img>").attr("src" + iconurl).attr("class", "icons"));
                    // console.log(fiveDayObject.list[i*8].weather[0].icon);
                    //temp
                    newDiv.append($("<p>").text("Temperature: "+temp.toFixed(2)+"F").attr("class", "temp")); 
                    // console.log(fiveDayObject.list[i*8].main.temp);
                    //hum
                    newDiv.append($("<p>").text("Humidity: " + fiveDayObject.list[i*8].main.humidity).attr("class", "humidity"));
                    // console.log(fiveDayObject.list[i*8].main.humidity);
                    
                    // Store user input in localStorage
                    localStorage.setItem("userInput",response.normalizedInput.userCity);
            }
        });
    }

    // This function handles events where one button is clicked
        // onclick event for search request
    $("#search-input").click(function(event) {
        event.preventDefault();
        // This line grabs the input from the textbox
        userCity = $("#user-input").val().trim();
        getuserCity();
    });

//create a function to display weather for city
    function citydata(userCity){
        if (userCity === null) {
            $("#daily-view").empty();
            localStorage.getItem("userCity");
            pushInfo(localStorage.getItem("userCity")); 
    
        }
        else{
            $("#daily-view").empty();
            localStorage.setItem("userAddress", userAddress)
            pushInfo(localStorage.getItem("userAddress")); 
        }
    }
})



// function oneday(userCity){
//1. url
//api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}


// var onedayURL = "https://api.openweathermap.org/data/2.5/weather?q="+userSearch+"&appid="+apiKey;
// console.log(onedayURL);
// //2. ajax
// $.ajax(
// {
//     url: onedayURL,
//     method: "GET"
// })
// .then(function(onedayforcast)
// {
//     console.log(onedayforcast);
//     //3. get data
//     //city, 
//     //date, 
//     //icon, 
//     //temp, 
//     //humidity, 
//     //wind speed,
//     //lon
//     var lon=(onedayforcast.coord.lon);
//     var lat=(onedayforcast.coord.lat);
//     //lat
//     //uv index: lon & lat => call a second ajax using lon and lat
//     //http://api.openweathermap.org/data/2.5/uvi?lat={lat}&lon={lon}&appid={API key}
//     var uvURL="http://api.openweathermap.org/data/2.5/uvi?lat="+lat+"&lon="+lon+"&appid="+apiKey+"";
//     console.log(uvURL);
//     //ajax call
// //4.append to html
// });




// oneday("chicago");

