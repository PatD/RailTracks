/* Punchlist

    Handling sleeping cars (<DeviceUUID>Corridor</DeviceUUID>)
    Show direciton 0-255
        
    Station hover state


    Mobile size
    


// Associated Data

// CSS Grid: http://arnaudleray.github.io/pocketgrid/docs/

// var trackLayerGeo = 'Rail_AmtrakLines.json'
// var trackLayer = 'https://www.ncdot.gov/_xml/Rail_AmtrakLines.xml';
// var stationLayer = 'https://www.ncdot.gov/_xml/rail_station_mobile.xml';
// Tracks https://en.wikipedia.org/wiki/Piedmont_(train)
// Export KmlLayer http://sharemap.org/public/Amtrak_Piedmont#!kmlexport
// Geojson editor http://geojson.io/#map=6/33.541/-78.223


    */






// Configuration
var markers = [];
var trainMap;

var map;
// var trainFeed = 'https://engblq.dot.nc.net/EAD/RailTrak/api';
var trainFeed = 'localTrains.js';
var raleighLocation = { lat: 35.5, lng: -79 };
var mapDiv = document.getElementById('map');

var trainStationIcon = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAADJElEQVRIS7WUXUiTURjH3yd0TTf3kTg3RLEtNWhkQmqaJgSzoXhj+EFoYuSFulRwhIUFhZhEqKt5kWWBDmNQITSRzegiWdkSGTgI2Qamor672Ie+pm3kiXe5NXPbu6TO3Tnnd/7/8xz+5wEsgoEQqlt0LZZy6dzTJO7YdsyksFM0ADBMdRzCAQihU65t18TQ7BB93DLOsRE2L57ITMRKjpU467Pqv3FjuBcAwBRKJ6QBQohvdVi/5AzmcOxb9qDn42PjMUODwSnkCo8DAB4MCmqAEEqbXp5+m/c0L4XqCch9Q4NhKTsp+xwALPzJBzVY2ViZqlBXFOiX9Ht4iUjinU9aJ/esF6UWYaqLqvfJrOQiSgOEkAgn8Fn+Az7LBwMApr+iXxNyheQNd8x289HCZ4WCQDHbdRuREJsgBoCvgev7KkAI1fR+7H3Srm2n+8CR8pGNmpM19QDwilxDCFUNG4cH68bq/JdQliqdzdnNzQAwSmXQ0jbRplB8Ung58vbzsvmFtPg0EQDs7BocMtvN1oxHGakIIS/XeqYV65f2twLAQyqDy2qTeqD6ZTXTB+pqdTaJSJIPANZdg3StRTslVUl5PkZdoSYqT1Q2AcAIlUGuZl4zVvaijO8DyTjONc0tCZiCAfKFVolVmXhAnBwYX80lDV6aXloGAJ/DGpCbm+5Np1AhZOPE72izDrMweb7ce/a+/j5GuAm/jiBOgFlaLA4GjXGEMkUk4Nxy3ut819mhNCgj+QaYLEeGdZ3v6uHEcG5EZIAQiifcxHJcd5w/SeGciJvENoPGSAKAfV8+ZKvACfx5z1RPVd90X0w4cflZ+ZY8Xz7KZ/KvBuPCNjvPD48n+m50VDgD9y23hxZFo4ViqLrpvsgGCoWKJmWKAgGcwHW1r2slOqtuzyWLRcWYqlyl5TF50nAVhq3Ad9D13bXO7mbH+ebk73Z0ONY5dA6bKmYRGSCECoyrxjdZj7M4pKCx0ejKTMwsAYAP/8SAFFkj1toGZwZvk72nMbfxDi+W96tZUYyIKvBpmHDTAIawHTFffI1K2P+ckYIH5f6qgoOY/HeDn8ySNygOjMUYAAAAAElFTkSuQmCC';
var trainIcon = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAlCAYAAAAjt+tHAAAEmElEQVRYhbWXXWwUVRTHfzM7LMu2LqZQbKFKa4gxqS39iqRiHwxbKSIJ1UhSY6uJMTHasqYQIlCtYkgJhAdqKCFi0w+JIQtNlArYXcS4kSbaL6s8GDU0UCHUdNM07WZotjM+dGad2e52Z3U9yc2dvffk/P73zL135wiqqgJQWVkpASJg13qJ1FoYUIA5QPH5fGEAQVVVHW4HHFqzawLEFMEVTcAcIGttzufzhQW3263DnYBL6x38PxmQgRAwrfVz+iodGnyNPyD1pxhsMndFuFx7VICwMfVOf0DqF3NzEZxOBIcjpWBVllFDIfyBsX53RbgA7TUYN54DiAtX799n/t49SzBbVhaC3W4ai4qp7zNRYuFd6y0mPDw+DopCWWEeP146tCS8tOo9hn4ZA5sNad26eCIiTH2jxd3t81NToCjcGfqY7DUPmuYqa47gWL6Mix17ImODVz7i5u2/eLS8EWV6GtHlihdaXBKsmzo9zQeNLyyCA/gDN+j1jywaz3s4k71vPocyNZUovLVz3txYHVvceDfqeHfMuWNNNVZCJ3/R3L4T5GSHj03PN0fGNu88xKmuq9ydSLziaLN82Xje76a1vW/hhyCAdoUDXB/4jetDf/DWgQ4A3n17By37d1mKazkDre19C2AAVSXduTwy53TYQVEi4o6cvGg1rPUM7Nqxicc3ZLNzaxnFT6w3zc3+/ikAgz/fpOfSALf+nEy9gHOn6hP6lBbkUVqQZxkOFl+BkFMbaZ3eQFy/Tm/A5JsyAfpxmxhto9c/THZxvWnH352YIru4nl7/MBOjbUsez2hL6i83M+MBvKd389XVEdaWNDAx2gbA2pIGejv3sH1LUTLhkhcg5NRSlP8Iw18fpueMh8ee3gtAzxkP27cUUbz1ICM3bllePfyLi2hD7kMAVFeVUZS/nqL89VRXlZnmkjFLGXjxjRNc+MSzaGXXvAdMv72nd0eet71yzJKAhBkQV6+m5/IAh1u/sBQQoPn4Ba58O4qYmZnQN2EGRKcT1eWi6eh5mo6etyxCXLkSccWK/y4AQJAkVOCZZ5/km/YGlj11kK7ml0w+dR96Gf9yHzX7urjW9wPYbJaEJhSgzM6iBIO8WltJR0td5IJ5+fXji3yziupRx7t5bX8Xnd0+EATEtDRLApR4DmJaGjXbSuhoqcNW6AGIe8yEnFpshR7mR08QVuHcd78uuTZdQNjQUGXZ9F2ozM5y9jMfn18eQgkGI6C4UYNBbBvfQZmcRFy1ypQBVZb1xwhT4p9ySQZQQ6EFiCZCTEuLBEmUTqNF++qf5ZrJGlORDPCQuyJc7g+MxSxMxNxcxIwMS3AlGEQZG4s5pxUmIQx1gaL9mNYcCjCXZiKAPzD2PZBQhA53V4Q360NaH12ayYBipTiNfMP7A9LgUpkwwEsx7634xWmC8lzvjeXbcCwRBnixMcVRAmKX50uZJswBpGvN6Q9IPxlFGOAbNfiM1mQdFM8SCogjIl3PBGBc+QxJwC0LiCHCpYkYBPR3PsPC5rIMT0pAlAin1vQSeI6F1IeSgSctwCBC35T6UdWP2FwycIC/Aah588EhX2TDAAAAAElFTkSuQmCC';




