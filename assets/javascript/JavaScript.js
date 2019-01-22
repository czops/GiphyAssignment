//Variables list

//build the query

var topics = ["cats", "puppies", "slav", "boxing", "soccer", "climbing", "china", "zen", "kittens", "skiing"];

function appendButtons(){
    for ()
}

function buildQueryURL() {
    // queryURL is the url we'll use to query the API
    var queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?";
  
    // Begin building an object to contain our API call's query parameters
    // Set the API key
    var queryParams = { "api-key": "hSQi8HlYRYNBHYHM3lWKVTWBodAgy1E4" };
  
    // Grab text the user typed into the search input, add to the queryParams object
    queryParams.q = $("#search-term")
      .val()
      .trim();
  
    // If the user provides a startYear, include it in the queryParams object
    var startYear = $("#start-year")
      .val()
      .trim();
  
    if (parseInt(startYear)) {
      queryParams.begin_date = startYear + "0101";
    }
  
    // If the user provides an endYear, include it in the queryParams object
    var endYear = $("#end-year")
      .val()
      .trim();
  
    if (parseInt(endYear)) {
      queryParams.end_date = endYear + "0101";
    }
  
    // Logging the URL so we have access to it for troubleshooting
    console.log("---------------\nURL: " + queryURL + "\n---------------");
    console.log(queryURL + $.param(queryParams));
    return queryURL + $.param(queryParams);
  }