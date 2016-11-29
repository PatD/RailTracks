/* Punchlist

    1. If/else on Heading if speed <1
    2. Handling sleeping cars (<DeviceUUID>Corridor</DeviceUUID>)
    3. Service check

    Mobile size
    


// Reference links

// CSS Grid: http://arnaudleray.github.io/pocketgrid/docs/
// Tracks https://en.wikipedia.org/wiki/Piedmont_(train)
// Export KmlLayer http://sharemap.org/public/Amtrak_Piedmont#!kmlexport
// Geojson editor http://geojson.io/#map=6/33.541/-78.223


    */


// Polyfill for .includes() in IE:
if (!String.prototype.includes) {
  String.prototype.includes = function(search, start) {
    'use strict';
    if (typeof start !== 'number') {
      start = 0;
    }
    
    if (start + search.length > this.length) {
      return false;
    } else {
      return this.indexOf(search, start) !== -1;
    }
  };
};





// Configuration
var markers = [];
var trainMap;

var map;
var trainFeed = 'https://engblq.dot.nc.net/EAD/RailTrak/api';
// var trainFeed = 'localTrains.js';
var raleighLocation = { lat: 35.5, lng: -79 };
var mapDiv = document.getElementById('map');




// AJAX call to get train data.
var getTrainData = function() {
    var oReq = new XMLHttpRequest();
    oReq.addEventListener("load", updateMap);
    
    // Assign random number to prevent caching
    // we want the freshest train locations each time
    var r = (-0.5)+(Math.random()*(1000.99));
    oReq.open("GET", trainFeed + '?=' + r);
    oReq.send();
};


// Clears away the train markers, then brings them back

setInterval(function() {
      
   for(i=0; i<markers.length; i++){
        markers[i].setMap(null);
    };
    //reset markers
    markers.length = 0;
    
    getTrainData(); 
      
}, 30000);







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
      if (trainInfo[i].DeviceUUID !== "Corridor" && trainInfo[i].Latitude !== undefined && trainInfo[i].Longitude !== undefined) {
      
        // Transform each train into our Train Object
        var trainObject = {
          lat: trainInfo[i].Latitude,
          lng: trainInfo[i].Longitude,
          TrainID: trainInfo[i].DeviceName, // ID from service
          TrainNumber:  trainInfo[i].DeviceName,
          TrainName: trainInfo[i].DeviceUUID,
          Speed: trainInfo[i].Speed,
          From: trainInfo[i].FromStation,
          To: trainInfo[i].ToStation,
          Next: trainInfo[i].NextStation,
          Arrow:"&#10148;",  // ASCII art arrow
          Direction: null,
          Abbreviation: null,
          Heading: null, 
          TrainTime: moment(trainInfo[i].RecordedTime).format('LT'), // Uses moment.js
          Performance: trainInfo[i].OnTimePerformance,
          StatusIndicator: null,
          HoverWindowText: trainInfo[i].DeviceName + ' | '+ trainInfo[i].DeviceUUID  // Hover over train text
        };
      
      console.log(trainObject);
      
         
        // Sets trainObject Direction, Abbreviation, Heading
        // The -90 on heading rotates the ASCII arrow (which faces right) into the correct position
        (function () {
   
            var _d = trainInfo[i].Course;
            if (_d >= 0 && _d <= 44){
              trainObject.Direction = "North";
              trainObject.Abbreviation = "N";
              trainObject.Heading = _d -90;
            }
            else if(_d >= 45 && _d <= 89){
              trainObject.Direction = "North East";
              trainObject.Abbreviation = "NE";
              trainObject.Heading = _d -90;
            }
            else if(_d >= 90 && _d <= 134){
              trainObject.Direction = "East";
              trainObject.Abbreviation = "E";
              trainObject.Heading = _d -90;
            }
            else if(_d >= 135 && _d <= 179){
              trainObject.Direction = "South East";
              trainObject.Abbreviation = "SE";
              trainObject.Heading = _d -90;
            }
            else if(_d >= 180 && _d <= 224){
              trainObject.Direction = "South";
              trainObject.Abbreviation = "S";
              trainObject.Heading = _d -90;
            }
            else if(_d >= 225 && _d <= 269){
              trainObject.Direction = "South West";
              trainObject.Abbreviation = "SW";
              trainObject.Heading = _d -90;
            }
            else if(_d >= 270 && _d <= 314){
              trainObject.Direction = "West";
              trainObject.Abbreviation = "W";
              trainObject.Heading = _d -90;
            }
            else if(_d >= 315 && _d <= 359){
              trainObject.Direction = "North West";
              trainObject.Abbreviation = "NW";
              trainObject.Heading = _d -90;
            };
        })();  
   
     
      // Status for on-time!
       (function () {
          if (trainInfo[i].OnTimePerformance.includes("late")){
            trainObject.StatusIndicator = "yellow";
          }
          else if(trainInfo[i].OnTimePerformance.includes("On Time")){
            trainObject.StatusIndicator = "green";
          }
          else{
            trainObject.StatusIndicator = "grey";
          }
       })();
     
          
          
          
       // Sets a new marker
          var marker = new google.maps.Marker({
    
            // Marker always above station/track
              zIndex: google.maps.Marker.MAX_ZINDEX + 1,
              position: trainObject,
              map: trainMap,
              icon: trainIcon,
              ID: trainObject.TrainID,
              title: trainObject.HoverWindowText,
              
            // Click window
              infoWindowHTML: 
                  '<div style="width:280px">' +
                    '<div class="block-group">' +
                      '<div class="b6 block"><strong>' + trainObject.TrainNumber + ' | ' + trainObject.TrainName + '</strong></div>' +
                      '<div class="b6 block"> ' + trainObject.Speed + '<small>MPH</small> - <span>' + trainObject.Abbreviation + ' </span>' +
                      '<strong style="display:inline-block;transform: rotate(' + trainObject.Heading + 'deg);"> ' + trainObject.Arrow + '</strong></div>' +
                    '</div><hr />' +
                    
                    '<div class="block-group">' +    
                      '<div class="b6 block">Traveling from:<br/> <strong>' + trainObject.From + ' &#10148; </strong> ' +
                      '<strong>' + trainObject.To + '</strong></div>' +
                      '<div class="b6 block">Next station:<br/> <strong>' + trainObject.Next + '</strong></div>' +
                    '</div>' +
                    
                    '<div class="block-group">' +
                      '<p><strong><span style="color:' + trainObject.StatusIndicator + ';">&#9608;&#9608; </span> ' +  trainObject.Performance + '</strong> as of: ' + trainObject.TrainTime + '</p>' +
                    '</div>'+
                  '</div>'
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