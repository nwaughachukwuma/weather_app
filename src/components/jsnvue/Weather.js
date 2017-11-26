import {HTTP} from './http-common';

export default {
    name: 'weather',
    template: `
    <div class="container-fluid">
    <h2>Home</h2>
    <form xs6>
        <div class="text-xs-center" ml-4>
            <v-text-field
                offset-xs6
                class="text-xs-center"
                prepend-icon="search"
                v-model="searchText" 
                v-on:keyup.enter="submit"
                placeholder="Enter a location to search ..."
                :counter="20"
                solo
                hide-details 
                single-line>
            </v-text-field>
        </div>
    </form>
    <br/>
    <v-layout>
      <v-flex xs12 sm6 offset-sm3>
        <v-card>
            <v-card-title primary-title>
                <label class="bg-info">{{date}}</label>
            </v-card-title primary-title>
        </v-card mb-2>
        <v-card>
          <v-card-title primary-title>
            <div>
                <span><h3 class="headline mb-0">{{cityName}}</h3></span>
                <div>
                    <span>
                        <label>Weather State: {{weatherStateName}}</label>
                        <br/><label>Wind Direction: {{windDirection}}</label>
                    </span>
                </div>
            </div>
            <div class="pull-right text-xs-right">
                <img class="pull-right" ref="images" alt="weatherIcon">
            </div>
          </v-card-title>
          <v-card-text>
            Temperature in Celcius Scale
          </v-card-text>
          <v-card-actions>
            <v-btn flat color="orange">Min Temp: {{minTemp}}</v-btn>
            <v-btn flat color="orange">current Temp: {{curTemp}}</v-btn>
            <v-btn flat color="orange">max Temp: {{maxTemp}}</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </div>
  `,
    data(){
        return {
            // Define Data for Charts
            dropboxAPIUrl: "https://dl.dropboxusercontent.com/s/7gzhr6zxe3zlwqh/weather.php?dl=0",
            api: "http://localhost/weather.php/?command=location&woeid=london",
            apiUrl: "https://www.metaweather.com/api/location/",
            apiUrlBase: "https://www.metaweather.com/",
            appname: "App",
            cityName: "",
            curTemp: "",
            maxTemp: "",
            minTemp: "",
            weatherIcon: "",
            weatherStateName: "",
            windDirection: "",
            date: null,
            locations: {},
            title: null,
            location_type: null,
            woeid: null,
            latt_long: null,
            timezone: null,
            consolidated_weather: {},
            days: ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],
            months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
            searchText: '',
            
        }
    },
    methods: {

        getLocationWeatherDetails(){
            HTTP.get('?command=location&woeid=44418').then(response => {
                this.locations['44418'] = response.data
                this.renderWeatherInfo();
            });            
            
        },
        renderWeatherInfo(){
            this.cityName = this.locations['44418'].parent.title;
            this.cityName = this.locations['44418'].title;
            this.location_type = this.locations['44418'].location_type;
            this.woeid = this.locations['44418'].woeid;
            this.timezone = this.locations['44418'].timezone;             
            this.consolidated_weather = this.locations['44418'].consolidated_weather['0'];
            
            this.minTemp = parseInt(this.consolidated_weather.min_temp);
            this.maxTemp = parseInt(this.consolidated_weather.max_temp);
            this.curTemp = parseInt(this.consolidated_weather.the_temp);
            var date = this.consolidated_weather.created;
            var day = this.days[new Date(date).getDay()];
            var month = this.months[new Date(date).getMonth()];            
            var year = new Date(date).getFullYear();
            var curdate = new Date(date).getDate();
            this.date = day + ', ' + month + ' ' + curdate + ', ' + year;
            console.log(this.date);

            var weatherIcon = this.consolidated_weather.weather_state_abbr;
            var weatherIconURL =  this.apiUrlBase + 'static/img/weather/ico/' + weatherIcon + '.ico';
            this.weatherIcon = weatherIconURL;

            this.$refs.images.src = this.weatherIcon;

            this.weatherStateName = this.consolidated_weather.weather_state_name;
            this.windDirection = this.consolidated_weather.wind_direction_compass;
        },        
        computeNewName(){
            this.appname = "Weather App";
        },
        submit(){
            console.log('Search submitted');
        },
    },
    mounted(){
        this.computeNewName();
        this.getLocationWeatherDetails();
    }
}
