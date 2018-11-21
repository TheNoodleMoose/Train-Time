
var config = {
    apiKey: "AIzaSyAglU4lTrdnh9JIf6qPDiD9Gx_UkPZjxTs",
    authDomain: "train-time-80752.firebaseapp.com",
    databaseURL: "https://train-time-80752.firebaseio.com",
    projectId: "train-time-80752",
    storageBucket: "train-time-80752.appspot.com",
    messagingSenderId: "1057720917666"
};
firebase.initializeApp(config);

var database = firebase.database();

var trainName = "";
var destination = "";
var frequency = "";
var nextArrival = "";
var firstTrain = "";
var minutesAway = "";

$("#submitTrain").on("click", function() {
    event.preventDefault();
})