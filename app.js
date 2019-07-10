
var firebaseConfig = {
    apiKey: "AIzaSyC5Wrd-wgK1W4ZwIpk66Fl9TQXWWAmXroQ",
    authDomain: "my-first-project-c885d.firebaseapp.com",
    databaseURL: "https://my-first-project-c885d.firebaseio.com",
    projectId: "my-first-project-c885d",
    storageBucket: "my-first-project-c885d.appspot.com",
    messagingSenderId: "348298463091",
    appId: "1:348298463091:web:893277b78cd5a90d"
};

firebase.initializeApp(firebaseConfig);

var database = firebase.database();


$("#train-button").on("click", function (event) {
    event.preventDefault();

    var newName = $("#train-name").val().trim();
    var newDestination = $("#destination").val().trim();
    var firstTrain = moment($("#first-train").val().trim(), "HH:MM").format("X");
    var newFrequency = $("#frequency").val().trim();

    var newTrain = {
        name: newName,
        destination: newDestination,
        first: firstTrain,
        frequency: newFrequency
    }

    console.log(newTrain.name);
    console.log(newTrain.destination);
    console.log(newTrain.first);
    console.log(newTrain.frequency);

    var row = document.createElement("tr");
    //create name and add to row
    var name = document.createElement("td");
    name.textContent = newTrain.name;
    row.appendChild(name);

    //create destination and add to row
    var destination = document.createElement("td");
    destination.textContent = newTrain.destination;
    row.appendChild(destination);

    var first = document.createElement("td"); 
    first.textContent = newTrain.first; 
    row.appendChild(first); 

    var frequency = document.createElement("td"); 
    frequency.textContent = newTrain.frequency; 
    row.appendChild(frequency); 

    $("#train-rows").append(row);

});


database.ref().on("child_added", function (snapshot) {

    var key = database.ref(snapshot.key);

    key.on("value", function (snapshot) {



        var startTime = moment(snapshot.child.val().startTime, "HH:MM").subtract(1, "years");
        var currentTime = moment().local();
        var diffTime = moment().local().diff(moment(startTime), "minutes");
        var remainder = diffTime % snapshot.child.val().frequency;
        var minutesTilNextTrain = snapshot.child.val().frequency - remainder;
        var nextTrain = moment().local().add(minutesTilNextTrain, "minutes");


        var newrow = $("<tr>");
        newrow.append($("<td>" + snapshot.child.val().name + "</td>"));
        newrow.append($("<td>" + snapshot.child.val().destination + "</td>"));
        newrow.append($("<td>" + snapshot.child.val().frequency + "</td>"));
        newrow.append($("<td>" + moment(nextTrain).format("LT") + "</td>"));
        newrow.append($("<td>" + moment(minutesTilNextTrain) + "</td>"));

        $("#train-rows > tbody").append(newrow);

    })

})






