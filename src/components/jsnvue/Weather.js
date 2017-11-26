import {HTTP} from './http-common';

export default {
    name: 'weather',
    template: `
    <div class="container-fluid">
    <h2><label class="bg-primary">{{date}}</label></h2>
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
    <v-container class="text-xs-center" xs12 sm6 offset-sm3>
        <v-layout row wrap class="text-xs-center">
        <v-flex v-for="(city, i) in homeCitiesData" :key="i" xs10 sm9 md5 ma-1 offset-sm3>
            <v-card @click="showMoreDetails">
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
            cityDataLS: [565346, 9807, 638242, 2344116, 560743, 44418], // city data in local storage
            homeCitiesData : [
                { woeid: "", cityName: "", curTemp: "", minTemp: "", maxTemp: "", weatherIcon: "" ,weatherStateName: "", windDirection: "" },
                { woeid: "", cityName: "", curTemp: "", minTemp: "", maxTemp: "", weatherIcon: "", weatherStateName: "", windDirection: "" },
                { woeid: "", cityName: "", curTemp: "", minTemp: "", maxTemp: "", weatherIcon: "", weatherStateName: "", windDirection: "" },
                { woeid: "", cityName: "", curTemp: "", minTemp: "", maxTemp: "", weatherIcon: "", weatherStateName: "", windDirection: "" },
                { woeid: "", cityName: "", curTemp: "", minTemp: "", maxTemp: "", weatherIcon: "", weatherStateName: "", windDirection: "" },
                { woeid: "", cityName: "", curTemp: "", minTemp: "", maxTemp: "", weatherIcon: "", weatherStateName: "", windDirection: "" },
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
        },
        renderWeatherInfo(woeid, index){

            this.homeCitiesData[index].woeid = woeid; //this.locations[woeid].woeid

            this.homeCitiesData[index].cityName = this.locations[woeid].title;

            var cityName = this.locations[woeid].title;
           
            var consolidated_weather = this.locations[woeid].consolidated_weather['0'];
            
            this.homeCitiesData[index].minTemp = parseInt(consolidated_weather.min_temp);
            this.homeCitiesData[index].maxTemp = parseInt(consolidated_weather.max_temp);
            this.homeCitiesData[index].curTemp = parseInt(consolidated_weather.the_temp);
            
            var weatherStateAbbr = consolidated_weather.weather_state_abbr;
            var weatherIconURL =  this.apiUrlBase + 'static/img/weather/ico/' + weatherStateAbbr + '.ico';
            this.homeCitiesData[index].weatherIcon = weatherIconURL;

            this.$refs.images[index].src = weatherIconURL;// this.homeCitiesData[index].weatherIcon;
            this.$refs.routowoeid[index].href = '#/weather/'+woeid;
        //    this.$refs.routowoeid[index].href = '/'+woeid;
            //console.log(this.$refs.routowoeid[index]);
            
            this.homeCitiesData[index].weatherStateName = consolidated_weather.weather_state_name;
            this.homeCitiesData[index].windDirection = consolidated_weather.wind_direction_compass;
        }, 
        // compute the date for the day.
        computeTodaysDate(){
            var day = this.days[new Date().getDay()];
            var month = this.months[new Date().getMonth()];            
            var year = new Date().getFullYear();
            var curdate = new Date().getDate();

            this.date = day + ', ' + month + ' ' + curdate + ', ' + year;
        },       
        computeHomeCityWoeids(){
            var that = this;   
            var temp = []; 
            var connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;

            this.homeCities.map((val, index) => {
                // Get for the woeid of the six cities on the home page

                // mechanism to test that network is slow
                // use saved woeid data: this.cityDataLS
                // Check for browser support: When the internet is poor. To improve performance
                console.log(connection.downlink);
                if (connection && connection.downlink < 2.05) {
                   this.cityDataLS.map((woeidval, ind)=>{
                    HTTP.get('?command=location&woeid='+ woeidval).then(response => {
                        this.locations[woeid] = response.data;
                        this.renderWeatherInfo(woeid, index);
                    }); 
                   })
                }else{
                    HTTP.get('?command=search&keyword='+ val).then(response => {  
                        var woeid = response.data[0].woeid;
                        // Get their location data and render the weather to screen
                        HTTP.get('?command=location&woeid='+ woeid).then(response => {
                            this.locations[woeid] = response.data;
                            this.renderWeatherInfo(woeid, index);
                        });          
                    });
                }                                    
            })          
        },       
        findWoeid(queryParam){

        },
        submit(){
            console.log('Search submitted');
        },
        showMoreDetails(e, index, woeid){
            //this.$refs.routowoeid[index].to = '/weather/'+woeid;
            console.log("Clicked to Show more details", this.$refs.routowoeid[index]);
        }
    },
    mounted(){
        this.computeTodaysDate();
        this.computeHomeCityWoeids();
        this.getHomeCitiesWeatherDetails();
    },
    watch: {
        routowoeid: function(val){
            console.log(val);
        }
    }
}
