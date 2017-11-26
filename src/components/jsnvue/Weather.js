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
                <v-card-title primary-title class="text-xs-center">
                    <h4><label class="bg-primary">{{date}}</label></h4>
                </v-card-title primary-title>
            </v-card mb-2>
        </v-flex>
    </v-layout>
    <v-layout>
    <v-container class="text-xs-center" xs12 sm6 offset-sm3>
        <v-layout row wrap class="text-xs-center">
        <v-flex v-for="(city, i) in homeCitiesData" :key="i" xs10 sm9 md5 ma-1 offset-sm3>
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
                Temperature in Celcius Scale
            </v-card-text>
            <v-card-actions>
                <v-btn flat color="blue">Min Temp: {{city.minTemp}}</v-btn>
                <v-btn flat color="orange">current Temp: {{city.curTemp}}</v-btn>
                <v-btn flat color="red">max Temp: {{city.maxTemp}}</v-btn>
            </v-card-actions>
            </v-card>
        </v-flex>
        </v-layout>
      </v-container>
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
            homeCities: ["istanbul", "berlin", "london", "helsinki", "dublin", "vancouver"],
            homeCitiesWithWoeid: [],// "istanbul": null, "berlin": null, "london": null, "helsinki": null, "dublin": null, "vancouver": null  },
            cityDataLS: JSON.parse(this.$ls.get('cityData')), // city data in local storage
            homeCitiesData : [
                { cityName: "", curTemp: "", minTemp: "", maxTemp: "", weatherIcon: "" ,weatherStateName: "", windDirection: "" },
                { cityName: "", curTemp: "", minTemp: "", maxTemp: "", weatherIcon: "", weatherStateName: "", windDirection: "" },
                { cityName: "", curTemp: "", minTemp: "", maxTemp: "", weatherIcon: "", weatherStateName: "", windDirection: "" },
                { cityName: "", curTemp: "", minTemp: "", maxTemp: "", weatherIcon: "", weatherStateName: "", windDirection: "" },
                { cityName: "", curTemp: "", minTemp: "", maxTemp: "", weatherIcon: "", weatherStateName: "", windDirection: "" },
                { cityName: "", curTemp: "", minTemp: "", maxTemp: "", weatherIcon: "", weatherStateName: "", windDirection: "" },
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
            
        }
    },
    methods: {

        getHomeCitiesWeatherDetails(){
            var that = this;
            //this.homeCitiesWithWoeid = JSON.parse(JSON.stringify(this.homeCitiesWithWoeid));
            // console.log(Object.keys(this.homeCitiesWithWoeid).length)

            // HTTP.get('?command=location&woeid=44418').then(response => {
            //     this.locations['44418'] = response.data
            //     this.renderWeatherInfo();
            // });            
            
        },
        renderWeatherInfo(woeid, index){

            this.homeCitiesData[index].cityName = this.locations[woeid].title;

            var cityName = this.locations[woeid].title;
           
            var consolidated_weather = this.locations[woeid].consolidated_weather['0'];
            
            this.homeCitiesData[index].minTemp = parseInt(consolidated_weather.min_temp);
            this.homeCitiesData[index].maxTemp = parseInt(consolidated_weather.max_temp);
            this.homeCitiesData[index].curTemp = parseInt(consolidated_weather.the_temp);

            if (index === 0){
                var date = consolidated_weather.created;
                var day = this.days[new Date(date).getDay()];
                var month = this.months[new Date(date).getMonth()];            
                var year = new Date(date).getFullYear();
                var curdate = new Date(date).getDate();
    
                this.date = day + ', ' + month + ' ' + curdate + ', ' + year;
            }
            
            var weatherStateAbbr = consolidated_weather.weather_state_abbr;
            var weatherIconURL =  this.apiUrlBase + 'static/img/weather/ico/' + weatherStateAbbr + '.ico';
            this.homeCitiesData[index].weatherIcon = weatherIconURL;

            this.$refs.images[index].src = weatherIconURL;// this.homeCitiesData[index].weatherIcon;
            
            this.homeCitiesData[index].weatherStateName = consolidated_weather.weather_state_name;
            this.homeCitiesData[index].windDirection = consolidated_weather.wind_direction_compass;
        },        
        computeHomeCityWoeids(){
            var that = this;   
            var temp = []; 
            this.homeCities.map((val, index) => {
                // Get for the woeid of the six cities on the home page
                HTTP.get('?command=search&keyword='+ val).then(response => {  
                    var woeid = response.data[0].woeid;
                    // Get their location data and render the weather to screen
                    HTTP.get('?command=location&woeid='+ woeid).then(response => {
                        this.locations[woeid] = response.data;
                        this.renderWeatherInfo(woeid, index);
                    });          
                });
            })          
        },       
        findWoeid(queryParam){

        },
        submit(){
            console.log('Search submitted');
        },
    },
    mounted(){
        this.computeHomeCityWoeids();
        this.getHomeCitiesWeatherDetails();
    }
}
