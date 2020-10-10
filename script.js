$(document).ready(function() {
//get user input address from local storage
localStorage.getItem("userCity");
//get data input and address info on the page
pushInfo(localStorage.getItem("userCity")); 
var apiKey="09306c19b054cde7fcad1767802d4bbf";
// api.openweathermap.org/data/2.5/forecast?q=test&appid={API key}

//     // access the Open Weather API
    function pushInfo(userCity){
        //erase/empty page
        $("#daily-view").empty();
        var queryURL ="https://api.openweathermap.org/data/2.5/forecast?q="+userCity+"&appid="+apiKey;
        // console.log(queryURL);
        //fetch from API
        $.ajax({
            url: queryURL,
            method: "GET",
        })
        // We store all of the retrieved data inside of an object called "fivedayobject"
        .then(function(fivedayobject) {
                // for (var i=0;i<5;i++){
                    var newDiv=$("<div>");
                    newDiv.attr('class','daily-view');
                    // newDiv.hide();
                    var dateList=moment(fivedayobject.list[i*8].dt_txt).format("ll");
                    var icons=fivedayobject.list[i*8].weather[0].icon;
                    icons="http://openweathermap.org/img/wn/"+icon+".png";
                    var temp=(fivedayobject.list[i*8].main.temp -273.15) * 1.80 + 32;
                    // var humidity=fivedayobject.list[i*8].main.humidity;
                    //console.log(fivedayobject.list[i*8]);
                    //  console.log(moment(fivedayobject.list[i*8].dt_txt).format("ll"));
                    
                    // Transfer content to HTML
                    //date
                    newDiv.append($("<h3>").html("<strong>"+dateList+"</strong>").attr("class", "date"));
                    //icon
                    newDiv.append($("<img>").attr("src" + icons).attr("class", "icons"));
                    // console.log(fivedayobject.list[i*8].weather[0].icon);
                    //temp
                    newDiv.append($("<p>").text("Temperature: "+temp.toFixed(2)+"F").attr("class", "temp")); 
                    // console.log(fivedayobject.list[i*8].main.temp);
                    //hum
                    newDiv.append($("<p>").text("Humidity: " + fivedayobject.list[i*8].main.humidity).attr("class", "humidity"));
                    // console.log(fivedayobject.list[i*8].main.humidity);
                    $("daily-view").append(newDiv);
                    
                    // Store user input in localStorage
                    localStorage.setItem("userInput",response.normalizedInput.city);
            // }
        });
    }

    // This function handles events where one button is clicked
        // onclick event for search request
    $("#search-input").on("click", function(event) {
        event.preventDefault();
        // This line grabs the input from the textbox
        var userCity = $("#user-input").val().trim();
        cityinfo(userCity);
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

