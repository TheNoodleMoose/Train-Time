

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
var trainNumber = 0;

database.ref().on("value", function (snapshot) {
    trainNumber = snapshot.numChildren();
})

$("#add-user").on("click", function (button) {
    button.preventDefault();

    trainName = $("#train-name-input").val().trim();
    destination = $("#destination-input").val().trim();
    firstTrainTime = $("#first-train-input").val().trim();
    frequency = $("#frequency-input").val().trim();

    database.ref().push({
        trainName: trainName,
        destination: destination,
        firstTrainTime: firstTrainTime,
        frequency: frequency,
        trainNumber: trainNumber + 1,
    });
});

database.ref().on("child_added", function (snapshot) {
    var sv = snapshot.val();

    console.log(sv.trainName)
    console.log(sv.destination)   
    console.log(sv.frequency)

    var timeNow = moment();

    firstTimeConverted = moment(sv.firstTrainTime, "HH:mm").subtract(1, "years");

    var differenceTime = moment().diff(moment(firstTimeConverted), "minutes");

    var tRemainder = differenceTime % snapshot.val().frequency;

    var minutesTilNextTrain = snapshot.val().frequency - tRemainder;

    var nextTrainTime = moment().add(minutesTilNextTrain, "minutes").format("HH:mm");

    // var nextTrainFormatted = moment(nextTrainTime).;

    var newRow = $("<tr>").append(
        $("<td>").text(sv.trainName),
        $("<td>").text(sv.destination),
        $("<td>").text(`${sv.frequency} minutes`),
        $("<td>").text(nextTrainTime),
        $("<td>").text(`${minutesTilNextTrain} Minutes away`)

    ).attr({
        id: sv.trainNumber,
    })

    $("#newTrainsHere").append(newRow)

}, function (errorObject) {
    console.log("Errors handled: " + errorObject)
})

let updateSchedule = setInterval(function () {
    database.ref().once("value")
        .then(function (snapshot) {
            snapshot.forEach(function (childSnap) {
                var timeNow = moment();

                firstTimeConverted = moment(childSnap.val().firstTrainTime, "HH:mm").subtract(1, "years");

                var differenceTime = moment().diff(moment(firstTimeConverted), "minutes");

                var tRemainder = differenceTime % childSnap.val().frequency;
                var minutesTilNextTrain = childSnap.val().frequency - tRemainder;

                var nextTrainTime = moment().add(minutesTilNextTrain, "minutes").format("HH:mm");

                $(`#${childSnap.val().trainNumber}`).empty();
                $(`#${childSnap.val().trainNumber}`).append(
                    $("<td>").text(childSnap.val().trainName),
                    $("<td>").text(childSnap.val().destination),
                    $("<td>").text(`${childSnap.val().frequency} minutes`),
                    $("<td>").text(nextTrainTime),
                    $("<td>").text(`${minutesTilNextTrain} Minutes away`)
                )
            })
        })
}, 1000)