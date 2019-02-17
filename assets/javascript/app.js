// Filter dropdown menu for map
// var dropdown = document.querySelector('.dropdown');
// dropdown.addEventListener('click', function(event) {
//   event.stopPropagation();
//   dropdown.classList.toggle('is-active');
// });

// Initialize Firebase
var config = {
    apiKey: "AIzaSyBZaI57r0sx090hujmUnV0OH8iCjLcDRt8",
    authDomain: "pearlhacks2019.firebaseapp.com",
    databaseURL: "https://pearlhacks2019.firebaseio.com",
    projectId: "pearlhacks2019",
    storageBucket: "pearlhacks2019.appspot.com",
    messagingSenderId: "73378828200"
};
  
var map
var gooMarker = []

var markers = [
    {
        position: {lat: 35.908265, lng: -79.050531},
        icon: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png',
        color: 'blue',
        filtered: 'false'
    },
    {
        position: {lat: 35.906392, lng: -79.051134},
        icon: 'http://maps.google.com/mapfiles/ms/icons/yellow-dot.png',
        color: 'yellow',
        filtered: 'false'
    },
    {
        position: {lat: 35.907294, lng: -79.049519},
        icon: 'http://maps.google.com/mapfiles/ms/icons/pink-dot.png',
        color: 'pink',
        filtered: 'false'
    },
    {
        position: {lat: 35.917294, lng: -79.049519},
        icon: 'http://maps.google.com/mapfiles/ms/icons/orange-dot.png',
        color: 'orange',
        filtered: 'false'
    },
    {
        position: {lat: 35.918294, lng: -79.049519},
        icon: 'http://maps.google.com/mapfiles/ms/icons/purple-dot.png',
        color: 'purple',
        filtered: 'false'
    },
    {
        position: {lat: 35.918294, lng: -79.059519},
        icon: 'http://maps.google.com/mapfiles/ms/icons/purple-dot.png',
        color: 'purple',
        filtered: 'false'
    }
]
var newMap = false;

function initMap() {
    var UNC = {lat: 35.908265, lng: -79.050531};
    map = new google.maps.Map(
        document.getElementById('map'), {zoom: 14, center: UNC});
        if(!newMap){
            for(i = 0; i < markers.length; i++){
                gooMarker.push(new google.maps.Marker({position: markers[i].position, 
                    map: map, icon: markers[i].icon, color: markers[i].color, filtered: "false"}))
            }
        } else {
            for(i = 0; i < gooMarker.length; i++){
                if(gooMarker[i].visible == true){
                    new google.maps.Marker({position: gooMarker[i].position, map: map, icon: gooMarker[i].icon, 
                        filtered:gooMarker[i].filtered, color:String(gooMarker[i].color), visible: true});  
                }
            }
        }
    }
    
function addMarker(lat, lng, color) {
    var position = {lat: lat, lng: lng}
    new google.maps.Marker({position: position, map: map,
            icon: "http://maps.google.com/mapfiles/ms/icons/" + color + "-dot.png",
            filtered: "false", color:String(color)});
}

function filter(color){

    for(i = 0; i < gooMarker.length; i++){
        if(gooMarker[i].color == color){
            gooMarker[i].filtered = "true";
            gooMarker[i].visible = true;
        }
    }
    for(w = 0; w < gooMarker.length; w++){
        if(gooMarker[w].filtered == "false"){
            gooMarker[w].visible = false;
        }
    } 
    document.getElementById(color).clicked = "true";
}

function unfilter(color){
    console.log("uf");
    var otherfilter = false;
    for(w = 0; w < gooMarker.length; w++){
        for(i = 0; i < gooMarker.length; i++){
            if(gooMarker[w].color == color){
                if(i != w && gooMarker[i].filtered == "true"){
                    gooMarker[w].visible = false;
                    gooMarker[w].filtered = false;
                    otherfilter = true;
                }
            }
        }
    }
    for(p = 0; p < gooMarker.length; p++){
        if(otherfilter != true){
            gooMarker[p].visible = true;
            gooMarker[p].filtered = false;
        }
    }
    document.getElementById(color).clicked = "false";
}

blue = document.getElementById("blue");
blue.clicked = "false";
blue.onclick = function(){
    console.log("clicked blue")
    if(blue.clicked == "false"){
        filter(blue.id);
    }else{
        unfilter(blue.id);
    }
    newMap = true;
    initMap();
}
pink = document.getElementById("pink");
pink.clicked = "false";
pink.onclick = function(){
    console.log("clicked pink")
    if(pink.clicked == "false"){
        filter(pink.id);
    }else{
        unfilter(pink.id);
    }
    newMap = true;
    initMap();
}
orange = document.getElementById("orange");
orange.clicked = "false";
orange.onclick = function(){
    console.log("clicked orange")
    if(orange.clicked == "false"){
        filter(orange.id);
    }else{
        unfilter(orange.id);
    }
    newMap = true;
    initMap();
}
yellow = document.getElementById("yellow");
yellow.clicked = "false";
yellow.onclick = function(){
    console.log("clicked yellow")
    if(yellow.clicked == "false"){
        filter(yellow.id);
    }else{
        unfilter(yellow.id);
    }
    newMap = true;
    initMap();
}
purple = document.getElementById("purple");
purple.clicked = "false";
purple.onclick = function(){
        console.log("clicked purple")
        if(purple.clicked == "false"){
            filter(purple.id);
        }else{
            unfilter(purple.id);
        }
        newMap = true;
        initMap();
    }
 
var position, color;
function pushFirebase() {
    var myFirebase = firebase.database().ref();
    var recommendations = myFirebase.child("recommendations");
    recommendations.push({
        "type": document.getElementById("sel").value,
        "location": new firebase.firestore.GeoPoint(35.9, -79.05),
        "description": document.getElementById("textbox").value
    });

    recommendations.limitToLast(1).on("child_added", function(childSnapshot) {
        recommendations = childSnapshot.val();
        position = recommendations.location
        color = recommendations.type
        $("text").html(recommendations.description)
      });
}

// Click "Post an Incident" button to pull up modal
function displayModal() {
    var openModal = document.getElementById("modal_incident");
    openModal.style = "display: flex;";
}

function closeModal() {
    var cancel = document.getElementById("cancel");
    var exit = document.getElementById("exit");
    var submit = document.getElementById("submit");
    // Click "cancel" or "x" buttons to close modal
    cancel.onclick = function () {
        document.getElementById("modal_incident").style.visibility = "hidden";
        clearContents();
    }
    exit.onclick = function () {
        document.getElementById("modal_incident").style.visibility = "hidden";
        clearContents();
    }
    // Click "Submit" to send user input to Firebase
    submit.onclick = function () {
        pushFirebase();
        console.log(color)
        document.getElementById("modal_incident").style.visibility = "hidden";
        markers.push(addMarker(position._lat,position._long, color));
        clearContents();
    }
}
closeModal();

function clearContents() {
    // TODO: Clear contents of modal
    // Reset dropdown
    
    // Clear textarea
    var textbox = document.getElementById("textbox");
    if (textbox) {
        textbox.value = "";
    }
}

$(document).ready(function () {
    firebase.initializeApp(config);
    // Loading Screen
    setTimeout(function() {
        var loading = document.getElementById('loading'); 
        loading.classList += "hidden";
    }, 2000);
    initMap();
});