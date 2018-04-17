var fs = require("fs");
var request = require("request");
var keys = ("./keys.js");
var twitter = require("twitter");
var spotify = require("spotify");
var omdb = require('omdb');
var arg1 = process.argv[2];
var arg2 = process.argv[3];


function first() {
    if (arg1 === "twitter") {
        twitter();
    }
    else if (arg1 === "spotify") {
        spotifyThis();
    }
    else if (arg1 === "movie") {
        movie();
    }
    else {
        console.log("This is now suported by Liri");
    }
};

//Doesn't work, and i have no idea
function spotifyThis() {
    spotify.search({ type: 'track', query: arg2 }, function (err, data) {
        if (err) {
            console.log('Error occurred: ' + err);
            return;
        }
        console.log(data);
    });
};

//Doesn't work, but that might be bacuase i don't have a twitter and have no way to access the twitter database
function twitter() {
    var client = new Twitter({
        consumer_key: '',
        consumer_secret: '',
        access_token_key: '',
        access_token_secret: ''
    });


    var params = { screen_name: arg2 };
    client.get('statuses/user_timeline', arg2, function (error, tweets, response) {
        if (!error) {
            console.log(tweets);
        }
    });
};

function movie() {
    arg2 = process.argv[3];
    request("http://www.omdbapi.com/?t=" + arg2 + "&y=&plot=short&r=json&tomatoes=true&apikey=4d874286", function (error, response, body) {
        if (!error && response.statusCode == 200) {
            var movieObject = JSON.parse(body);
            console.log(movieObject);
        } else {
            console.log("Error :"+ error);
            return;
        }
    });
};


first();