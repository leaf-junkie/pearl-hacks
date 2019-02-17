var map

var markers = [
    {
        position: {lat: 35.908265, lng: -79.050531},
        icon: "googleMapMarkers/blue_MarkerA.png"
    },
    {
        position: {lat: 35.906392, lng: -79.051134},
        icon: "googleMapMarkers/blue_MarkerB.png"
    },
    {
        position: {lat: 35.907294, lng: -79.049519},
        icon: "googleMapMarkers/red_MarkerC.png"
    }
]

function initMap() {
    // The location of UNC
    var UNC = {lat: 35.908265, lng: -79.050531};
    // The map, centered at UNC
    map = new google.maps.Map(
        document.getElementById('map'), {zoom: 14, center: UNC});

    
    markers.forEach(marker => new google.maps.Marker({position: marker.position, map: map, icon: marker.icon})
    )
  }

function addMarker(lat, lng, color, letter){

    var position = {lat: lat, lng: lng}

    var iconLetter
    console.log(letter)
    
    if(letter === undefined){
        iconLetter = "A"
    }
    else{
        iconLetter = letter
    }

    var icon = "googleMapMarkers/" + color + "_Marker" + iconLetter + ".png"

    new google.maps.Marker({position: position, map: map, icon: icon});

}

$(document).ready(function () {

    initMap()

    addMarker(35.907294, -79.030031, "purple", "F")
    addMarker(35.907294, -79.070331, "orange")

})