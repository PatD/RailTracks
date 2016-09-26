<!DOCTYPE html>
<!--[if lt IE 7]>      <html class="no-js lt-ie9 lt-ie8 lt-ie7"> <![endif]-->
<!--[if IE 7]>         <html class="no-js lt-ie9 lt-ie8"> <![endif]-->
<!--[if IE 8]>         <html class="no-js lt-ie9"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js"> <!--<![endif]-->
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>NCDOT Train Tracker</title>
    <meta name="description" content="">
    <meta name="viewport" content="width=device-width, initial-scale=1">
</head>
<body>


  
    <script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.13.0/moment.min.js"></script>



<div id="map"></div>

<script>
/* Punchlist

    Add stations (loop?)
    Set extent center/zoom
    Colors for rail tracks
    Tracks click event
    Mobile size




*/




// Configuration
var markers = [];
var map;
// var trainFeed = 'https://engbld.dot.nc.net/EAD/RailTrak/api';
var trainFeed = 'https://raw.githubusercontent.com/PatD/RailTracks/master/localTrains.js';


var raleighLocation = { lat: 35.7806, lng: -80.5 };
var mapDiv = document.getElementById('map');

var trackLayer = 'https://www.ncdot.gov/_xml/Rail_AmtrakLines.xml';


var trainIcon = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAlCAYAAAAjt+tHAAAEmElEQVRYhbWXXWwUVRTHfzM7LMu2LqZQbKFKa4gxqS39iqRiHwxbKSIJ1UhSY6uJMTHasqYQIlCtYkgJhAdqKCFi0w+JIQtNlArYXcS4kSbaL6s8GDU0UCHUdNM07WZotjM+dGad2e52Z3U9yc2dvffk/P73zL135wiqqgJQWVkpASJg13qJ1FoYUIA5QPH5fGEAQVVVHW4HHFqzawLEFMEVTcAcIGttzufzhQW3263DnYBL6x38PxmQgRAwrfVz+iodGnyNPyD1pxhsMndFuFx7VICwMfVOf0DqF3NzEZxOBIcjpWBVllFDIfyBsX53RbgA7TUYN54DiAtX799n/t49SzBbVhaC3W4ai4qp7zNRYuFd6y0mPDw+DopCWWEeP146tCS8tOo9hn4ZA5sNad26eCIiTH2jxd3t81NToCjcGfqY7DUPmuYqa47gWL6Mix17ImODVz7i5u2/eLS8EWV6GtHlihdaXBKsmzo9zQeNLyyCA/gDN+j1jywaz3s4k71vPocyNZUovLVz3txYHVvceDfqeHfMuWNNNVZCJ3/R3L4T5GSHj03PN0fGNu88xKmuq9ydSLziaLN82Xje76a1vW/hhyCAdoUDXB/4jetDf/DWgQ4A3n17By37d1mKazkDre19C2AAVSXduTwy53TYQVEi4o6cvGg1rPUM7Nqxicc3ZLNzaxnFT6w3zc3+/ikAgz/fpOfSALf+nEy9gHOn6hP6lBbkUVqQZxkOFl+BkFMbaZ3eQFy/Tm/A5JsyAfpxmxhto9c/THZxvWnH352YIru4nl7/MBOjbUsez2hL6i83M+MBvKd389XVEdaWNDAx2gbA2pIGejv3sH1LUTLhkhcg5NRSlP8Iw18fpueMh8ee3gtAzxkP27cUUbz1ICM3bllePfyLi2hD7kMAVFeVUZS/nqL89VRXlZnmkjFLGXjxjRNc+MSzaGXXvAdMv72nd0eet71yzJKAhBkQV6+m5/IAh1u/sBQQoPn4Ba58O4qYmZnQN2EGRKcT1eWi6eh5mo6etyxCXLkSccWK/y4AQJAkVOCZZ5/km/YGlj11kK7ml0w+dR96Gf9yHzX7urjW9wPYbJaEJhSgzM6iBIO8WltJR0td5IJ5+fXji3yziupRx7t5bX8Xnd0+EATEtDRLApR4DmJaGjXbSuhoqcNW6AGIe8yEnFpshR7mR08QVuHcd78uuTZdQNjQUGXZ9F2ozM5y9jMfn18eQgkGI6C4UYNBbBvfQZmcRFy1ypQBVZb1xwhT4p9ySQZQQ6EFiCZCTEuLBEmUTqNF++qf5ZrJGlORDPCQuyJc7g+MxSxMxNxcxIwMS3AlGEQZG4s5pxUmIQx1gaL9mNYcCjCXZiKAPzD2PZBQhA53V4Q360NaH12ayYBipTiNfMP7A9LgUpkwwEsx7634xWmC8lzvjeXbcCwRBnixMcVRAmKX50uZJswBpGvN6Q9IPxlFGOAbNfiM1mQdFM8SCogjIl3PBGBc+QxJwC0LiCHCpYkYBPR3PsPC5rIMT0pAlAin1vQSeI6F1IeSgSctwCBC35T6UdWP2FwycIC/Aah588EhX2TDAAAAAElFTkSuQmCC'