// AJAX call to get train data.
var getTrainData = function() {
    var oReq = new XMLHttpRequest();
    oReq.addEventListener("load", updateMap);
    
    // Assign random number to prevent caching - we want the freshest data each time!
    var r = (-0.5)+(Math.random()*(1000.99))
    oReq.open("GET", trainFeed + '?=' + r);
    oReq.send();
};


// Sweeps away the train markers, then brings them back!
setInterval(function() {
      
   for(i=0; i<markers.length; i++){
        markers[i].setMap(null);
    };
    //reset markers
    markers.length = 0;
    
    getTrainData(); 
      
}, 5000);







// This function is called from the GoogleMaps callback script tag
// Function that creates a new Google Map, fires of the transit layer, and summons train data 

var initTrainMap = function() {

// Builds Map
    trainMap = new google.maps.Map(mapDiv, {
        center: raleighLocation,
        zoom: 8,
        minZoom: 6,
        streetViewControl: false,
        styles: [
            {
                featureType: 'transit.station.rail',
                elementType: 'labels.icon',
                "stylers": [
                    { "visibility": "simplified" }
                    ]
            }
        ]
    });



// Shows Transit layer from Google Maps
    var transitLayer = new google.maps.TransitLayer();
    transitLayer.setMap(trainMap);



  

// Loads Train Stations from tracks-and-station.js
var loadStations = function(){
  
  var stationInfoWindow = new google.maps.InfoWindow();
  
  for (var i = 0; i < stationData.features.length; i++) {
    
    if (stationData.features[i].geometry !== null ){
        var coords = stationData.features[i].geometry.coordinates;
        var stationTitle = stationData.features[i].properties.title;
       // console.log(stationTitle);
        var latLng = new google.maps.LatLng(coords[1],coords[0]);
        var marker = new google.maps.Marker({
            content: stationTitle,
            position: latLng,
            map: trainMap,
            icon: trainStationIcon
        });
    }; // If statement
    
  
  // Hover for station
   marker.addListener('mouseover', function() {
        stationInfoWindow.setContent(this.content);
        stationInfoWindow.open(trainMap, this);
    });
    
// Smaller hover window
    marker.addListener('mouseout', function() {
        stationInfoWindow.close(trainMap, this);
    });
    
    
  }; // For loop
};  // loadStations



// Loads tracks

var loadTracks = function(){
  trainMap.data.addGeoJson(trackData);
  
  
  var trackStyle = {
      strokeColor: '#778899',
      strokeWeight: 4,
      clickable: true,
      icon: {url: trainStationIcon }
  };
  
  trainMap.data.setStyle(trackStyle);
};





// Gets feed data
    loadTracks();
    loadStations();
    getTrainData();


}; //initTrainMap










