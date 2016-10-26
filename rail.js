/* Punchlist

    Handling sleeping cars (<DeviceUUID>Corridor</DeviceUUID>)
    Show direciton 0-255
        


    Stations icon  
    Station hover state

    Train icon
    Train hover state

    Track from wiki

    Set extent center/zoom

    Mobile size
    


// Associated Data
// var trackLayerGeo = 'Rail_AmtrakLines.json'
// var trackLayer = 'https://www.ncdot.gov/_xml/Rail_AmtrakLines.xml';
// var stationLayer = 'https://www.ncdot.gov/_xml/rail_station_mobile.xml';
// Tracks https://en.wikipedia.org/wiki/Piedmont_(train)
// Export KmlLayer http://sharemap.org/public/Amtrak_Piedmont#!kmlexport
// Geojson editor http://geojson.io/#map=6/33.541/-78.223


// Shows geo tracks
    var thetrackLayerGeo = new google.maps.KmlLayer({
        preserveViewport: true,
        suppressInfoWindows: false,
        url: trackLayerGeo,
        map: map
    });


// Shows Train Tracks
    var kmlLayer = new google.maps.KmlLayer({
        preserveViewport: true,
        suppressInfoWindows: true,
        url: trackLayer,
        map: map
    });

// Shows Train Stations


    var kmlStationLayer = new google.maps.KmlLayer({
        preserveViewport: true,
        suppressInfoWindows: false,
        url: stationLayer,
        map: map
    });



*/
/*  map.data.addGeoJson(stationData);
    var featureStyle = {
        strokeColor: '#778899',
        strokeWeight: 3,
        clickable: true,
        icon: {url: "https://maps.gstatic.com/mapfiles/ms2/micons/rail.png" }

    };

    map.data.setStyle(featureStyle);
    */






// Configuration
var markers = [];
var trainMap;

var map;
// var trainFeed = 'https://engblq.dot.nc.net/EAD/RailTrak/api';
var trainFeed = 'localTrains.js';
var raleighLocation = { lat: 35.5, lng: -79 };
var mapDiv = document.getElementById('map');


// var trainStationIcon = 'https://maps.gstatic.com/mapfiles/ms2/micons/rail.png';
var trainStationIcon = 'http://digitalstyle.nc.gov/img/icons/svg/location-city.svg';

var trainIcon = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAlCAYAAAAjt+tHAAAEmElEQVRYhbWXXWwUVRTHfzM7LMu2LqZQbKFKa4gxqS39iqRiHwxbKSIJ1UhSY6uJMTHasqYQIlCtYkgJhAdqKCFi0w+JIQtNlArYXcS4kSbaL6s8GDU0UCHUdNM07WZotjM+dGad2e52Z3U9yc2dvffk/P73zL135wiqqgJQWVkpASJg13qJ1FoYUIA5QPH5fGEAQVVVHW4HHFqzawLEFMEVTcAcIGttzufzhQW3263DnYBL6x38PxmQgRAwrfVz+iodGnyNPyD1pxhsMndFuFx7VICwMfVOf0DqF3NzEZxOBIcjpWBVllFDIfyBsX53RbgA7TUYN54DiAtX799n/t49SzBbVhaC3W4ai4qp7zNRYuFd6y0mPDw+DopCWWEeP146tCS8tOo9hn4ZA5sNad26eCIiTH2jxd3t81NToCjcGfqY7DUPmuYqa47gWL6Mix17ImODVz7i5u2/eLS8EWV6GtHlihdaXBKsmzo9zQeNLyyCA/gDN+j1jywaz3s4k71vPocyNZUovLVz3txYHVvceDfqeHfMuWNNNVZCJ3/R3L4T5GSHj03PN0fGNu88xKmuq9ydSLziaLN82Xje76a1vW/hhyCAdoUDXB/4jetDf/DWgQ4A3n17By37d1mKazkDre19C2AAVSXduTwy53TYQVEi4o6cvGg1rPUM7Nqxicc3ZLNzaxnFT6w3zc3+/ikAgz/fpOfSALf+nEy9gHOn6hP6lBbkUVqQZxkOFl+BkFMbaZ3eQFy/Tm/A5JsyAfpxmxhto9c/THZxvWnH352YIru4nl7/MBOjbUsez2hL6i83M+MBvKd389XVEdaWNDAx2gbA2pIGejv3sH1LUTLhkhcg5NRSlP8Iw18fpueMh8ee3gtAzxkP27cUUbz1ICM3bllePfyLi2hD7kMAVFeVUZS/nqL89VRXlZnmkjFLGXjxjRNc+MSzaGXXvAdMv72nd0eet71yzJKAhBkQV6+m5/IAh1u/sBQQoPn4Ba58O4qYmZnQN2EGRKcT1eWi6eh5mo6etyxCXLkSccWK/y4AQJAkVOCZZ5/km/YGlj11kK7ml0w+dR96Gf9yHzX7urjW9wPYbJaEJhSgzM6iBIO8WltJR0td5IJ5+fXji3yziupRx7t5bX8Xnd0+EATEtDRLApR4DmJaGjXbSuhoqcNW6AGIe8yEnFpshR7mR08QVuHcd78uuTZdQNjQUGXZ9F2ozM5y9jMfn18eQgkGI6C4UYNBbBvfQZmcRFy1ypQBVZb1xwhT4p9ySQZQQ6EFiCZCTEuLBEmUTqNF++qf5ZrJGlORDPCQuyJc7g+MxSxMxNxcxIwMS3AlGEQZG4s5pxUmIQx1gaL9mNYcCjCXZiKAPzD2PZBQhA53V4Q360NaH12ayYBipTiNfMP7A9LgUpkwwEsx7634xWmC8lzvjeXbcCwRBnixMcVRAmKX50uZJswBpGvN6Q9IPxlFGOAbNfiM1mQdFM8SCogjIl3PBGBc+QxJwC0LiCHCpYkYBPR3PsPC5rIMT0pAlAin1vQSeI6F1IeSgSctwCBC35T6UdWP2FwycIC/Aah588EhX2TDAAAAAElFTkSuQmCC';


