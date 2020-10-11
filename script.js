// Define a global constant for the api key that can never be modified.
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
//  Load all the weather panels for the city name that is passed in
//
function DoWeather(cityName)
{
	// Set the last searched city so we can load it if the page is refresh or visited again later
	localStorage.setItem('lastSearched', cityName);

	// Build a url to access the 5 day weather forecast
	var queryURL ="https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&appid=" + API_KEY

	// Access the weather api getting a 5 day weather forecast
	$.ajax({
		url: queryURL,
		method: "GET",
		dataType: 'json',
		success: function (fiveDayObject)
		{
			// Load todays details panel
			DisplayToday(fiveDayObject);


			// Load the 5 Day Forecast panel
			$('#five-day').empty();  // Clear the 5 day panel

			// Iterate through 5 days of weather
			for (var i = 0; i < 5; i++ )
			{
				// Display one day of the forecast
				// i * 8 because the weather api returns 8 samples of weather per day, except for today which may have less than 8
				// since the first iteration i = 0, then 0 * 8 = 0, so this will give us the first element of the list which will be
				// the current weather conditions.  Future iterations (1 * 8 = 8), we know this will be the next day and so on so forth.
				DisplayForcastDay(fiveDayObject.list[i * 8]);
			}
		},
		error: function (xhr)
		{
			// If an error occurs, get the error data from the weather service and display it.  This is most likely a bad city someone typed.
			errorData = xhr.responseJSON;
			alert('There was an error with your weather request.  The error was: ' + errorData.message + ' (' + errorData.cod + ')');
		},
	});
}


//
// Load the local storage and return an array of the search history (if any)
//
function GetHistoryArray()
{
	// Get Search History JSON list
	var historyJson = localStorage.getItem('searchHistory');

	// Parse the json string into an array
	var historyArray = JSON.parse(historyJson);

	// If we don't have an array, it means there is no search history.  In this case define an empty array.
	if ( historyArray == null ) historyArray = [];

	// Return the resulting array
	return historyArray;
}


//
// Returns a color code for how good or bad the uv index is.  Data from:  https://19january2017snapshot.epa.gov/sunsafety/uv-index-scale-1_.html
//
function GetUvIndexColor(uvIndex)
{
	if ( uvIndex < 3.0 )  // UV Index is less than 3 - Favorable
	{
		return '#00b151';
	}
	else if ( uvIndex >= 3.0 && uvIndex < 6.0 )  // Uv Index is between 3 and less than 6 - Moderate
	{
		return '#f95901';
	}
	else  // UV index is greater than or equal to 6 - Severe
	{
		return '#d90011';
	}
}


//
// Populates the search history html panel
//
function LoadSearchHistory()
{
	// Clear the panel
	$('#recentSearches').empty();

	// Get the search history array
	var historyArray = GetHistoryArray();

	// Iterate through the history in reverse order so that the newest searched items will show at the top of the list.
	for ( i = historyArray.length - 1; i >= 0; i-- )
	{
		// Add the search history to the panel and make it clickable so we can easily load that searched city weather
		$('#recentSearches').append('<p><a href="Javascript:DoWeather(\'' + escape(historyArray[i]) + '\');">' + historyArray[i] + '</a></p>')
	}

	// If we have history, show a clear button so the user can get rid of their history if they want.
	if ( historyArray.length > 0 )
	{
		// Show the clear history button
		$('#recentSearches').append('<p><a href="Javascript:localStorage.removeItem(\'searchHistory\'); localStorage.removeItem(\'lastSearched\'); LoadSearchHistory();"><i>Clear All History</i></a></p>')
	}
}


//
//  Searches for a city
//
function Search()
{
	// Get the value the user typed into the search box
	var userCity = $('#user-input').val();

	// See if the user actually typed a city.  We trim to avoid searching for a city that is say just someone typing empty white space.
	if ( userCity.trim() == '' )
	{
		// Alert the user they need to enter a city and stop doing anything else below.
		alert('Please enter a city name.');
		return;
	}

	// We have a city so add it to history
	AddToHistory(userCity);

	// Load the search history panel
	LoadSearchHistory();

	// Load the weather for the searched city
	DoWeather(userCity);

	// Clear the text box to be clean.
	$('#user-input').val('');
}