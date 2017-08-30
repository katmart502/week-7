/* global firebase moment */
// Steps to complete:
// 1. Initialize Firebase
// 2. Create button for adding new trains - then update the html + update the database
// 3. Create a way to retrieve trains from the train database.
// 4. Create a way to calculate the frequency. Using difference between first train and frequency.
//    Then use moment.js formatting to set difference in months.
// 5. Calculate Total billed
// 1. Initialize Firebase

  var config = {
    apiKey: "AIzaSyAm_YuD92T5BAjCc1W1WJ6xZligqln9h_c",
    authDomain: "train-time-sheet.firebaseapp.com",
    databaseURL: "https://train-time-sheet.firebaseio.com",
    projectId: "train-time-sheet",
    storageBucket: "train-time-sheet.appspot.com",
    messagingSenderId: "855226527416"
  } ;

  firebase.initializeApp(config);

var database = firebase.database();
// 2. Button for adding trains
$("#add-train-btn").on("click", function(event) {
  event.preventDefault();
  // Grabs user input
  var empTrainName = $("#train-name-input").val().trim();
  var empDestination = $("#destination-input").val().trim();
  var empFrequency = $("#Frequency-input").val(); 
  var empNextArrival = $("#Next Arrival-input").val();
  // Creates local "temporary" object for holding train data
  var newEmp = {
    name: empTrainName,
    role: empDestination,
    start: empFrequency,
    rate: empNextArrival
  };
  // Uploads employee data to the database
  database.ref().push(newEmp);
  // Logs everything to console
  console.log(newEmp.TrainName);
  console.log(newEmp.Destination);
  console.log(newEmp.Frequency);
  console.log(newEmp.NextArrival);
  // Alert
  alert("New Train information added");
  // Clears all of the text-boxes
  $("#train-name-input").val("");
  $("#destination-input").val("");
  $("#frequency-input").val("");
  $("#NextArrival-input").val("");
});
// 3. Create Firebase event for adding trains to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function(childSnapshot, prevChildKey) {
  console.log(childSnapshot.val());
  // Store everything into a variable.
  var empTrainName = childSnapshot.val().TrainName;
  var empDestination= childSnapshot.val().Destination;
  var empFrequency = childSnapshot.val().Frequency;
  var empNextArrival = childSnapshot.val().NextArrival;
  // train Info
  console.log(empTrainName);
  console.log(empDestination);
  console.log(empFrequency);
  console.log(empNextArrival);
  // Prettify the train start
  var empStartPretty = moment.unix(empFirstTrainTime).format("MM/DD/YY");
  // Calculate the months worked using hardcore math
  // To calculate the frequency
  var empMinutes = moment().diff(moment.unix(empFirstTrainTime, "X"), "months");
  console.log(empMinutes);
  // Calculate the frequency
  var empNextArrival = empFrequency * empMinutes;
  console.log(empBilled);
  // Add each train's data into the table
  $("#train-table > tbody").append("<tr><td>" + empTrainName + "</td><td>" + emp + "</td><td>" +
  empStartPretty + "</td><td>" + empMinutes + "</td><td>" + empFrequency + "</td><td>" + empNextArrival + "</td></tr>");
});
