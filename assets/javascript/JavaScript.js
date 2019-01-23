//Variables list

//build the query

var topics = ["cats", "puppies", "slap", "boxing", "soccer", "climbing", "china", "zen", "kittens", "skiing"];

function appendButtons() {
  for (i = 0; i < topics.length; i++) {

    var NewButton = $("<button>").attr("class", "btn btn-primary").html(topics[i]).val(topics[i]);
    $("#button-div").append(NewButton);

  }
}

appendButtons();

//this function should get called when you submit the form
function createNewButton(){
  var newButton = $("#GifButtonInput").val();
  topics.push(newButton);
  console.log(topics);

  $("#button-div").empty();

  for (i = 0; i < topics.length; i++) {

    var NewButton = $("<button>").attr("class", "btn btn-primary").html(topics[i]).val(topics[i]);
    $("#button-div").append(NewButton);

  }
};

$("#GifButton").on("click", function(event) {
  createNewButton();
});


//currently not using this
function buildQueryURL() {
  // queryURL is the url we'll use to query the API
  var queryURL = "https://api.giphy.com/v1/gifs/random?api_key=";

  // Begin building an object to contain our API call's query parameters
  // Set the API key
  var queryParams = { "apikey": "hSQi8HlYRYNBHYHM3lWKVTWBodAgy1E4" };

  // Grab text the user typed into the search input, add to the queryParams object
  queryParams.q = $("#search-term");

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
};



$(".btn-primary").on("click", function (event) {
  //take the html and set it to the search term for the JSON call
  var gif = $(this).attr("value");

  var queryParams = { "apikey": "hSQi8HlYRYNBHYHM3lWKVTWBodAgy1E4" };

  // Constructing a queryURL using the animal name
  //here i plugged in my API key from Giphy
  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
    gif + "&api_key=" + queryParams.apikey + "&limit=5";

  // Performing an AJAX request with the queryURL
  $.ajax({
    url: queryURL,
    method: "GET"
  })
    // After data comes back from the request
    .then(function (response) {
      console.log(queryURL);

      console.log(response);
      // storing the data from the AJAX request in the results variable
      var results = response.data;

      // Looping through each result item
      for (var i = 0; i < results.length; i++) {

        // Creating and storing a div tag
        var gifDiv = $("#gif-div");

        // Creating a paragraph tag with the result item's rating
        var p = $("<p>").text("Rating: " + results[i].rating);

        // Creating and storing an image tag
        var animalImage = $("<img>");
        animalImage.attr("class", "NewGif")

        var LoadPaused = results[i].images.fixed_height.url;
        LoadPaused = LoadPaused.replace('/200.gif','/200_s.gif');
        // Setting the src attribute of the image to a property pulled off the result item
        animalImage.attr("src", LoadPaused);

        // Appending the paragraph and image tag to the animalDiv
        gifDiv.append(p);
        gifDiv.append(animalImage);

        // Prependng the animalDiv to the HTML page in the "#gifs-appear-here" div
        $("#gifs-appear-here").prepend(gifDiv);
      }
    });
});


$(document).on("click", ".NewGif", function AnimateGifs() {
  console.log("why the hell isn't this working?")
  debugger;
  var UnPause = $(this).attr("src");
  UnPause = UnPause.replace('/200_s.gif','/200.gif');
  
  $(this).attr("src", UnPause);
});


//trying to get the gifs to switch from paused to unpaused
// function AnimateGifs() {
  
  
// };