// Function that creates a new Google Map, fires of the transit layer, and summons train data 
var initTrainMap = function() {





    map = new google.maps.Map(mapDiv, {
        center: raleighLocation,
        zoom: 7,
        streetViewControl: false,
        mapTypeId: 'terrain',
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
    
    



    
    var transitLayer = new google.maps.TransitLayer();
    transitLayer.setMap(map);
    


// map.data.loadGeoJason(); 
    var kmlLayer = new google.maps.KmlLayer({
        preserveViewport: true,
        suppressInfoWindows: true,
        url: trackLayer,
        map: map
    });
    




    getTrainData();




}

/*
var loadKmlLayer = function(src, map) {
    var kmlLayer = new google.maps.KmlLayer(src, {
    preserveViewport: false,
    map: map
  }
  )
}
*/

// AJAX call to get train data.

var getTrainData = function() {
    var oReq = new XMLHttpRequest();
    oReq.addEventListener("load", updateMap);
    oReq.open("GET", trainFeed);
    oReq.send();
}


// Function to update map
var updateMap = function() {
    rawInput = this.responseText
    var trainInfo = JSON.parse(rawInput);

    
    var infowindow = new google.maps.InfoWindow({
        content: "loading..."
    });


	// Counts number of trains
    var numberOfTrains = trainInfo.length;
    for (var i = 0; i < numberOfTrains; i++) {
        if (trainInfo[i].Latitude !== undefined && trainInfo[i].Longitude !== undefined) {
            // console.log(this);
            var currentTrainPosition = {
                lat: trainInfo[i].Latitude,
                lng: trainInfo[i].Longitude

            };


            var thisTrainTime = trainInfo[i].RecordedTime.split('T');
            thisTrainTime = thisTrainTime[1].split('.');


			// Sets a new marker
            var marker = new google.maps.Marker({
                position: currentTrainPosition,
                map: map,
                icon: trainIcon,
                ID: trainInfo[i].ID,
                title: trainInfo[i].DeviceName,
                infoWindowHTML: 
                    '<div id="content"><div id="thisTrainInfo"></div>' +
                    '<p><strong>Train:</strong> ' + trainInfo[i].DeviceUUID + ' ' + trainInfo[i].DeviceName + '</p>' +
                    '<p>Traveling at ' + trainInfo[i].Speed + ' MPH</p>' +
                    '<span>' +
                    //moment(trainInfo[i].RecordedTime, "hh:mm")+
                    thisTrainTime[0] + 
                    '</span></div>'
            });


            marker['infowindow'] = new google.maps.InfoWindow({
                content: this.infoWindow
            });

            marker.addListener('click', function() {
                infowindow.setContent(this.infoWindowHTML);
                infowindow.open(map, this);
            });

            markers.push(marker);
        }
    }

   var transitLayer = new google.maps.TransitLayer();
    transitLayer.setMap(map);


/*
    document.getElementById('mapUpdatedTime').textContent = "Map last updated at " + moment().format('LTS');
    setInterval(function(){
        clearMarkers();
        console.log("Markers cleared, getting fresh data")
        getTrainData() // this will run after every 5 seconds
   }, 5000); 
   */
} 


var clearMarkers = function() {
    for(i=0; i<markers.length; i++){
        markers[i].setMap(null);
    }
    //reset markers
    markers.length = 0
}


</script>


<!-- Async call the Google Maps -->
<script src='https://maps.googleapis.com/maps/api/js?key=AIzaSyAKZzbQMv5ZPDj7LRVmqvG9eP1KqPO3uDQ&callback=initTrainMap' async defer></script>


<style>
    #map{width:100%;height:400px;}
    </style>

<div id="map" ></div>


<div id="mapUpdatedTime"></div>




<!-- 


<style>
    #map{width:100%;height:400px;}
    </style>

<div id="map"></div>

  <script src='https://maps.googleapis.com/maps/api/js?key=AIzaSyAKZzbQMv5ZPDj7LRVmqvG9eP1KqPO3uDQ&callback=initTrainMap'></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gmaps.js/0.4.24/gmaps.min.js"></script>


<script type="text/javascript">

// Get JSON feed from Rail Tracker

var request = new XMLHttpRequest();

request.open('GET', 'https://www.flickr.com/services/rest/?method=flickr.test.echo&format=json&api_key=e376529743665422cb3c097ec0afcf51', true);

request.onload = function() {
  if (this.status >= 200 && this.status < 400) {
    // Success!
    var data = JSON.parse(this.response);
  } else {
    // We reached our target server, but it returned an error

  }
};

request.onerror = function() {
  // There was a connection error of some sort
};

request.send();









    var map;
 
	infoWindow = new google.maps.InfoWindow({});
      map = new GMaps({
        div: '#map',
 		lat: 35.7806,
        lng: -80.5
      });

	  map.loadFromKML({
        url: 'http://api.flickr.com/services/feeds/geo/?g=322338@N20&lang=en-us&format=feed-georss',
        suppressInfoWindows: true,
        events: {
          click: function(point){
            infoWindow.setContent(point.featureData.infoWindowHtml);
            infoWindow.setPosition(point.latLng);
            infoWindow.open(map.map);
          }
        }
      });

  </script>




<!-- 

        <style>
            .angular-google-map-container { height: 400px; }
            </style>
        



https://hpneo.github.io/gmaps/examples/json.html
http://ngmap.github.io/#/!icon-complex.html
        <h1>Maps</h1>

<div ng-app="myApp" ng-controller="Example">
        <ui-gmap-google-map center='map.center' zoom='map.zoom'></ui-gmap-google-map>
</div>


        <script src='https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.15.0/lodash.min.js'></script>
        <script src='https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.5.8/angular.js'></script>
        <script src="http://cdn.rawgit.com/nmccready/angular-simple-logger/0.1.7/dist/angular-simple-logger.js"></script>
        <script src='https://cdnjs.cloudflare.com/ajax/libs/angular-google-maps/2.3.4/angular-google-maps.min.js'></script>
        <script src='https://maps.googleapis.com/maps/api/js?key=AIzaSyAKZzbQMv5ZPDj7LRVmqvG9eP1KqPO3uDQ'></script>


        <script>
       angular.module("myApp", ['uiGmapgoogle-maps'])
                .controller("Example", function($scope, $interval) {
                        $scope.map = {
                                center: {
                                        latitude: 35.8369480,
                                        longitude: -78.58283801
                                },
                                zoom: 7
                        };
/*


				$scope.options = {
						scrollwheel: false
				};
				$scope.coordsUpdates = 0;
				$scope.dynamicMoveCtr = 0;
				$scope.marker = {
						id: 0,
						coords: {
								latitude: 56.162939,
								longitude: 10.203921
						},
						options: {
								draggable: true
						},
						events: {
								dragend: function(marker, eventName, args) {
										var lat = marker.getPosition().lat();
										var lon = marker.getPosition().lng();
										$log.log(lat);
										$log.log(lon);

										$scope.marker.options = {
												draggable: true,
												labelContent: "",
												labelAnchor: "100 0",
												labelClass: "marker-labels"
										};
								}
						}
				};
				$scope.$watchCollection("marker.coords", function(newVal, oldVal) {
						$scope.map.center.latitude = $scope.marker.coords.latitude;
						$scope.map.center.longitude = $scope.marker.coords.longitude;
						if (_.isEqual(newVal, oldVal))
								return;
						$scope.coordsUpdates++;
				});
				$timeout(function() {
						$scope.marker.coords = {
								latitude: 56.162939,
								longitude: 10.203921
						};
						$scope.dynamicMoveCtr++;
						$timeout(function() {
								$scope.marker.coords = {
										latitude: 56.162939,
										longitude: 10.203921
								};
								$scope.dynamicMoveCtr++;
						}, 2000);
				}, 1000);
                       */ 
                });

                
        </script>
-->

    </body>
</html>