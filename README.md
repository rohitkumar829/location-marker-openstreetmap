<h1>Location Marker with OpenStreetMap</h1>
<p>This project integrates OpenStreetMap using Leaflet.js, allowing users to select a location on the map, display
    their current location, and show a marker with a surrounding circle representing a customizable radius. The
    application fetches address details based on the location selected and provides two interactive maps.</p>
<h2>Live Demo</h2>
<p>Check out the live demo of this project:<br /><a
        href="https://rohitkumarinc.github.io/location-marker-openstreetmap/" target="_new" rel="noopener">Live
        URL</a></p>
<h2>Features</h2>
<ul>
    <li>Display two maps using OpenStreetMap tiles and Leaflet.js.</li>
    <li>Add a marker on the map based on latitude and longitude input.</li>
    <li>Drag the marker to adjust the location dynamically.</li>
    <li>Draw a circle around the marker with a customizable range (in kilometers).</li>
    <li>Fetch address details using the Nominatim API from OpenStreetMap.</li>
    <li>Get the user's current location via the browser's geolocation.</li>
    <li>Display dynamic inputs for latitude, longitude, and radius.</li>
</ul>
<h2>Installation</h2>
<ol>
    <li>
        <p>Clone the repository:</p>
        <div>
            <div dir="ltr">
                <code>git clone https://github.com/rohitkumarinc/location-marker-openstreetmap.git </code>
            </div>
        </div>
    </li>
    <li>
        <p>Navigate to the project directory:</p>
        <div>
            <div dir="ltr"><code>cd location-marker-openstreetmap </code></div>
        </div>
    </li>
    <li>
        <p>Open <code>index.html</code> in a web browser to view the application locally.</p>
    </li>
</ol>
<h2>Usage</h2>
<ul>
    <li><strong>Map 1</strong>: Displays the first interactive map.</li>
    <li><strong>Map 2</strong>: Displays the second interactive map with similar features.</li>
    <li><strong>Get Current Location</strong>: Use this button to retrieve your current location and mark it on the
        map.</li>
    <li><strong>Customize Range</strong>: You can specify a range in kilometers, and the map will display a circle
        around the selected marker with that radius.</li>
    <li><strong>Dynamic Address Fetching</strong>: Address details will be fetched and displayed based on the
        marker's location.</li>
</ul>
<h2>Dependencies</h2>
<ul>
    <li><strong>Leaflet.js</strong>: JavaScript library for interactive maps.</li>
    <li><strong>jQuery</strong>: Simplifies JavaScript tasks and DOM manipulation.</li>
    <li><strong>Nominatim API</strong>: Fetches address details based on latitude and longitude.</li>
    <li><strong>Bootstrap 4</strong>: For responsive design and UI components.</li>
</ul>
<h2>Code Structure</h2>
<ul>
    <li><strong><code>index.html</code></strong>: The main HTML file that contains the structure of the application.
    </li>
    <li><strong><code>js/mapPlugin.js</code></strong>: Custom JavaScript file that initializes the map and handles
        user interactions such as marker placement, circle drawing, and geolocation.</li>
    <li><strong>CSS and Bootstrap</strong>: Styles the application and makes it responsive.</li>
</ul>
<h2>How It Works</h2>
<ol>
    <li>A user can input latitude and longitude or click on the map to place a marker.</li>
    <li>The user can set a custom range (in kilometers) to draw a circle around the marker.</li>
    <li>Clicking "Get Current Location" will fetch the user's location via the browser and display it on the map.
    </li>
    <li>Address details for any selected location are fetched using the Nominatim API and displayed in the form.
    </li>
</ol>
