
<div align="center">
  <a href="https://www.coviduz.info/"><img src="https://github.com/mard0n/uzb-covid-zones/blob/master/client/src/assets/readme-image.svg" alt="CovidUz" width="200"></a>
  <h1 style="line-height: 1; font-family: Rubik, Arial Helvetica, sans-serif;">
    CovidUz
  </h1>
</div>

<h4 align="center">Service for citizens of Uzbekistan to monitor the spread of Covid</h4>

<p align="center">
  <a href="#key-features">Key Features</a> •
  <a href="#technical-features">Technical Features</a> •
  <a href="#technologies">Technologies</a>
</p>

![screenshot](https://github.com/mard0n/uzb-covid-zones/blob/master/client/src/assets/coviduz-demo.gif)

## Key Features

* Distinct/Highlited regions, cities and districts of Uzbekistan
* Search any region, city, district of Uzbekistan
* Detailed info about any zone selected
   - Zone status (Red, Yellow, Green)
   - Overall number of infected, recovered, deceased
   - Statistics about daily changes in the number of infected, recovered, deceased
* Multiple language are available (Uzbek, Russian, English). Autodetected

## Technical Features
* Open source map provided by [Leaflet](https://leafletjs.com/)
* Hand drawn topological data of all regions, cities, and districts of Uzbekistan. (Can be provided on request)
* Easily edit the shapes of all zones using [Geojson editor](http://geojson.io/), Github Gist and Google Sheets and automatically sync with the database 
* Easily edit any data of the zones (zone status, number of infected, recovered, deceased, or daily statistics) on Google Sheets and automatically sync with the database

## Technologies

- [React with typescript](https://reactjs.org/)
- [Leaflet](https://leafletjs.com/) - library uses [OpenSteerMap](https://www.openstreetmap.org/) and allows mobile-friendly interactions with the map
- [Material ui v4](https://v4.mui.com/)
- [Node.js](https://nodejs.org/)
- [MongoDB Atlas Database](https://www.mongodb.com/atlas/database/)
- [Geojson.io](http://geojson.io/) - to create, edit topological data (i.e. geojson) and save them on Github gist
- [Mapshaper](https://mapshaper.org/) - to optimize geojson data
- [Github Gist](https://gist.github.com/) - a place to store the geojson data
- [Google Sheets](https://docs.google.com/spreadsheets/u/0/) - to sync topological data on gist with the database with the help of node.js scripts
- [Chart.js](https://www.chartjs.org/) - statistics
