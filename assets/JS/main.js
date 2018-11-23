console.log("This refreshed")
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
var firstTrainTime = "";
var minutesAway = "";

$("#add-user").on("click", function(button) {
    button.preventDefault();
    
    trainName = $("#train-name-input").val().trim();
    destination = $("#destination-input").val().trim();
    firstTrainTime = $("#first-train-input").val().trim();
    frequency = $("#frequency-input").val().trim();
    var timeNow = moment();
    console.log(timeNow)
    firstTimeConverted = moment(firstTrainTime, "HH:mm").subtract(1 ,"years");
    console.log(firstTimeConverted)
    var differenceTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + differenceTime)
    var tRemainder = differenceTime % frequency;
    console.log(tRemainder)
    var minutesTilNextTrain = frequency - tRemainder;
    console.log("MINUTES TILL NEXT TRAIN: " + minutesTilNextTrain)
    var nextTrainTime = moment().add(minutesTilNextTrain, "minutes");
    console.log("ARRIVAL TIME: " + moment(nextTrainTime).format("hh:mm"));
    var nextTrainFormatted = moment(nextTrainTime).format("hh:mm");
    database.ref().push({
        trainName: trainName,
        destination: destination,
        firstTrainTime: firstTrainTime,
        frequency: frequency,
        minutesTilNextTrain: minutesTilNextTrain,
        nextTrainFormatted: nextTrainFormatted,
    });
});

database.ref().on("child_added", function (snapshot) {
    var sv = snapshot.val();

    console.log(sv.trainName)
    console.log(sv.destination)
    console.log(sv.minutesTilNextTrain)
    console.log(sv.frequency)
    console.log(sv.nextTrainFormatted)

    var newRow = $("<tr>").append(
        $("<td>").text(sv.trainName),
        $("<td>").text(sv.destination),
        $("<td>").text(`${sv.frequency} minutes`),
        $("<td>").text(sv.nextTrainFormatted),
        $("<td>").text(`${sv.minutesTilNextTrain} Minutes away`)

    )

    $("#newTrainsHere").append(newRow)

}, function(errorObject) {
    console.log("Errors handled: " + errorObject)
})