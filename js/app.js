var model = {
	init: function() {

	},
	update: function() {

	}
}

var view = {
	init: function() {
		var mapCanvas = document.getElementById('map');
		var mapOptions = {
			center: new google.maps.LatLng(44.5403, -78.5463),
			zoom: 8,
			mapTypeId: google.maps.MapTypeId.ROADMAP
		}
		var map = new google.maps.Map(mapCanvas, mapOptions);
	},
	update: function() {

	}
}

var control = {
	init: function() {
		model.init();
		view.init();
	},
	update: function() {

	}
}

control.init();