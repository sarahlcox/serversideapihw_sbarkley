const API_KEY = '09306c19b054cde7fcad1767802d4bbf';


//
// Load jquery / on page load
//
$(document).ready(function()
{
	// Load the search history from local storage getting
	LoadSearchHistory();

	// Get the last searched city
	var lastSearchedCity = localStorage.getItem('lastSearched');

	// If we actually have a last searched city, load the weather for it - otherwise do nothing.
	if ( lastSearchedCity != null ) DoWeather(lastSearchedCity);
});


//
// This function waits for the search button to be clicked
//
$('#search-button').click(function()
{
	// Run the search
	Search();
});


//
// This function waits for the enter button to be pressed while in the search box
//
$('#user-input').keypress(function (e)
{
	// Check which key code was pressed, 13 = enter
	if ( e.which == 13 )
	{
		// Run the search code
	    Search();
	}
});


//
// Adds the users input to the search history
//
function AddToHistory(userInput)
{
	// Get any search history we have
	var historyArray = GetHistoryArray();

	// Check if what the user searched for is already in the history.  If not, add it to the history
	if ( jQuery.inArray(userInput, historyArray) == -1 )
	{
		// Add the city to the history array
		historyArray.push(userInput);

		// Convert the array to a JSON string for storage and store
		localStorage.setItem('searchHistory', JSON.stringify(historyArray));
	}
}


//
// Displays one day of a forecast
//
function DisplayForcastDay(dayObj)
{
	// Convert the temp to F
	var dayTemp = ( dayObj.main.temp - 273.15 ) * 1.80 + 32;

	// Build the html that will be one day of the forecast
	var dayHtml = '<div class="card weatherDay">' +
		'<h5>' + moment(dayObj.dt_txt).format('ll') + '</h5>' +
		'<p><img alt="' + dayObj.weather[0].description + '" src="http://openweathermap.org/img/wn/' + dayObj.weather[0].icon + '.png"></p>' +
		'<p>Temp: ' + dayTemp.toFixed(2) + ' &#730;F</p>' +
		'<p>Humidity: ' + dayObj.main.humidity + '%</p>' +
		'</div>';

	// Append the day to the forecast
	$('#five-day').append(dayHtml);
}


//
// Display Todays Details
//
function DisplayToday(fiveDayObject)
{
	// Get the first day from the forecast list
	var dayObj = fiveDayObject.list[0]

	// Convert the temp to F
	var dayTemp = ( dayObj.main.temp - 273.15 ) * 1.80 + 32;

	// Build the html title of the day
	var dayTitleHtml = fiveDayObject.city.name + ' (' + moment(dayObj.dt_txt).format('ll') + ')';
	dayTitleHtml += '<img alt="' + dayObj.weather[0].description + '" src="http://openweathermap.org/img/wn/' + dayObj.weather[0].icon + '.png">';

	// Set the title with the title html built above
	$('#TodayTitle').html(dayTitleHtml);

	// Fill in the remaining day details
	var dayHtml = '<p>Temperature: ' + dayTemp.toFixed(2) + ' &#730;F</p>' +
		'<p>Humidity: ' + dayObj.main.humidity + '%</p>' +
		'<p>Wind Speed: ' + dayObj.wind.speed + ' MPH</p>';

	// Append the details
	$('#TodaysDetails').html(dayHtml);

	// UV index is not in the normal api data so we need to get and display it separately
	DisplayTodaysUvIndex(fiveDayObject);
}


//
// Gets and displays todays UV tndex at the bottom of the details panel
//
function DisplayTodaysUvIndex(fiveDayObject)
{
	// Build a URL to access the weather api for getting specifically the UV index
	var queryURL ='http://api.openweathermap.org/data/2.5/uvi?lat=' + fiveDayObject.city.coord.lat + '&lon=' + fiveDayObject.city.coord.lon + '&appid=' + API_KEY;

	// Call the weather api getting the uv index
	$.ajax({
		url: queryURL,
		method: "GET",
		dataType: 'json',
	}).then(function(uvData)
	{
		// Get the Uv index value
		var uvIndex = uvData.value;

		// Based on the value, get the color code for the uv index
		var uvIndexColor = GetUvIndexColor(uvIndex);

		// Add the UV index to the weather details with a dynamic color code.
		$('#TodaysDetails').append('<p>UV Index: <span style="color: #ffffff; padding: 5px; background-color: ' + uvIndexColor + ';">' + uvIndex + '</span></p>');
  	});
}



//
// Load the local storage and return an array of the search history (if any)
//
	// Get Search History JSON list
		// Parse the json string into an array
	// If we don't have an array, it means there is no search history.  In this case define an empty array.
	// Return the resulting array
// Populates the search history html panel and make clickable
//

//
//  Searches for a city
//


// oneday("chicago");

