// parkList is the array containing all the parks
var parkList = [
		{"name": "Lenton Abbey Park", "location": "Derby Road, Lenton, Nottingham NG9 2SD", "lat": "52.9388484", "lng": "-1.2145866"},
		{"name": "Highfields", "location": "University Boulevard, Lenton, Nottingham NG7 2RD", "lat": "52.9324746", "lng": "-1.1949166"},
		{"name": "Victoria Embankment", "location": "Embankment Road, Nottingham NG2 2JY", "lat": "52.9349691", "lng": "-1.1463881"},
		{"name": "Lenton Recreation Ground", "location": "Derby Road, Lenton, Nottingham NG7 2DP", "lat": "52.9490363", "lng": "-1.1771102"},
		{"name": "Victoria Park", "location": "Bath Street, Nottingham NG1 1DF", "lat": "52.9566928", "lng": "-1.1402939"},
		{"name": "Arboretum Park", "location": "Waverley Street, Nottingham NG7 4HF", "lat": "52.9613065", "lng": "-1.1571471"},
		{"name": "Forest Recreation Ground", "location": "Gregory Boulevard, Nottingham NG1 6HH", "lat": "52.9657282", "lng": "-1.1602631"},
		{"name": "Hungerhill Allotments", "location": "Ransom Rd, Nottingham NG3 4JB", "lat": "52.9686424", "lng": "-1.1350619"}
];

// Initializes the Google Map centred to Nottingham.
// Extend each park in parkList with his own marker.
// Add an event listener to each marker.
var map;
var coord = [];
var infowindow = new google.maps.InfoWindow({});
function initializeMap() {

	var mapCanvas = document.getElementById('map');
	var mapOptions = {
		center: new google.maps.LatLng(52.9544367,-1.1585429),
		zoom: 13,
		mapTypeId: google.maps.MapTypeId.ROADMAP
	}
	map = new google.maps.Map(mapCanvas, mapOptions);

	var coord;
	var content;
	for (var i = 0; i < parkList.length; i++){
		coord = new google.maps.LatLng(parkList[i].lat, parkList[i].lng);
		parkList[i].marker = new google.maps.Marker({
			position: coord,
			icon: 'http://maps.google.com/mapfiles/kml/pal2/icon12.png',
			map: map,
			title: parkList[i].name
		});
		parkList[i].marker.addListener('click', (function(park) {
			return function() {
				openInfo(park);
			};
		})(parkList[i]));
	}
}

initializeMap();

// createContent will return a string containing content about the selected park
function createContent(park) {
	var content = "<h3>" + park.name + "</h3>" +
		"<div>"+park.location+"</div>" +
		"<div class='coord'>Latitude: " + park.lat + "</div>" +
		"<div class='coord'>Longitude: " + park.lng + "</div>" +
		"<div class='restaurants'>Nearby restaurants (distance < 1km)</div>";
	return content;
}

// openInfo is called when user click on the list or on a marker.
// It makes an ajax call to foursquare to have some information about restaurants near the selected park
// .setContent and .open are called inside ajax to be sure that there is a content when infowindws is opened.
function openInfo(park) {
	park.marker.setAnimation(google.maps.Animation.BOUNCE);
	setTimeout(function(){ park.marker.setAnimation(null); }, 700);
	var url = "https://api.foursquare.com/v2/venues/search?client_id=DSSY0XT4J1GLJ1USG0PWXLWBHG0COADELQ5NJUMQSLDOOCQY&client_secret=RW123CNTQ2IOOOB1GGXS4BUABFPHLQTP5ME5H5NTEGC10WGP&v=20130815"+
		"&ll="+park.lat+","+park.lng+
		"&query=restaurant"+
		"&limit=3"+
		"&radius=1000";
	var html = "";
	$.getJSON(url, function (data) {
        for (var i=0; i < data.response.venues.length; i++) {
        	html += "<div><a href='https://it.foursquare.com/v/"+data.response.venues[i].id+"'>"+data.response.venues[i].name+"</a></div>"
        }
        if(html == "") html = "There are no restaurants near the park"
        infowindow.setContent(createContent(park) + html);
		infowindow.open(map, park.marker);
    }).error(function(e){
        console.log("Problem with foursquare: " + e);
        html = "<div>We're sorry, loading restaurants is failed</div>";
        infowindow.setContent(createContent(park) + html);
		infowindow.open(map, park.marker);
    });
}

// The ViewModel
var ViewModel = function() {
	var self = this;

	// Create the array containing the visible array (parkVisible).
	// The ko.computed will change the array in according to the filter.
	// Every time filter's value change, parkVisible is update.
	var storePark;
	self.filter = ko.observable("");
	self.parkVisible = ko.computed( function() {
		storePark = [];
		parkList.forEach(function(park) {
			if (park.name.toLowerCase().indexOf(self.filter().toLowerCase()) > -1) {
				storePark.push(park);
				park.marker.setMap(map);
			}else{
				park.marker.setMap(null);
			}
		});
		return storePark;
	});

	// select function is activeted when user click on a place.
	// the event is adde in html using ko
	self.select = function(parent) {
		openInfo(parent);
	}
};

ko.applyBindings(new ViewModel());