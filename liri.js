require("dotenv").config();

var keys = require("./keys.js");
var fs = require("fs");
var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);
var request = require("request");
var Twitter = require("twitter");
var client = new Twitter(keys.twitter);
var commands = process.argv[2];
var searchInput = process.argv[3] || "";
var movieName = process.argv[3];

getCommand();

function getCommand(){
switch(commands) {
    case "my-tweets":
        myTweets();
        break;

    case "spotify-this-song":
     spotifythisSong();
        break;

    case "movie-this":
    movieThis();
    break;

    case "do-what-it-says":
        dowhatitSays();
        break;

}
}


 

function myTweets() {
   
    var params = {screen_name: 'uclabootcamp'};
    client.get('statuses/user_timeline', params, function(error, tweets, response) {
	if (!error) {
	    for(var i = 0; i < tweets.length; i++) {
		
		console.log(tweets[i].text);
	    };
	} else {
        console.log("error");
        return;
	}
    });
}; 



function spotifythisSong() {
    spotify.search({ type: 'track', query: searchInput }, function(err, data) {
	if ( err ) {
            console.log('Something went wrong: ' + err);
            return;
	} else {
	    console.log(JSON.stringify(data.tracks.items[0].artists, null, 2));
	   
	    console.log("Artitst: " + data.tracks.items[0].artists[0].name);
	   
	    console.log("Song: " + data.tracks.items[0].name);
	   
	    console.log("Spotify Link: " + data.tracks.items[0].href);
	   
	    console.log("Album: " + data.tracks.items[0].album.name);

    }if (searchInput==="" && commands==="spotify-this-song") {
        
        spotifythisSong();
    } 

 })
};







function movieThis() {

    var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";

    request(queryUrl, function(error, response, body) {

        if (!error && response.statusCode === 200) {
         
console.log("Title: " + JSON.parse(body).Title);
	    
	    console.log("Year Released: " + JSON.parse(body).Year);
	 
	    console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
	   
	    console.log("Country: " + JSON.parse(body).Country);
	    
	    console.log("Language: " + JSON.parse(body).Language);
	   
	    console.log("Plot: " + JSON.parse(body).Plot);
	  
	    console.log("Actors: " + JSON.parse(body).Actors);
	   
	    console.log("Rating: " + JSON.parse(body).Ratings[1].Value);
	  
	    console.log("Rotten Tomatoes: https://www.rottentomatoes.com/search/?search=" + movieName);
	

        }else{
            console.log(error)
        }

    })}



    function dowhatitSays() {
        fs.readFile("random.txt", "utf8", function(error, data) {
        if (error) {
            console.log(error);
        } else {
            var textReader = data.split(",");
            console.log(textReader);
            searchInput = textReader[1];
           commands = textReader[0];
        getCommand();
        }
        });
    } 