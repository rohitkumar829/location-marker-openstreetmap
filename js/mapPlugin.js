(function ($) {
    $.fn.mapCreate = function (options) {
        // Default options
        var settings = $.extend({
            enterprise: [23, 80],
            zoom: 5,
            map: 'map',
            latLngValue: {
                range: $('#kilometers').val(),
                latitude: $('#lat').val(),
                longitude: $('#lng').val()
            },
            input: {
                lat: "#lat",
                lng: "#lng",
                kilometers: "#kilometers",
                kilometers_label: "#kilometers_label",
                getLocationGps: "#getLocationGps",
                json: "#json"
            },
        }, options);

        var map, pin, circles = L.featureGroup();
        var tilesURL = 'https://www.google.com/maps/vt/lyrs=m&x={x}&y={y}&z={z}';
        var mapAttrib = '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, Tiles courtesy of <a href="http://hot.openstreetmap.org/" target="_blank">Humanitarian OpenStreetMap Team</a>';

        // Initialize map
        initializeMap();

        // Set initial marker and circle based on latitude and longitude
        if (settings.latLngValue) {
            latLngMapSet({
                lat: settings.latLngValue.latitude,
                lng: settings.latLngValue.longitude
            });
            fitCircleBounds();
        }

        // Event listeners
        $(settings.input.kilometers).on('input', updateRange);
        $(settings.input.getLocationGps).on('click', getLocation);

        // Functions

        // Initialize the map
        function initializeMap() {
            map = L.map(settings.map, {
                gestureHandling: true,
                center: settings.enterprise,
                zoom: settings.zoom
            });

            L.tileLayer(tilesURL, {
                attribution: mapAttrib,
            }).addTo(map);

            map.on('click', function (ev) {
                latLngMapSet(ev.latlng);
            });
        }

        // Set marker and circle based on latitude and longitude
        function latLngMapSet(latlng) {
            updateLatLngInputs(latlng);

            if (pin) {
                pin.setLatLng(latlng);
            } else {
                pin = L.marker(latlng, { riseOnHover: true, draggable: true }).addTo(map);
                pin.on('drag', updateLatLngOnDrag);
                pin.on('dragend', function (ev) {
                    latLngMapSet(ev.target.getLatLng());
                });
            }

            setCircle(latlng);
        }

        // Set the circle on the map
        function setCircle(latlng) {
            if (map.hasLayer(circles)) {
                map.removeLayer(circles);
            }

            circles = L.circle(latlng, 1000 * settings.latLngValue.range, {
                color: '#0000115c',
                fillColor: '#f4c96b',
                fillOpacity: 0.5
            }).addTo(map);

            updateKilometersLabel();
        }

        // Update kilometers label
        function updateKilometersLabel() {
            $(settings.input.kilometers_label).text(settings.latLngValue.range + ' KM');
        }

        // Update the range and circle based on input change
        function updateRange() {
            settings.latLngValue.range = $(this).val();
            setCircle(settings.enterprise);
            fitCircleBounds();
        }

        // Fit the map view to the circle bounds
        function fitCircleBounds() {
            if (map.hasLayer(circles)) {
                map.fitBounds(circles.getBounds());
            }
        }

        // Update latitude and longitude on drag
        function updateLatLngOnDrag(ev) {
            settings.enterprise = ev.target.getLatLng();
            setCircle(ev.target.getLatLng());
        }

        // Update the latitude and longitude input fields
        function updateLatLngInputs(latlng) {
            settings.enterprise = latlng;
            $(settings.input.lat).val(latlng.lat);
            $(settings.input.lng).val(latlng.lng);
            map.panTo([latlng.lat, latlng.lng]);
            fetchAddressDetails(latlng);
        }

        // Fetch address details from OpenStreetMap API
        function fetchAddressDetails(latlng) {
            var url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latlng.lat}&lon=${latlng.lng}&addressdetails=1`;
            $.get(url, function (data) {
                $(settings.input.json).text(JSON.stringify(data));
                settings.success({
                    lat: latlng.lat,
                    lng: latlng.lng,
                    addressDetails: data
                });
            });
        }

        // Get current location from the browser's geolocation
        function getLocation() {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(function (position) {
                    var latlng = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    };
                    latLngMapSet(latlng);
                });
            } else {
                alert("Geolocation is not supported by this browser.");
            }
        }
    };
}(jQuery));