// AJAX call to get train data.
var getTrainData = function() {
    var oReq = new XMLHttpRequest();
    oReq.addEventListener("load", updateMap);
    oReq.open("GET", trainFeed);
    oReq.send();
};


// Sweeps away the train markers
var clearMarkers = function() {
    for(i=0; i<markers.length; i++){
        markers[i].setMap(null);
    }
    //reset markers
    markers.length = 0
    
};



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
        console.log(stationTitle);
        var latLng = new google.maps.LatLng(coords[1],coords[0]);
        var marker = new google.maps.Marker({
            content: stationTitle,
            position: latLng,
            map: trainMap
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











/*
    var trackStyle = {
        strokeColor: '#778899',
        strokeWeight: 4,
        clickable: true,
        icon: {url: trainStationIcon }
    };

    trainMap.data.setStyle(trackStyle);
*/

  




// Gets feed data
  loadStations();
    getTrainData();


}; //initTrainMap










// Function to update map
var updateMap = function() { 

    

    rawInput = this.responseText
    var trainInfo = JSON.parse(rawInput);

    
    var infowindow = new google.maps.InfoWindow({
        content: "loading..."
    });


	// Counts number of trains
    var numberOfTrains = trainInfo.length;
    

    // Loop through trains, apply to Google Map  
    for (var i = 0; i < numberOfTrains; i++) {

        // Must have a lat and a long, or nothing will be shown
        if (trainInfo[i].Latitude !== undefined && trainInfo[i].Longitude !== undefined) {
            
        // Locate our train for Marker
            var currentTrainPosition = {
                lat: trainInfo[i].Latitude,
                lng: trainInfo[i].Longitude
            };

       // Convert datetime to local time
            var convertedTrainDateTime = moment(trainInfo[i].RecordedTime).format('LT');

 

        // Sets a new marker
            var marker = new google.maps.Marker({
      
              // Marker always above station/track
                zIndex: google.maps.Marker.MAX_ZINDEX + 1,
                position: currentTrainPosition,
                map: trainMap,
                icon: trainIcon,
                ID: trainInfo[i].ID,
                title: trainInfo[i].DeviceName,
                
                
  /* available 
  
    "ID": 11119,
    "DeviceUUID": "Piedmont",
    "DeviceName": "74",
    "Latitude": 35.66695,
    "Longitude": -80.466042,
    "Speed": 1.6,
    "Course": 315.0,
    "RecordedTime": "2016-09-26T12:53:00",
    "Timestamp": "AAAAAAAAOzA=",
    "OnTimePerformance": "1 min late",
    "NextStation": "HPT",
    "FromStation": "CLT",
    "ToStation": "RGH"
    
    */
                
                
                
                
                
              // Click window
                infoWindowHTML: 

                    '<div class="infoWindowContent" style="width:280px">' +
                      '<div class="block-group">' +
                        '<div class="b1 block"><strong class="infoWindowNumber">' + trainInfo[i].DeviceName + ' | <span class="infoWindowName">' + trainInfo[i].DeviceUUID + '</span></strong></div>' +
                        '<div class="b2 block infoWindowSpeed"><strong>' + trainInfo[i].Speed + '<small>MPH</small></strong></div>' +
                        '<div class="b2 block infoWindowDirection">' + trainInfo[i].Course + '</div>' +
                      '</div><hr />' +
                      
                      '<div class="block-group">' +    
                        '<div class="b4 block">Traveling from: <strong class="infoWindowFromStation">' + trainInfo[i].FromStation + ' &#10148; </strong> ' +
                        '<strong class="infoWindowToStation">' + trainInfo[i].ToStation + '</strong></div>' +
                        '<div class="b5 block">Next station: <strong class="infoWindowNextStation">' + trainInfo[i].NextStation + '</strong></div>' +
                      '</div>' +
                      
                      '<div class="block-group>' +
                      '<br/><div class="block-group"><br/><span class="infoWindowStatus">' + trainInfo[i].OnTimePerformance + '</span> | Status as of: ' + convertedTrainDateTime + '</div>' +
                    '</div></div>'
                    
         /*           
              // Smaller hover window     
                hoverWindowHTML:
                '<p>'+ trainInfo[i].DeviceName+ ' | '+ trainInfo[i].DeviceUUID + '</p>'
          */

            });
        
            marker['infowindow'] = new google.maps.InfoWindow({
                content: this.infoWindow
            });
            

            marker.addListener('click', function() {
                infowindow.setContent(this.infoWindowHTML);
                infowindow.open(map, this);
            });
        /*
        // Smaller hover window
            marker.addListener('mouseover', function() {
                infowindow.setContent(this.hoverWindowHTML);
                infowindow.open(trainMap, this);
            });
            
        // Smaller hover window
            marker.addListener('mouseout', function() {
                infowindow.close(trainMap, this.hoverWindowHTML);
            });
*/


            markers.push(marker);
        }
    }

  



/*
    document.getElementById('mapUpdatedTime').textContent = "Map last updated at " + moment().format('LTS');
 */  
   
   /*   This code crashes browsers
    setInterval(function(){
        clearMarkers();
        console.log("Markers cleared, getting fresh data")
        getTrainData() // this will run after every 5 seconds
   }, 2000); 
   
*/ 

};   // updateMap

