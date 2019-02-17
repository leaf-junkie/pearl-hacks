$(document).ready(function () {
// // Loading Screen
// var loadingScreen = document.getElementById('loading-screen'); 

// // Modal
// var modal = document.getElementById('modal_incident');

// // Dropdown
// var dropdown = document.getElementsByClassName('dropdown');
var dropdown = document.querySelector('.dropdown');
dropdown.addEventListener('click', function(event) {
  event.stopPropagation();
  dropdown.classList.toggle('is-active');
});

 // Initialize Firebase
 var config = {
    apiKey: "AIzaSyBZaI57r0sx090hujmUnV0OH8iCjLcDRt8",
    authDomain: "pearlhacks2019.firebaseapp.com",
    databaseURL: "https://pearlhacks2019.firebaseio.com",
    projectId: "pearlhacks2019",
    storageBucket: "pearlhacks2019.appspot.com",
    messagingSenderId: "73378828200"
  };
  firebase.initializeApp(config);

// Map API stuff
var map

var markers = [
    {
        position: {lat: 35.908265, lng: -79.050531},
        icon: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png'
    },
    {
        position: {lat: 35.906392, lng: -79.051134},
        icon: 'http://maps.google.com/mapfiles/ms/icons/yellow-dot.png'
    },
    {
        position: {lat: 35.907294, lng: -79.049519},
        icon: 'http://maps.google.com/mapfiles/ms/icons/pink-dot.png'
    }
]

function initMap() {
    // The location of UNC
    var UNC = {lat: 35.908265, lng: -79.050531};
    // The map, centered at UNC
    map = new google.maps.Map(
        document.getElementById('map'), {zoom: 14, center: UNC});

    
    markers.forEach(marker => new google.maps.Marker({position: marker.position, 
        map: map, icon: marker.icon}));
  }

function addMarker(lat, lng, color){

    var position = {lat: lat, lng: lng}

    new google.maps.Marker({position: position, map: map, icon: 'http://maps.google.com/mapfiles/ms/icons/'+color+'-dot.png'});

}

    initMap()
    
    addMarker(35.907294, -79.030031, "purple")
    addMarker(35.907294, -79.070331, "orange")

})