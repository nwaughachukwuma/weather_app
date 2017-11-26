<template>
<div class="container-fluid">
    <h2><label class="bg-primary">{{date}}</label></h2>
    <form xs6>
        <div class="text-xs-center" ml-4>
            <v-text-field
                offset-xs6
                class="text-xs-center"
                prepend-icon="search"
                v-model="searchText" 
                v-on:keyup.enter="searchLocation(searchText)"
                placeholder="Enter a location to search ..."
                :counter="20"
                solo
                hide-details 
                single-line>
            </v-text-field>
        </div>
    </form>
    <br/>
    <div><b>Search String: {{query}}</b></div>
    <v-layout>
    <v-container class="text-xs-center" xs12 sm6 offset-sm3>
        <v-layout row wrap class="text-xs-center" v-if="searchFound">
        <v-flex v-for="(city, i) in searchCitiesData" :key="i" xs10 sm9 md5 ma-1 offset-sm3>
            <v-card>
            <v-card-title primary-title>
                <div>
                    <span><h3 class="headline mb-0">{{city.cityName}}</h3></span>
                    <div>
                        <span>
                            <label>Weather State: {{city.weatherStateName}}</label>
                            <br/><label>Wind Direction: {{city.windDirection}}</label>
                        </span>
                    </div>
                </div>
                <div class="pull-right text-xs-right">
                    <img class="pull-right" ref="images" alt="weatherIcon">
                </div>
            </v-card-title>
            <v-card-text>
                
                <div class="col">                   
                    <a class="btn btn-primary raised" color="blue" ref="routowoeid" href="city.woeid">See More &nbsp;&nbsp;<span><v-icon medium>info</v-icon></span></a>
                </div>  
            </v-card-text>
            <v-card-actions>
                <v-btn flat tile color="blue">Min: {{city.minTemp}}&deg;C</v-btn>
                <v-btn flat tile color="orange">Current: {{city.curTemp}}&deg;C</v-btn>
                <v-btn flat tile color="red">Max: {{city.maxTemp}}&deg;C</v-btn>
            </v-card-actions>
            </v-card>
        </v-flex>
        </v-layout>
        <v-layout v-else>
            <v-flex >
                <v-card>
                    <v-card-title primary-title>
                         “No results were found. Try changing the keyword!” --- <h3>{{query}}</h3>
                    </v-card-title>
                </v-card>
            </v-flex>
        </v-layout>
      </v-container>
    </v-layout>
  </div>
</template>

<script>

import Weather from './Weather'
import {HTTP} from './http-common';

export default {
  components: {
    Weather,
  },
  props: ['query'],
  data(){
        return {
            // Define Data for Chart
            api: "http://localhost/weather.php/?command=location&woeid=london",
            apiUrl: "https://www.metaweather.com/api/location/",
            apiUrlBase: "https://www.metaweather.com/",
            homeCitiesWithWoeid: [],
            searchCitiesData : [
                { woeid: "", cityName: "", curTemp: "", minTemp: "", maxTemp: "", weatherIcon: "" ,weatherStateName: "", windDirection: "" },
            ],
            date: null,
            locations: {},
            title: null,
            latt_long: null,
            timezone: null,
            consolidated_weather: {},
            days: ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],
            months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
            searchText: '',  
            searchFound: null
        }
    },
    methods: {

        renderWeatherInfo(woeid, index){
            
            //this.searchCitiesData[index] = { woeid: "", cityName: "", curTemp: "", minTemp: "", maxTemp: "", weatherIcon: "" ,weatherStateName: "", windDirection: "" };
            
            this.searchCitiesData[index].woeid = woeid; //this.locations[woeid].woeid

            this.searchCitiesData[index].cityName = this.locations[woeid].title;

            var cityName = this.locations[woeid].title;
           
            var consolidated_weather = this.locations[woeid].consolidated_weather['0'];
            
            this.searchCitiesData[index].minTemp = parseInt(consolidated_weather.min_temp);
            this.searchCitiesData[index].maxTemp = parseInt(consolidated_weather.max_temp);
            this.searchCitiesData[index].curTemp = parseInt(consolidated_weather.the_temp);
            
            var weatherStateAbbr = consolidated_weather.weather_state_abbr;
            var weatherIconURL =  this.apiUrlBase + 'static/img/weather/ico/' + weatherStateAbbr + '.ico';
            this.searchCitiesData[index].weatherIcon = weatherIconURL;

            this.$refs.images[index].src = weatherIconURL;// this.searchCitiesData[index].weatherIcon;
            this.$refs.routowoeid[index].href = '#/weather/'+woeid; // check to modify.
        //    this.$refs.routowoeid[index].href = '/'+woeid;
            //console.log(this.$refs.routowoeid[index]);
            
            this.searchCitiesData[index].weatherStateName = consolidated_weather.weather_state_name;
            this.searchCitiesData[index].windDirection = consolidated_weather.wind_direction_compass;

            // console.log(this.searchCitiesData[index]);
        },
        // compute the date for the day.
        computeTodaysDate(){
            var day = this.days[new Date().getDay()];
            var month = this.months[new Date().getMonth()];            
            var year = new Date().getFullYear();
            var curdate = new Date().getDate();

            this.date = day + ', ' + month + ' ' + curdate + ', ' + year;
        },       
        computeFoundLocations(query){
            var that = this;
            var searchResult = [];
            HTTP.get('?command=search&keyword='+ query).then(response => {
                searchResult = response.data;
                if (searchResult.length === 0){
                    this.searchFound = false;   
                    return;                 
                }else{
                    this.searchFound = true;

                    searchResult.map((elem, index) => {    
                        if(index > 0){
                            this.searchCitiesData.push({ woeid: "", cityName: "", curTemp: "", minTemp: "", maxTemp: "", weatherIcon: "" ,weatherStateName: "", windDirection: "" })
                        }                   
                        HTTP.get('?command=location&woeid='+ elem.woeid).then(response => {
                            this.locations[elem.woeid] = response.data;
                            this.renderWeatherInfo(elem.woeid, index);
                        });
                    })
                }
                
                // this.renderWeatherInfo(woeid, index);
            });                  
        }, 
        searchLocation(query){
            this.searchFound = true;
            this.$router.push({ path: `/search/${query}` });
            //console.log('Search submitted', query);
        },      
    },
    mounted(){
        this.searchFound = true;
        // this.searchCitiesData = [];
        this.computeTodaysDate();
        this.computeFoundLocations(this.query);
    }
}
</script>

<style>
  .input-group{
    width: 50%;
  }
  form .text-xs-center{
    margin: 0 auto;
  }
  .text-xs-right{
    margin-left: 100px;
  }
  .layout.text-xs-center.row.wrap{
    color: red!important;
  margin-left: 60px;
  margin-right: -50px;
}
.btn-primary{
  background-color:#2388CB !important;
}
</style>
