
$(document).ready(function(){
  
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyC-x883cY6lvfEfURn6a8WmGcoY37wZ1mo",
    authDomain: "myfirstproject-169a3.firebaseapp.com",
    databaseURL: "https://myfirstproject-169a3.firebaseio.com",
    projectId: "myfirstproject-169a3",
    storageBucket: "myfirstproject-169a3.appspot.com",
    messagingSenderId: "848984474780"
  };
  firebase.initializeApp(config);

  var database = firebase.database();


  // on click function to submit data
    $("#submit").click(function(){
      var name = $("#nameInput").val().trim();
      var destination = $("#destinationInput").val().trim();
      var time = $("#timeInput").val().trim();
      var frequency = $("#frequencyInput").val().trim();

      //pushing input to firebase
      database.ref().push({
        name: name,
        destination: destination,
        time: time,
        frequency: frequency
      })
         //clear input after submitting
        $("input").val('');
        return false;
});

   //  on click child added function
  database.ref().on("child_added", function(childSnapshot){
      // getting firebase data
      var name = childSnapshot.val().name;
      var destination = childSnapshot.val().destination;
      var time = childSnapshot.val().time;
      var frequency = childSnapshot.val().frequency;
  
      console.log("Name: " + name);
      console.log("Destination: " + destination);
      console.log("Time: " + time);
      console.log("Frequency: " + frequency);
      console.log(moment().format("hh:mm"));

  
    var firstTimeConverted = moment(time,"hh:mm").subtract(1, "years");
    console.log(firstTimeConverted);
    // actual time
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));
    // time difference
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);
    // time gap
    var tRemainder = diffTime % frequency;
    console.log(tRemainder);
    // time until next train
    var minTilTrain = frequency - tRemainder;
    console.log("MINUTES TILL TRAIN: " + minTilTrain);
    // next train
    var nextTrain = moment().add(minTilTrain, "minutes").format("hh:mm");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));  

 
  var newElement = $("<tr/>").attr("data-name", name);
    newElement.append($("<td/> ").text(name));
    newElement.append($("<td/> ").text(destination));
    newElement.append($("<td/> ").text(frequency));
    newElement.append($("<td/> ").text(nextTrain)); 
    newElement.append($("<td/> ").text(minTilTrain));
    $(".table").append(newElement);


 }); 
})
