/* Punchlist

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







// Configuration
var markers = [];
var map;
var trainFeed = 'https://engbld.dot.nc.net/EAD/RailTrak/api';
var raleighLocation = { lat: 35.7806, lng: -80.5 };
var mapDiv = document.getElementById('map');
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
    map = new google.maps.Map(mapDiv, {
        center: raleighLocation,
        zoom: 9,
        minZoom: 4,
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




// Shows Transit Data from Google Maps
    var transitLayer = new google.maps.TransitLayer();
    transitLayer.setMap(map);

    
// Loads json array track data
    map.data.addGeoJson(trackData);
    var trackStyle = {
        strokeColor: '#778899',
        strokeWeight: 2,
        clickable: false
    };

    map.data.setStyle(trackStyle);


// Loads GeoJSON stations
    map.data.addGeoJson(stationData);
    var featureStyle = {
        strokeColor: '#778899',
        strokeWeight: 3,
        clickable: true,
        icon: {url: "https://maps.gstatic.com/mapfiles/ms2/micons/rail.png" }

    };

    map.data.setStyle(featureStyle);



       // Station Infowindow
        var stationInfoWindow = new google.maps.InfoWindow();


 // InfoWindow for stations
    map.data.addListener('mouseover', function(event) {
    
        //console.log(stationData);
    
 

        var stationLink = event.feature.getProperty("stationcode");
        var stationName = event.feature.getProperty("name");

        
        stationInfoWindow.setContent('<a href="http://www.ncbytrain.org/destinations?station="' +stationLink+ ' style="width:150px; text-align: center;">' +stationName+ ' Station</a>');
        stationInfoWindow.setPosition(event.feature.getGeometry().get());
        stationInfoWindow.setOptions({pixelOffset: new google.maps.Size(0,-30)});
        stationInfoWindow.open(map);
    });  



 map.data.addListener('mouseout', function(event) {
     stationInfoWindow.close(map);
 });






// Gets feed data
    getTrainData();


}; //initTrainMap






// Function to update map
var updateMap = function() { 

    // Font Map Markers Go!

            // Define Marker Shapes
            var MAP_PIN = 'M0-48c-9.8 0-17.7 7.8-17.7 17.4 0 15.5 17.7 30.6 17.7 30.6s17.7-15.4 17.7-30.6c0-9.6-7.9-17.4-17.7-17.4z';
            var SQUARE_PIN = 'M22-48h-44v43h16l6 5 6-5h16z';
            var SHIELD = 'M18.8-31.8c.3-3.4 1.3-6.6 3.2-9.5l-7-6.7c-2.2 1.8-4.8 2.8-7.6 3-2.6.2-5.1-.2-7.5-1.4-2.4 1.1-4.9 1.6-7.5 1.4-2.7-.2-5.1-1.1-7.3-2.7l-7.1 6.7c1.7 2.9 2.7 6 2.9 9.2.1 1.5-.3 3.5-1.3 6.1-.5 1.5-.9 2.7-1.2 3.8-.2 1-.4 1.9-.5 2.5 0 2.8.8 5.3 2.5 7.5 1.3 1.6 3.5 3.4 6.5 5.4 3.3 1.6 5.8 2.6 7.6 3.1.5.2 1 .4 1.5.7l1.5.6c1.2.7 2 1.4 2.4 2.1.5-.8 1.3-1.5 2.4-2.1.7-.3 1.3-.5 1.9-.8.5-.2.9-.4 1.1-.5.4-.1.9-.3 1.5-.6.6-.2 1.3-.5 2.2-.8 1.7-.6 3-1.1 3.8-1.6 2.9-2 5.1-3.8 6.4-5.3 1.7-2.2 2.6-4.8 2.5-7.6-.1-1.3-.7-3.3-1.7-6.1-.9-2.8-1.3-4.9-1.2-6.4z';
            var ROUTE = 'M24-28.3c-.2-13.3-7.9-18.5-8.3-18.7l-1.2-.8-1.2.8c-2 1.4-4.1 2-6.1 2-3.4 0-5.8-1.9-5.9-1.9l-1.3-1.1-1.3 1.1c-.1.1-2.5 1.9-5.9 1.9-2.1 0-4.1-.7-6.1-2l-1.2-.8-1.2.8c-.8.6-8 5.9-8.2 18.7-.2 1.1 2.9 22.2 23.9 28.3 22.9-6.7 24.1-26.9 24-28.3z';
            var SQUARE = 'M-24-48h48v48h-48z';
            var SQUARE_ROUNDED = 'M24-8c0 4.4-3.6 8-8 8h-32c-4.4 0-8-3.6-8-8v-32c0-4.4 3.6-8 8-8h32c4.4 0 8 3.6 8 8v32z';

            // Function to do the inheritance properly
            // Inspired by: http://stackoverflow.com/questions/9812783/cannot-inherit-google-maps-map-v3-in-my-custom-class-javascript
            var inherits = function(childCtor, parentCtor) {
                /** @constructor */
                function tempCtor() {};
                tempCtor.prototype = parentCtor.prototype;
                childCtor.superClass_ = parentCtor.prototype;
                childCtor.prototype = new tempCtor();
                childCtor.prototype.constructor = childCtor;
            };

            function Marker(options){
                google.maps.Marker.apply(this, arguments);

                if (options.map_icon_label) {
                    this.MarkerLabel = new MarkerLabel({
                        map: this.map,
                        marker: this,
                        text: options.map_icon_label
                    });
                    this.MarkerLabel.bindTo('position', this, 'position');
                }
            }

            // Apply the inheritance
            inherits(Marker, google.maps.Marker);

            // Custom Marker SetMap
            Marker.prototype.setMap = function() {
                google.maps.Marker.prototype.setMap.apply(this, arguments);
                (this.MarkerLabel) && this.MarkerLabel.setMap.apply(this.MarkerLabel, arguments);
            };

            // Marker Label Overlay
            var MarkerLabel = function(options) {
                var self = this;
                this.setValues(options);
                
                // Create the label container
                this.div = document.createElement('div');
                this.div.className = 'map-icon-label';
            
                // Trigger the marker click handler if clicking on the label
                google.maps.event.addDomListener(this.div, 'click', function(e){
                    (e.stopPropagation) && e.stopPropagation();
                    google.maps.event.trigger(self.marker, 'click');
                });
            };

            // Create MarkerLabel Object
            MarkerLabel.prototype = new google.maps.OverlayView;

            // Marker Label onAdd
            MarkerLabel.prototype.onAdd = function() {
                var pane = this.getPanes().overlayImage.appendChild(this.div);
                var self = this;

                this.listeners = [
                    google.maps.event.addListener(this, 'position_changed', function() { self.draw(); }),
                    google.maps.event.addListener(this, 'text_changed', function() { self.draw(); }),
                    google.maps.event.addListener(this, 'zindex_changed', function() { self.draw(); })
                ];
            };
            
            // Marker Label onRemove
            MarkerLabel.prototype.onRemove = function() {
                this.div.parentNode.removeChild(this.div);

                for (var i = 0, I = this.listeners.length; i < I; ++i) {
                    google.maps.event.removeListener(this.listeners[i]);
                }
            };
            
            // Implement draw
            MarkerLabel.prototype.draw = function() {
                var projection = this.getProjection();
                var position = projection.fromLatLngToDivPixel(this.get('position'));
                var div = this.div;

                this.div.innerHTML = this.get('text').toString();

                div.style.zIndex = this.get('zIndex'); // Allow label to overlay marker
                div.style.position = 'absolute';
                div.style.display = 'block';
                div.style.left = (position.x - (div.offsetWidth / 2)) + 'px';
                div.style.top = (position.y - div.offsetHeight) + 'px';
                
            };

            // End font icons



    rawInput = this.responseText
    var trainInfo = JSON.parse(rawInput);

    
    var infowindow = new google.maps.InfoWindow({
        content: "loading..."
    });


	// Counts number of trains
    var numberOfTrains = trainInfo.length;
    
    
    for (var i = 0; i < numberOfTrains; i++) {
        if (trainInfo[i].Latitude !== undefined && trainInfo[i].Longitude !== undefined) {
            
           //console.log(trainInfo[i]);
            
            var currentTrainPosition = {
                lat: trainInfo[i].Latitude,
                lng: trainInfo[i].Longitude
            };


            var thisTrainTime = trainInfo[i].RecordedTime.split('T');
            thisTrainTime = thisTrainTime[1].split('.');


			// Sets a new marker
            var marker = new Marker({
                zIndex: google.maps.Marker.MAX_ZINDEX + 1,
                position: currentTrainPosition,
                map: map,
                 icon: trainIcon,
/*
                icon: {
                            path: SQUARE_PIN,
                            fillColor: '#00CCBB',
                            fillOpacity: 1,
                            strokeColor: '#ff0000',
                            strokeWeight: 4
                        },
                        map_icon_label: '<span class="map-icon map-icon-transit-station"></span>',
*/
                ID: trainInfo[i].ID,
                title: trainInfo[i].DeviceName,
                infoWindowHTML: 
                    '<div id="content">' +
                    '<p><strong>' + trainInfo[i].DeviceUUID + ' ' + trainInfo[i].DeviceName + '</strong></p>' +
                    '<p><i>' + trainInfo[i].FromStation + ' > ' + trainInfo[i].ToStation + '</i></p>' +
                    '<p>Next Station: ' + trainInfo[i].NextStation + ', running ' + trainInfo[i].OnTimePerformance + '</p>' +
                    '<p>' + trainInfo[i].Speed + ' <small>MPH</small></p>' +
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







