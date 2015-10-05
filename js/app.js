function log(x) {
	console.log(x);
}

var ViewModel = function() {
	var self = this;
	self.parkList = ko.observableArray([
		{"name": "Lenton Abbey Park", "location": "Derby Road, Lenton, Nottingham NG9 2SD", "lat": "52.9388484", "lng": "-1.2145866"},
		{"name": "Highfields", "location": "University Boulevard, Lenton, Nottingham NG7 2RD", "lat": "52.9324746", "lng": "-1.1949166"},
		{"name": "Victoria Embankment", "location": "Embankment Road, Nottingham NG2 2JY", "lat": "52.9349691", "lng": "-1.1463881"},
		{"name": "Lenton Recreation Ground", "location": "Derby Road, Lenton, Nottingham NG7 2DP", "lat": "52.9490363", "lng": "-1.1771102"},
		{"name": "Victoria Park", "location": "Bath Street, Nottingham NG1 1DF", "lat": "52.9566928", "lng": "-1.1402939"},
		{"name": "Arboretum Park", "location": "Waverley Street, Nottingham NG7 4HF", "lat": "52.9613065", "lng": "-1.1571471"},
		{"name": "Forest Recreation Ground", "location": "Gregory Boulevard, Nottingham NG1 6HH", "lat": "52.9657282", "lng": "1.1602631"},
		{"name": "Hungerhill Allotments", "location": "Ransom Rd, Nottingham NG3 4JB", "lat": "52.9686424", "lng": "-1.1350619"}
	]);

	self.filter = ko.observable("");
	//var h = function() {return false};
	self.show = function(index){
		log(index);
		if(self.filter() == "") return ko.observable(true);
		//if(this.filter
	};
}
/*
indexOf returns the position of the string in the other string. If not found, it will return -1:
var s = "foo";
alert(s.indexOf("oo") > -1);*/

var data = new ViewModel();
ko.applyBindings(data);

function initializeMap() {
	var mapCanvas = document.getElementById('map');
	var mapOptions = {
		center: new google.maps.LatLng(52.9544367,-1.1585429),
		zoom: 13,
		mapTypeId: google.maps.MapTypeId.ROADMAP
	}
	var map = new google.maps.Map(mapCanvas, mapOptions);

	// ADD MARKERS
	for (var i = 0; i < data.parkList().length; i++) {
		var coord = new google.maps.LatLng(data.parkList()[i].lat, data.parkList()[i].lng);
		var marker = new google.maps.Marker({
			position: coord,
			map: map,
			title: "Coordinates: "
		});
	}
}

initializeMap();
