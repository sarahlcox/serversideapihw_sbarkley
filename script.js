
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