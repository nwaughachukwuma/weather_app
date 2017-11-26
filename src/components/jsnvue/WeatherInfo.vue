<template>
  <div class="container-fluid" id="app">  
    <h2><label class="bg-primary">{{date}}</label></h2>


    <div class="tile is-ancestor">
        <!-- <radar> </radar> -->
        <div class="tile is-parent is-4">
        <article class="tile is-child box">
            <div class="content text-xs-center">
                <img class="img-center" ref="images" alt="weatherIcon" width="100px;" height="30px">
            </div>
        </article>
        </div>
    </div>    
    
     <v-card color="grey lighten-4" flat>
    <v-card-text>
      <v-container fluid>
        <v-layout row>
          <v-flex xs4>
            <v-subheader>City</v-subheader>
          </v-flex>
          <v-flex xs8>
            <v-card-text
              name="input-1"
            ><h3><b>{{cityName}}</b></h3></v-card-text>
          </v-flex>
        </v-layout>
        <v-layout row>
          <v-flex xs4>
            <v-subheader>Weather State</v-subheader>
          </v-flex>
          <v-flex xs8>
            <v-card-text
              name="input-2"
            >{{weatherStateName}}, {{weatherStateAbbr}}</v-card-text>
          </v-flex>
        </v-layout>
        <v-layout row>
          <v-flex xs4>
            <v-subheader>Temperature (min)</v-subheader>
          </v-flex>
          <v-flex xs8>
            <v-card-text
              name="input-3"
            >{{minTemp}} &deg;</v-card-text>
          </v-flex>
        </v-layout>
        <v-layout row>
          <v-flex xs4>
            <v-subheader>Temperature (cur)</v-subheader>
          </v-flex>
          <v-flex xs8>
            <v-card-text
              name="input-4"
            >{{curTemp}} &deg;</v-card-text>
          </v-flex>
        </v-layout>
        <v-layout row>
          <v-flex xs4>
            <v-subheader>Temperature (max)</v-subheader>
          </v-flex>
          <v-flex xs8>
            <v-card-text
              name="input-5"
            >{{maxTemp}} &deg;</v-card-text>
          </v-flex>
        </v-layout>
        <v-layout row>
          <v-flex xs4>
            <v-subheader>Wind Direction</v-subheader>
          </v-flex>
          <v-flex xs8>
            <v-card-text
              name="input-6"
            >{{windDirection}}</v-card-text>
          </v-flex>
        </v-layout>
        <v-layout row>
          <v-flex xs4>
            <v-subheader>Air Pressure</v-subheader>
          </v-flex>
          <v-flex xs8>
            <v-card-text
              name="input-7"
            >{{air_pressure}}</v-card-text>
          </v-flex>
        </v-layout>
        <v-layout row>
          <v-flex xs4>
            <v-subheader>Humidty</v-subheader>
          </v-flex>
          <v-flex xs8>
            <v-card-text
              name="input-8"
            >{{humidity}}</v-card-text>
          </v-flex>
        </v-layout>
        <v-layout row>
          <v-flex xs4>
            <v-subheader>Predictability</v-subheader>
          </v-flex>
          <v-flex xs8>
            <v-card-text
              name="input-9"
            >{{predictability}}</v-card-text>
          </v-flex>
        </v-layout>
        <v-layout row>
          <v-flex xs4>
            <v-subheader>Wind Direction (deg)</v-subheader>
          </v-flex>
          <v-flex xs8>
            <v-card-text
              name="input-10"
            >{{wind_direction}}</v-card-text>
          </v-flex>
        </v-layout>
        <v-layout row>
          <v-flex xs4>
            <v-subheader>Wind Speed (Km/h)</v-subheader>
          </v-flex>
          <v-flex xs8>
            <v-card-text
              name="input-11"
            >{{wind_speed}}</v-card-text>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card-text>
  </v-card>
  </div>
</template>

<script>

import Weather from './Weather'
import {HTTP} from './http-common';

export default {
  components: {
    Weather,
  },
  props: ['woeid'],
  data(){
        return {
            // Define Data for Chart
            apiUrl: "https://www.metaweather.com/api/location/",
            apiUrlBase: "https://www.metaweather.com/",
            cityName: "", curTemp: "", minTemp: "", maxTemp: "", weatherIcon: "" ,weatherStateName: "", windDirection: "",
            date: null,
            locations: {},
            title: null,
            consolidated_weather: {},
            days: ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],
            months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],            
            wind_speed: null,
            humidity: null,
            air_pressure: null,
            predictability: null,
            weatherStateAbbr: null,
            wind_direction: null,
            time_zone: null
        }
    },
    methods: {

        renderWeatherInfo(woeid){
            this.cityName = this.locations[woeid].title;
            var consolidated_weather = this.locations[woeid].consolidated_weather['0'];
            this.weatherStateName = consolidated_weather.weather_state_name;
            this.windDirection = consolidated_weather.wind_direction_compass;
            
            this.minTemp = parseInt(consolidated_weather.min_temp);
            this.maxTemp = parseInt(consolidated_weather.max_temp);
            this.curTemp = parseInt(consolidated_weather.the_temp);
            this.wind_speed = parseInt(consolidated_weather.wind_speed);
            this.humidity = parseInt(consolidated_weather.humidity);
            this.air_pressure = parseInt(consolidated_weather.air_pressure);
            this.predictability = parseInt(consolidated_weather.predictability);
            this.wind_direction = parseInt(consolidated_weather.wind_direction);
            this.time_zone = this.locations[woeid].time_zone;
                        
            var weatherStateAbbr = consolidated_weather.weather_state_abbr;
            var weatherIconURL =  this.apiUrlBase + 'static/img/weather/' + weatherStateAbbr + '.svg';
            this.weatherIcon = weatherIconURL;

            this.$refs.images.src = weatherIconURL;         
            
        }, 
        // compute the date for the day.
        computeTodaysDate(){
            var day = this.days[new Date().getDay()];
            var month = this.months[new Date().getMonth()];            
            var year = new Date().getFullYear();
            var curdate = new Date().getDate();

            this.date = day + ', ' + month + ' ' + curdate + ', ' + year;
        },       
        computeHomeCityWoeids(woeid){
            HTTP.get('?command=location&woeid='+ woeid).then(response => {
                this.locations[woeid] = response.data;
                this.renderWeatherInfo(woeid);
            });                  
        },       
    },
    mounted(){
        this.computeTodaysDate();
        this.computeHomeCityWoeids(this.woeid);
    }
}
</script>