// Function to update map
var updateMap = function() { 

    rawInput = this.responseText;
    var trainInfo = JSON.parse(rawInput);

    
    var infowindow = new google.maps.InfoWindow({
        content: "loading..."
    });


    // Loop through trains, apply Markers to Google Map  
    for (var i = 0; i < trainInfo.length; i++) {

      // Must have a lat and a long, or nothing will be shown
      if (trainInfo[i].Latitude !== undefined && trainInfo[i].Longitude !== undefined) {
        
      // Convert datetime to local time
      // uses Moment.js
        var convertedTrainDateTime = moment(trainInfo[i].RecordedTime).format('LT');

      // Locate our train for Marker
          var currentTrainPosition = {
              lat: trainInfo[i].Latitude,
              lng: trainInfo[i].Longitude
          };
          
        // Converts course integer to cardinal direction for each train into array
        // Available in the trainCourse array
       
        var trainCourse = {
            Arrow: "&#10148;"
          };
          
          
        var _d = trainInfo[i].Course;
        
        
        // The -90 on heading rotates the ASCII arrow (which faces right)
        // into the correct position
        
        if (_d >= 0 && _d <= 44){
          trainCourse.Direction = "North";
          trainCourse.Abbreviation = "N";
          trainCourse.Heading = _d -90;
          trainCourse.Wind = "Tramontane";
        }
        else if(_d >= 45 && _d <= 89){
          trainCourse.Direction = "North East";
          trainCourse.Abbreviation = "NE";
          trainCourse.Heading = _d -90;
          trainCourse.Wind = "Greco";
        }
        else if(_d >= 90 && _d <= 134){
          trainCourse.Direction = "East";
          trainCourse.Abbreviation = "E";
          trainCourse.Heading = _d -90;
          trainCourse.Wind = "Levante";
        }
        else if(_d >= 135 && _d <= 179){
          trainCourse.Direction = "South East";
          trainCourse.Abbreviation = "SE";
          trainCourse.Heading = _d -90;
          trainCourse.Wind = "Sirocco";
        }
        else if(_d >= 180 && _d <= 224){
          trainCourse.Direction = "South";
          trainCourse.Abbreviation = "S";
          trainCourse.headHeadinging = _d -90;
          trainCourse.Wind = "Ostro";
        }
        else if(_d >= 225 && _d <= 269){
          trainCourse.Direction = "South West";
          trainCourse.Abbreviation = "SW";
          trainCourse.Heading = _d -90;
          trainCourse.Wind = "Libeccio";
        }
        else if(_d >= 270 && _d <= 314){
          trainCourse.Direction = "West";
          trainCourse.Abbreviation = "W";
          trainCourse.Heading = _d -90;
          trainCourse.Wind = "Ponente";
        }
        else if(_d >= 315 && _d <= 359){
          trainCourse.Direction = "North West";
          trainCourse.Abbreviation = "NW";
          trainCourse.Heading = _d -90;
          trainCourse.Wind = "Maestro";
        };
     
     
          
       // Sets a new marker
          var marker = new google.maps.Marker({
    
            // Marker always above station/track
              zIndex: google.maps.Marker.MAX_ZINDEX + 1,
              position: currentTrainPosition,
              map: trainMap,
              icon: trainIcon,
              ID: trainInfo[i].ID,
              title: trainInfo[i].DeviceName + " " + trainInfo[i].DeviceUUID,
              
            // Click window
              infoWindowHTML: 
                  '<div class="infoWindowContent" style="width:280px">' +
                    '<div class="block-group">' +
                      '<div class="b6 block"><strong>' + trainInfo[i].DeviceName + ' | <span class="infoWindowName">' + trainInfo[i].DeviceUUID + '</span></strong></div>' +
                      '<div class="b6 block infoWindowSpeed"> ' + trainInfo[i].Speed + '<small>MPH</small> - <span>' + trainCourse.Abbreviation + ' </span>' +
                      '<strong style="display:inline-block;transform: rotate(' + trainCourse.Heading + 'deg);"> ' + trainCourse.Arrow + '</strong></div>' +
                    '</div><hr />' +
                    
                    '<div class="block-group">' +    
                      '<div class="b6 block">Traveling from:<br/> <strong class="infoWindowFromStation">' + trainInfo[i].FromStation + ' &#10148; </strong> ' +
                      '<strong class="infoWindowToStation">' + trainInfo[i].ToStation + '</strong></div>' +
                      '<div class="b6 block">Next station:<br/> <strong class="infoWindowNextStation">' + trainInfo[i].NextStation + '</strong></div>' +
                    '</div>' +
                    
                    '<div class="block-group">' +
                      '<p><strong class="infoWindowStatus">' + trainInfo[i].OnTimePerformance + '</strong> as of: ' + convertedTrainDateTime + '</p>' +
                    '</div>'+
                  '</div>',
                  
                  
            // Smaller hover window     
              hoverWindowHTML:
              '<div>'+ trainInfo[i].DeviceName+ ' | '+ trainInfo[i].DeviceUUID + '</div>'
        

          });
      
      // Event Listener for clicking a station icon
          marker.addListener('click', function() {
              infowindow.setContent(this.infoWindowHTML);
              infowindow.open(map, this);
          });
      /*
      // Event listener for hover state
          marker.addListener('mouseover', function() {
              infowindow.setContent(this.hoverWindowHTML);
              infowindow.open(trainMap, this);
          });
          
      // Event listener to close over 
          marker.addListener('mouseout', function() {
              infowindow.close(trainMap, this.hoverWindowHTML);
          });

*/

          markers.push(marker);
      }
  };

};   // updateMap

