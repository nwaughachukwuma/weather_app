<template>
  <div class="container-fluid" id="app">

    <!-- <div class="text-xs-center row">
        <v-pagination :length="6" v-model="page" circle></v-pagination>
    </div> -->
    <fullscreen ref="fullscreen" :fullscreen.sync="fullscreen">

    <!-- <div class="text-xs-center" style="height: 50%; margin-top: -12px; margin-bottom: -29px;"> -->
        <v-container @click="updateSlide()" class="text-xs-center" height="15px" style="margin-top: -12px; margin-bottom: -29px;">
        <v-layout justify-center>
            <v-flex xs6>
                <v-card dark>
                    <v-card-text>
                    <v-pagination :length="8" v-model="page" circle :color="color"></v-pagination>
                    </v-card-text>
                </v-card>
            </v-flex>
        </v-layout>
        </v-container>
    <!-- </div> -->

    <carousel-3d :autoplay="true" ref="mycarousel" @before-slide-change="updatePaginate" :autoplay-timeout="5000" :width="1000" :height="600" :perspective="2" :space="370" :display="3" :controls-visible="false" :controls-prev-html="'&#10092;'" :controls-next-html="'&#10093;'" 
               :controls-width="30" :controls-height="90">

        <slide :index="0">
            <div class="row">
                <div class="col-sm-12">
                    <div class="chart-wrapper">
                    <div class="chart-title">
                        Current reporting rate
                    </div>
                    <div class="chart-stage">                
                        <div ref="line" style="width:100%;"></div>
                        <!-- <chart :type="'pie'" :data="chartData"></chart> -->                                  
                    </div>
                    <div class="chart-notes">
                        <h4>
                            <b>Current reporting rate</b>
                        </h4>
                    </div>
                    </div>
                </div>
            </div>
        </slide>
        
        <slide :index="1">
            <div class="row">
                <div class="col-sm-12">
                <div class="chart-wrapper">
                    <div class="chart-title">
                        Bar chart
                    </div>
                    <div class="chart-stage">
                        <!-- <img v-holder="'img=100px240?auto=yes'"> -->
                        <div ref="bar" style="width:100%;"></div>
                    </div>
                    <div class="chart-notes">
                        <h4>
                            <b>Current reporting rate</b>
                        </h4>                        
                    </div>
                </div>
            </div>
            </div>
        </slide>
        <slide :index="2">
            
            <div class="row">
                <div class="col-sm-12">
                <div class="chart-wrapper">
                    <div class="chart-title">
                        Line chart
                    </div>
                    <div class="chart-stage">
                        <!-- <img v-holder="'img=100px240?auto=yes'"> -->
                        <div ref="incr" style="width:100%;"></div>
                    </div>
                    <div class="chart-notes">
                        <h4>
                            <b>Increment in current reporting rate</b>
                        </h4>                        
                    </div>
                </div>
            </div>
            </div>
        </slide>
        
        <slide :index="3">            
            <div class="row">
                <div class="col-md-12">
                <div class="chart-wrapper">
                    <div class="chart-title col-md-12">
                        <div class="col-md-4">
                            <multi-select v-model="selectedMonthMS" :options="optionsMonth" :hide-selected="true" :searchable="true" :allow-empty="false" placeholder="Select Month" @change="" @select=""></multi-select>
                        </div>
                        <div class="col-md-8">
                            <multi-select :multiple="true" v-model="selectedStatesMS" :options="optionsState" :hide-selected="true" :searchable="true" :allow-empty="true" placeholder="Select State" @change="" @select=""></multi-select>
                        </div>
                    </div>
                    <div class="chart-stage col-md-12">
                        <!-- <img v-holder="'img=100px240?auto=yes'"> -->
                        <div ref="line1MS" style="width:100%;"></div>
                        <!-- <div ref="line2MS" class="pull-right" style="width:100%;"></div> -->
                    </div>
                    <div class="chart-notes">
                        <h4>
                            <b>Multiple State Chart: Reporting rate: state average vs increment</b>
                        </h4>
                    </div>
                </div>
            </div>
            </div>
        </slide>
        <slide :index="4">            
            <div class="row">
                <div class="col-md-12">
                <div class="chart-wrapper">
                    <div class="chart-title col-md-12">
                        <div class="col-md-4">
                            <multi-select v-model="selectedMonthMS" :options="optionsMonth" :hide-selected="true" :searchable="true" :allow-empty="false" placeholder="Select Month" @change="" @select=""></multi-select>
                        </div>
                        <div class="col-md-8">
                            <multi-select :multiple="true" v-model="selectedStatesMS" :options="optionsState" :hide-selected="true" :searchable="true" :allow-empty="true" placeholder="Select State" @change="" @select=""></multi-select>
                        </div>
                    </div>
                    <div class="chart-stage col-md-12">
                        <!-- <img v-holder="'img=100px240?auto=yes'"> -->
                        <div ref="line2MS" style="width:100%;"></div>
                        <!-- <div ref="line2MS" class="pull-right" style="width:100%;"></div> -->
                    </div>
                    <div class="chart-notes">
                        <h4><b>Multiple State Chart: Reporting rate: state comparison</b></h4>
                    </div>
                </div>
            </div>
            </div>
        </slide>
        
        <slide :index="5">            
            <div class="row">
                <div class="col-md-12">
                <div class="chart-wrapper">
                    <div class="chart-title col-md-12">
                        <div class="col-md-8">
                            <multi-select :multiple="true" v-model="selectedMonthMM" :options="optionsMonth" :hide-selected="true" :searchable="true" :allow-empty="true" placeholder="Select Month" @change="" @select=""></multi-select>
                        </div>
                        <div class="col-md-4">
                            <multi-select  v-model="selectedStateMM" :options="optionsState" :hide-selected="true" :searchable="true" :allow-empty="false" placeholder="Select State" @change="" @select=""></multi-select>
                        </div>
                    </div>
                    <div class="chart-stage col-md-12">
                        <!-- <img v-holder="'img=100px240?auto=yes'"> -->
                        <div ref="lineMM" style="width:100%;"></div>
                        <!-- <div ref="line2MS" class="pull-right" style="width:100%;"></div> -->
                    </div>
                    <div class="chart-notes">
                        <h4><b>Multiple Month Chart: Reporting rate: state comparison</b></h4>
                    </div>
                </div>
            </div>
            </div>
        </slide>

        <slide :index="6">            
            <div class="row">
                <div class="col-md-12">
                <div class="chart-wrapper">
                    <div class="chart-title col-md-12">
                        <div class="col-md-8">
                            <multi-select :multiple="true" v-model="selectedMonthMM" :options="optionsMonth" :hide-selected="true" :searchable="true" :allow-empty="true" placeholder="Select Month" @change="" @select=""></multi-select>
                        </div>
                        <div class="col-md-4">
                            <multi-select  v-model="selectedStateMM" :options="optionsState" :hide-selected="true" :searchable="true" :allow-empty="false" placeholder="Select State" @change="" @select=""></multi-select>
                        </div>
                    </div>
                    <div class="chart-stage col-md-12">
                        <!-- <img v-holder="'img=100px240?auto=yes'"> -->
                        <div ref="line2MM" style="width:100%;"></div>
                        <!-- <div ref="line2MS" class="pull-right" style="width:100%;"></div> -->
                    </div>
                    <div class="chart-notes">
                        <h4><b>Multiple Month Chart: Reporting rate: state comparison</b></h4>
                    </div>
                </div>
            </div>
            </div>
        </slide>

        <slide :index="7">            
            <div class="row">
                <div class="col-md-12">
                <div class="chart-wrapper">
                    <div class="chart-title col-md-12">
                        <div class="col-md-4">
                            <multi-select v-model="selectedMonthAS" :options="optionsMonth" :hide-selected="true" :searchable="true" :allow-empty="true" placeholder="Select Month" @change="" @select=""></multi-select>
                        </div>
                        <div class="col-md-8">
                            <span style="color: red; margin-left: 50px;"><b>Slide the ball to see reporting rate across states over a period</b></span>
                            <vue-slider ref="slider" v-model="value" v-bind="options"></vue-slider>               
                        </div>
                    </div>
                    <div class="chart-stage col-md-12">
                        <!-- <img v-holder="'img=100px240?auto=yes'"> -->
                        <div ref="lineAS" style="width:100%;"></div>
                        <!-- <div ref="line2MS" class="pull-right" style="width:100%;"></div> -->
                    </div>
                    <div class="chart-notes">
                        <h4><b>Across States Chart: Reporting rate: state comparison</b></h4>
                    </div>
                </div>
            </div>
            </div>
        </slide>

        <!-- <slide v-for="(slide, i) in slides" :index="i" :key="i">
            <img src="https://placehold.it/360x270">
        </slide> -->
    </carousel-3d>
    </fullscreen>
    <div class="text-xs-center pull-right" @click="toggle()">
        <v-btn dark color="primary">Go Fullscreen</v-btn>
    </div>
  </div>
</template>

<script>

import Plotly from 'plotly.js/dist/plotly'  
import Fullscreen from "vue-fullscreen/src/component.vue"
import MultiSelect from 'vue-multiselect'
import vueSlider from 'vue-slider-component';

import firebase from 'firebase'
// Initialize Firebase
var config = {
    apiKey: "AIzaSyC60wp9rOUPsrUQuwGg0kZxUeBA3WsOdug",
    authDomain: "dhis2-daily-reporting.firebaseapp.com",
    databaseURL: "https://dhis2-daily-reporting.firebaseio.com",
    projectId: "dhis2-daily-reporting",
    storageBucket: "dhis2-daily-reporting.appspot.com",
    messagingSenderId: "949249577982"
};

var firebaseApp = firebase.initializeApp(config, 'appHome')
var db = firebaseApp.database()

import { Carousel3d, Slide } from 'vue-carousel-3d';

export default {
  components: {Fullscreen, Carousel3d, Slide, MultiSelect, vueSlider},
  data() {
      return {
        page: 1,
        color:"#c0ff00",
        date: new Date(),
        fullscreen: false,
        selectedStatesMS: [],
        selectedStateMM: null,
        optionsState: ["Abia", "Adamawa", "Akwa-ibom", "Anambra", "Bauchi", "Benue", "Borno", "Bayelsa",
                "Cross River", "Delta", "Ebonyi", "Edo", "Ekiti", "Enugu", "Federal capital territory", "Federal gov", "Gombe", "Imo",
                "Jigawa", "Kaduna", "Kebbi", "Kano", "Katsina", "Kogi",  "Kwara", "Lagos", "Nasarawa",
                "Niger", "Ogun", "Ondo", "Osun", "Oyo", "Plateau", "Rivers", "Sokoto", "Taraba", "Yobe",
                "Zamfara"],
        selectedMonthMS: null,
        selectedMonthMM: [],        
        optionsMonth: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
        apiUrl:
    "https://dhis2-daily-reporting.firebaseio.com/masterSheet.json",

        x: [],
        y: [],
        data: [],
        data2: [],
        layout: {
            title: 'Day Line Chart',
            yaxis: {title: 'Frequency', mirror: 'allticks', ticks: 'inside'},
            showlegend: true,
            autosize: true
        },
        layout2: {
            title: 'Day Bar chart',
            yaxis: {title: 'Frequency', mirror: 'allticks', ticks: 'inside'},
            showlegend: true,
            autosize: true
        },
        layout3: {
            title: 'Increment chart',
            yaxis: {title: 'Frequency', mirror: 'allticks', ticks: 'inside'},
            showlegend: true,
            autosize: true
        },        
        lsData: JSON.parse(this.$ls.get('DDRR_data')),

        xMS: [],
        yMS: {},
        tracesMS: {},
        dataMS: [],
        data2MS: [],
        traces2MS: {avg: {
          x:'',
          y:'',
          type: 'line',
          name: 'reporting rate'
        }, incr: {
          x:'',
          y:'',
          type: 'line',
          name: 'increment'
        }},
        layoutMS: {
          // title: '',
          showlegend: true,
          autosize: true
        },
        selectedMonthDataIndexMS: [],
        randomStateIndexMS: Math.floor(Math.random() * 37),
        xMM: [ 'D1', 'D2', 'D3', 'D4', 'D5', 'D6', 'D7', 'D8', 'D9', 'D10', 'D11', 'D12', 'D13', 'D14',
                  'D15', 'D16', 'D17', 'D18', 'D19', 'D20', 'D21', 'D22', 'D23', 'D24', 'D25', 'D26', 'D27',
                  'D28', 'D29', 'D30', 'D31' ],
        yMM: {},
        tracesMM: {},
        dataMM: [],
        data2MM: [],
        traces2MM: {},
        layoutMM: {
          title: '',
          showlegend: true,
          autosize: true
        },
        selectedMonthsDataIndicesMM: {},
        randomStateIndexMM: Math.floor(Math.random() * 36),
        // across states
        selectedMonthAS: null,
        selectedDayAS: null,        
        xAS: ["Abia", "Adamawa", "Akwa-ibom", "Anambra", "Bauchi", "Benue", "Borno", "Bayelsa",
                "Cross River", "Delta", "Ebonyi", "Edo", "Ekiti", "Enugu", "Federal capital territory", "Federal gov", "Gombe", "Imo",
                "Jigawa", "Kaduna", "Kebbi", "Kano", "Katsina", "Kogi",  "Kwara", "Lagos", "Nasarawa",
                "Niger", "Ogun", "Ondo", "Osun", "Oyo", "Plateau", "Rivers", "Sokoto", "Taraba", "Yobe",
                "Zamfara"],
        yAS: {},
        tracesAS: {},
        dataAS: [],
        layoutAS: {
          title: 'DRRR Day Line Chart',
          showlegend: true, autosize: true
        },
        selectedMonthDataIndexAS: [],
        selectedMonthDatesAS: [],
        value: [1, 1],
        options: {
          width: "90%",
          style: {
              "marginLeft": "3%"
          },
          bgStyle: {
            "backgroundColor": "#fff",
            "boxShadow": "inset 0.5px 0.5px 3px 1px rgba(0,0,0,.36)"
          },
          piecewiseStyle: {
              "backgroundColor": "#ccc",
              "visibility": "visible",
              "width": "10px",
              "height": "10px"
          },
          piecewiseActiveStyle: {
              "backgroundColor": "#3498db"
          },
            labelStyle: {
              "height": "5px",
              "color": "#3498db"
          },
          labelActiveStyle: {
              "color": "#3498db"
          },
          height: 9,
          dotSize: 20,
          min: 1,
          max: 1,
          interval: 1,
          disabled: false,
          show: true,
          tooltip: "always",
          piecewise: true,
        },
      }
  },
  firebase: {
      items: db.ref(),
      appData: db.ref()
    },
    methods: {
        // toggle full screen
        toggle () {
            this.$refs['fullscreen'].toggle()
        },
        enter(){
            return true
        },
        callPlotMethodsMS(){
           
            // multiple state charts
            this.computeChartDataMS();
            this.renderChartMS(); // render the chart to screen
        },
        callPlotMethodsMM(){
            // multiple month charts
            this.computeChartDataMM();
            this.renderChartMM(); // render the chart to screen 
        },
        checkLocalData(){

            // if (window.navigator.onLine) {
    	    //     console.log("ONLINE", window.navigator)
	        // } else {
        	//     console.log("OFFLINE")
            // }            
            var that = this;
            // initialize current month to this month
            if(!this.selectedMonthMS){
                this.selectedMonthMS = this.optionsMonth[(new Date).getMonth()]; // get the current month at init.
            } 
            if(this.selectedMonthMM.length === 0){
                this.selectedMonthMM.push(this.optionsMonth[(new Date).getMonth()]); // get the current month at init.
            }
            if(!this.selectedMonthAS){
                this.selectedMonthAS = this.optionsMonth[(new Date).getMonth()]; // get the current month at init.
            }

            if (this.lsData){
                this.selectedDay = this.lsData[this.lsData.length - 1][0].substr(8,2); // get the current day in number at init.
                this.options.max = parseInt(this.selectedDay);        
                this.value = [1, this.options.max];
            }

            // this.axios.get(this.apiUrl).then(response => {
            //   if (!this.lsData || response.data.length > this.lsData.length){
            //     that.lsData = response.data;
            //     that.$ls.set('DDRR_data', JSON.stringify(that.lsData)); 
            //   }
            //   this.populateChart();
            //   this.computeChartDataMS();
            //   this.renderChartMS();  // render the chart to screen              
            // });

            if(!this.lsData){
                this.axios.get(this.apiUrl).then(response => {
                    this.lsData = response.data;
                    this.$ls.set('DDRR_data', JSON.stringify(this.lsData)); 
                    this.populateChart();
                    this.callPlotMethodsMS();
                    this.callPlotMethodsMM();   
                    this.populateChartAS();            
                });
            }else{
                this.populateChart();
                this.callPlotMethodsMS();
                this.callPlotMethodsMM();
                this.populateChartAS(); 
            }
          
      },

      populateChart() {
          // Fetch Labels for Chart

          var stateName;
          for (var i = 5; i < this.lsData[0].length; i++) {
            stateName = this.lsData[0][i].replace(this.lsData[0][i].slice(-6), '');
            this.x.push(stateName);
          }
        //   for (var j = 5; j < this.lsData[0].length; j++) {
        //       this.x.push(this.lsData[0][j]);
        //   }
          for (var i = 5; i < this.lsData[0].length; i++) {
              this.y.push(this.lsData[this.lsData.length-1][i]);
          }       
          var day = this.lsData[this.lsData.length-1][0];
          day = new Date(day);
          day = day.toString().substr(4, 6);

          var trace = {
          x: this.x,
          y: this.y,          
          type: 'scatter',
          name: '('+ day+')',
          mode: 'lines + markers',
          marker: {
            color: 'blue',
            symbol: 'x-dot',
            size: 10,
            x: 3,
            gradient: 'vertical'
          },
          line: { width: 3, shape: 'linear', dash: 'solid'},
          fill: 'tozeroy',
          textfont: ["Droid Serif", "Arial", "Balto", "Courier New", "Droid Sans", "Droid Sans Mono", "Gravitas One", "Old Standard TT", "Open Sans", "Overpass", "PT Sans Narrow", "Raleway", "Times New Roman"]
        }
        this.data.push(trace);

        // trace for increment
        var trace2 = {
          x: this.x,
          y: this.y,
          
          type: 'scatter',
          name: '('+ day+')',
          mode: 'lines + markers',
          marker: {
            color: 'blue',
            symbol: 'x-dot',
            size: 10,
            x: 3,
            gradient: 'vertical'
          },
          line: { width: 3, shape: 'linear', dash: 'solid'},
          textfont: ["Droid Serif", "Arial", "Balto", "Courier New", "Droid Sans", "Droid Sans Mono", "Gravitas One", "Old Standard TT", "Open Sans", "Overpass", "PT Sans Narrow", "Raleway", "Times New Roman"]
        }

        var incr = [];
        var that = this;
        incr = this.y.map(function(value, i){
            if (i>0){
                return value - that.y[i-1];
            }else{
                return 0;
            }
        })
        trace2.y = incr;

        this.data2.push(trace2);
        this.renderChart();  // render the chart to screen
      },
      
      computeChartDataMS(){

        var that = this;
        var rowLength = this.lsData[0].length;

        var states = [];
        for (var i = 5; i < rowLength; i++) {
          states.push(this.lsData[0][i].replace(this.lsData[0][i].slice(-6), '')); // remove the 'state' at the end of the data
        }
    
        this.dataMS = [];
        this.tracesMS = {};
        this.data2MS = [];
        this.traces2MS = {};
        this.xMS = [];
        this.yMS = [];
        var traceName;

        this.getPeriodMS(); // get all the period data per month
        
        // |||||||||||||||||||||||||||||||||||||||||||||||||
        // compute the second chart... on the right       ||
        // |||||||||||||||||||||||||||||||||||||||||||||||||
        
        if (this.selectedStatesMS.length === 0){
          traceName = states[this.randomStateIndexMS];
          that.yMS[traceName] = [];
          that.getStateDataMS(this.randomStateIndexMS+5, traceName);          
          that.tracesMS[traceName] = that.computeAxisDataMS(traceName);
          this.dataMS.push(this.tracesMS[traceName]);            
        }else{
          this.selectedStatesMS.forEach(function(i){
            states.forEach(function(j, ix){
              // check to see that selected state's name is in state: e.g. Abia ~~ ab abia state.
              if (j.toLowerCase().includes(i.toLowerCase())){
                traceName = j;
                that.yMS[traceName] = [];
                that.getStateDataMS(ix+5, traceName);          
                that.tracesMS[traceName] = that.computeAxisDataMS(traceName);
                that.dataMS.push(that.tracesMS[traceName]);
              }
            })
          });
        }
        // |||||||||||||||||||||||||||||||||||||||||||||||||
        // ||||||compute the first chart...on the left    ||
        // |||||||||||||||||||||||||||||||||||||||||||||||||

        // compute the average line element for the first chart...
        var selectedStatesIndex = [];
        states.filter(function(elem, index, array){
          var inc = false;
          // remember that no state is selected in the beginning
          that.selectedStatesMS.forEach(function(i){
            if (elem.toLowerCase().includes(i.toLowerCase())){
              inc = true;
              selectedStatesIndex.push(elem); 
            }
          })
          return inc;
        })
           
        var temp = []; // initialized to store cumulative values

        for (var i=0; i<this.selectedMonthDataIndexMS.length; i++){
          temp.push(0);
        }
        
        selectedStatesIndex.map(function(value, i){
          that.yMS[value].map(function(val, j){                
            temp[j] += val;
          })
        })
        // temp now has the sum at each point
        // |||||||||||||||||||||||||||||||||||||||||||||
        // compute avg sum of the selected months data||
        // |||||||||||||||||||||||||||||||||||||||||||||
        temp = temp.map(function(value, i){
          return selectedStatesIndex.length === 0? 0: (value / selectedStatesIndex.length);
        })
        if (this.selectedStatesMS.length === 0){// on mount
          this.traces2MS['avg'] = Object.assign({}, this.dataMS[0]);
          this.traces2MS['avg'].name = 'reporting rate';
          this.data2MS.push(this.traces2MS['avg']);
        }else{ // on watch
          this.traces2MS['avg'] = {
            x: this.xMS,
            y: temp,
            type: 'line',
            name: 'reporting rate'
          } 
          this.data2MS.push(this.traces2MS['avg']);
        }
        // |||||||||||||||||||||||||||||||||||||||||||||||||||||||||
        // compute increment line element for the selected months //
        // |||||||||||||||||||||||||||||||||||||||||||||||||||||||||

        this.traces2MS['incr'] = {
          x: this.xMS,
          y: '',
          type: 'line',
          name: 'increment'
        };

        if (this.selectedStatesMS.length === 0){// on mount
          var initStatesValues = Object.assign({}, this.dataMS[0]).y;
          this.traces2MS['incr'].y = initStatesValues.map(function(value, i){
            if (i>0){              
              return value-initStatesValues[i-1];
            }else{
              return 0;
            }
          })
          this.data2MS.push(this.traces2MS['incr']);
        
        }else{
          var incr = temp.map(function(value, i){
            if (i>0){
              return value-temp[i-1];
            }else{
              return 0;
            }
          })
          this.traces2MS['incr'].y = incr;
          this.data2MS.push(this.traces2MS['incr']);
        }
    
      },
      getPeriodMS() {
        
        var that = this; // make new reference.
        this.xMS = [];
        // Get data for the chosen month
        if (!this.selectedMonthMS){
          this.selectedMonthMS = this.optionsMonth[(new Date).getMonth()]; // get the current month at init.
        }
        //var selectedMonth = this.optionsMonth[(new Date).getMonth()]; // get the current month at init.
        var selectedMonthDataIndexMS = [];
        var selectedMonthData = this.lsData.filter(function(elem, index, array) {

              var elemNew = new Date(elem[0]);
              if (elemNew.toString().substr(4,3) === that.selectedMonthMS.substr(0,3)){
                selectedMonthDataIndexMS.push(index);
                return true;
              }
              return false; // elemNew.toString().substr(4,3) === selectedMonth.substr(0,3);
          }
        );
        this.selectedMonthDataIndexMS = selectedMonthDataIndexMS; // the index in response.data where x and y are to occurs
        
        selectedMonthData.map(function(value, i){
          let labelAsMonth = new Date(value[0]);
          labelAsMonth = labelAsMonth.toString().substr(4, 6);
          that.xMS.push(labelAsMonth);
        })
        // console.log(this.x);
      },
      getStateDataMS(stateIndex, stateName) {
      
        // Fetch data values for state
        var data = this.lsData;
        var that = this;        
        // this.selectedMonthDataIndexMS.length: id/SN of the data period in the database.
        this.yMS[stateName] = this.selectedMonthDataIndexMS.map(function(value, index){
          return data[that.selectedMonthDataIndexMS[index]][stateIndex];
        })
      },
      computeAxisDataMS(traceName){
        const x = [];
        this.xMS.map(function(value, i) {
            x.push(value);
        });
        const y = [];
        this.yMS[traceName].map(function(value, i) {
            y.push(value);
        });        
        var trace = {
          x: x,
          y: y,
          type: 'line',
          name: traceName
        }
        return trace;
      },
      storeStructuredDataToFirebase() {
        //FIX THIS: Forward structured data to firebase
        // this.axios.post("https://central-analytics-dashboard.firebaseio.com/modifiedSheet.json",
        //     this.chartData)
        //   .then(response => {
        //     console.log(response);
        //   });
        this.$firebaseRefs.items.push({
          datasets: this.data
        });
        this.$firebaseRefs.items.push({
          datasets: this.data2
        });
        this.$firebaseRefs.items.push({
          datasets: this.dataMS
        });
        this.$firebaseRefs.items.push({
          datasets: this.data2MS
        });
        this.$firebaseRefs.appData.push({
          appData: this.lsData
        })
      },
    
      renderChartMS() {
        
        // this.storeStructuredDataToFirebase();
        // plot first chart
        Plotly.newPlot(this.$refs.line1MS, this.data2MS, this.layoutMS, {
          scrollZoom: false
        });
        // plot second chart
        Plotly.newPlot(this.$refs.line2MS, this.dataMS, this.layoutMS, {
          scrollZoom: false
        });
      },
       renderChart() {
    
        Plotly.newPlot(this.$refs.line, this.data, this.layout, {
        scrollZoom: false
        });
        
        var datx = []
        var dat = Object.assign({}, this.data[0]);
        dat.type = 'bar';
        datx.push(dat);

        Plotly.newPlot(this.$refs.bar, datx, this.layout2, {
        scrollZoom: false
        });

        Plotly.newPlot(this.$refs.incr, this.data2, this.layout3, {
        scrollZoom: false
        });
      },

      // ||||||||||||||||||||||||||||||||||||||||||||||||
      // ||compute the chart data for multiple months. ||
      // ||||||||||||||||||||||||||||||||||||||||||||||||
      computeChartDataMM(){

        // init major variables
        var that = this;
        var rowLength = this.lsData[0].length;
        this.dataMM = [];
        this.data2MM = [];
        this.tracesMM = {};
        this.traces2MM = {};
        this.yMM = [];        

        this.getPeriodsMM(); // get all the period data by month as is in db       
        
        var states = []; // array of states to use as state obj. 
        for (var i = 5; i < this.lsData[0].length; i++){
          states.push(this.lsData[0][i]);  // so we don't change data elements based on reference
        }

        var indexOfState;
        var localSelectedState

        // go to method this.getPeriods to see how this.selectedMonthsDataIndices is gotten
        for (var month in this.selectedMonthsDataIndicesMM) {
          if (this.selectedMonthsDataIndicesMM.hasOwnProperty(month)) {
            this.yMM[month] = []; // initialize the dataset for each month
            
            if(!this.selectedStateMM){ // no state has been chosen; except randomly selected state
              localSelectedState = states[this.randomStateIndexMM];
              indexOfState = this.lsData[0].indexOf(localSelectedState);
            }else{ // when a state has been chosen;
              localSelectedState = states.filter(function(elem, index, array){
                  return elem.includes(that.selectedStateMM.toLowerCase()); // get the local state in reference
              })
              indexOfState = this.lsData[0].indexOf(localSelectedState[0]); // get the index of the local state
            }
            this.getStateDataMM(month, indexOfState); // get the data/frequency for the state
          }
        }     
        
        var traceName;
        this.selectedMonthMM.map(function(value, index){
          traceName = value;
          that.tracesMM[traceName] = that.computeAxisDataMM(traceName); // trace: compute the x-axis and y-axis data for each state and period.
          that.dataMM.push(that.tracesMM[traceName]);        
        }) 

        // |||||||||||||||||||||||||||||||||||||||
        // |||Compute Left Chart ...increment ||||
        // |||||||||||||||||||||||||||||||||||||||   
        
        for (var trace in this.tracesMM){
          if (this.tracesMM.hasOwnProperty(trace)){
              this.traces2MM[trace] = Object.assign({}, this.tracesMM[trace]); // clone/deep-copy array
              this.traces2MM[trace].y = this.tracesMM[trace].y.map(function(value, i){
              if (i > 0){
                return value - that.tracesMM[trace].y[i-1];
              }
              else{
                return 0;
              }
            })
            this.data2MM.push(this.traces2MM[trace]);
          }
        }

      },

      getPeriodsMM() {

        var that = this; // make new reference.
        // Get data for the chosen month
        if (this.selectedMonthMM.length === 0){
          this.selectedMonthMM.push(this.optionsMonth[(new Date).getMonth()]); // get the current month at init.
        }

        var selectedMonthsDataIndices = {}; // to get the months and the db id./SN of the month's dates
        // console.log(selectedMonthsDataIndices) to see what it gives

        this.selectedMonthMM.filter(function(elem, index, array){
          selectedMonthsDataIndices[elem] = [];
          that.lsData.filter(function(elem2, index2, array2 ){
            var elem2New = new Date(elem2[0]);
            if (elem2New.toString().substr(4,3) === elem.substr(0,3)){
              selectedMonthsDataIndices[elem].push(index2);
              return true;
            }
            return false;
          })
        });

         // the index in response.data where x and y are to occurs
        this.selectedMonthsDataIndicesMM = selectedMonthsDataIndices;
      },

      getStateDataMM(month, stateIndex) {
      
        var that = this;
        this.selectedMonthsDataIndicesMM[month].map(function(elem, index){
          that.yMM[month].push(that.lsData[elem][stateIndex]);
        })
      },

      computeAxisDataMM(traceName){

        const y = [];
        
        this.yMM[traceName].map(function(value, i) {
            y.push(value);
        });

        var trace = {
          x: this.xMM,
          y: y,
          type: 'line',
          name: traceName,
          mode: 'lines + markers',
          marker: {
            symbol: 'x-dot',
            x: 2,
          },
          line: { width: 3, shape: 'linear', dash: 'solid'},
          textfont: ["Droid Serif", "Arial", "Balto", "Courier New", "Droid Sans", "Droid Sans Mono", "Gravitas One", "Old Standard TT", "Open Sans", "Overpass", "PT Sans Narrow", "Raleway", "Times New Roman"]
        
        }
        return trace;
      },
      renderChartMM() {
        // this.storeStructuredDataToFirebase() 
        Plotly.newPlot(this.$refs.lineMM, this.data2MM, this.layoutMM, {
          scrollZoom: false
        });
        Plotly.newPlot(this.$refs.line2MM, this.dataMM, this.layoutMM, {
          scrollZoom: false
        });
      },

      // ||||||||||||||||||||||||||||||||||||||||||||||||||||||||
      // ||||||Across States Chart ||||||||||||||||||||||||||||||
      // ||||||||||||||||||||||||||||||||||||||||||||||||||||||||
      populateChartAS() {
          // Fetch Labels for Chart
          this.yAS = [];
          this.dataAS = [];
          this.tracesAS = {};
          this.getPeriodAS(); // get all the period data in month.
          var that = this;   

          this.options.min = parseInt(this.selectedMonthDatesAS[0]);
          this.options.max = parseInt(this.selectedMonthDatesAS[this.selectedMonthDatesAS.length - 1]);

          if (this.value[1] < this.options.min){
            this.value[1] = this.options.min;
          }
                    
          var trace;
          for (var i = 0; i < this.selectedMonthDataIndexAS.length; i++) {
              trace = this.selectedMonthAS + parseInt(this.selectedMonthDatesAS[i]) // (i+1);
              this.yAS[trace] = [];
              this.getStateDataAS(i);
              this.tracesAS[trace] = {};
              this.tracesAS[trace] = this.computeAxisDataAS(i, trace); // compute the x-axis and y-axis data for each state and period.
          }

          //|||||||||||||||||||||||||||||||||||||||||
          //|||||||Compute reporting rate||||||||||||
          //|||||||||||||||||||||||||||||||||||||||||

          trace = this.selectedMonthAS + this.value[1];
          this.dataAS.push(this.tracesAS[trace]);          

          //|||||||||||||||||||||||||||||||||||||||||
          //|||||||Compute increment|||||||||||||||||
          //|||||||||||||||||||||||||||||||||||||||||
          var maxDayInRange = this.value[1];
          var dayBeforeMinDayInRange;
          
          if (this.value[0] > 1){
            if ((this.value[0] - 1) < this.selectedMonthDatesAS[0]){
              dayBeforeMinDayInRange = parseInt(this.options.min);
            }else{
              dayBeforeMinDayInRange = this.value[0] - 1;
            }            
          }else{
            if (this.value[0] < this.selectedMonthDatesAS[0]){
              dayBeforeMinDayInRange =  parseInt(this.options.min);
            }else{
              dayBeforeMinDayInRange =  this.value[0];
            }
          }
           
          var traceNameMDIR = this.selectedMonthAS + maxDayInRange; // traceName for maxDayInRange
          var traceNameDBMDIR = this.selectedMonthAS + dayBeforeMinDayInRange; // traceName for dayBeforeMinDayInRange
          
          var traceMDIR = this.tracesAS[traceNameMDIR];
          var traceDBMDIR = this.tracesAS[traceNameDBMDIR];
          
          var traceIncrYVal = []
          var diff;
          for (var i=0; i<traceDBMDIR.y.length; i++){
            traceIncrYVal.push(0)
            diff = traceMDIR.y[i] - traceDBMDIR.y[i];
            traceIncrYVal[i] =  diff;           
          }
      
          var traceIncr = {
            x: this.xAS,
            y: traceIncrYVal,
            type: 'bar',
            name: 'increment',
            textfont: ["Droid Serif", "Arial", "Courier New", "Overpass", "Times New Roman"]
          
          }
          this.dataAS.push(traceIncr);
          this.renderChartAS();  // render the chart to screen

      },
      getPeriodAS() {
        
        var that = this; // make new reference.
        // Get data for the chosen month
        if (!this.selectedMonthAS){
          this.selectedMonthAS = this.optionsMonth[(new Date).getMonth()]; // get the current month at init.
        }        
        //var selectedMonth = this.optionsMonth[(new Date).getMonth()]; // get the current month at init.
        var selectedMonthDataIndex = [];
        var selectedMonthDates = [];
        var selectedMonthData = this.lsData.filter(function(elem, index, array) {
            if (index === 0){
              return false;
            }
            var elemNew = new Date(elem[0]);            
            if (elemNew.toString().substr(4,3) === that.selectedMonthAS.substr(0,3)){
              selectedMonthDataIndex.push(index);
              selectedMonthDates.push(elemNew.toString().substr(8,2));
              return true;
            }
            return false; // elemNew.toString().substr(4,3) === selectedMonth.substr(0,3);
          }
        );
        // remember to declare selectedMonthDataIndex in data life-cycle.
        this.selectedMonthDataIndexAS = selectedMonthDataIndex; // the index in response.data where x and y are to occurs
        this.selectedMonthDatesAS = selectedMonthDates;
    },
      getStateDataAS(monthDayIndex) {
        // Fetch data values for state
        var monthIndex = this.selectedMonthDataIndexAS[monthDayIndex];
        var yVal = this.selectedMonthAS + parseInt(this.selectedMonthDatesAS[monthDayIndex]);//  (monthDayIndex+1);
        for (var j = 5; j < this.lsData[0].length; j++) {
          this.yAS[yVal].push(this.lsData[monthIndex][j]);
        }
      },
      computeAxisDataAS(index, traceName){
        
        const y = [];
        this.yAS[traceName].map(function(value, i) {
            y.push(value);
        });
        
        var trace = {
          x: this.xAS,
          y: y,
          type: 'bar',
          name: 'reporting rate',
          textfont: ["Droid Serif", "Arial", "Courier New", "Gravitas One", "Old Standard TT", "Open Sans", "Overpass", "PT Sans Narrow", "Raleway", "Times New Roman"]
        
        }
        return trace;
      },
      
      isMonthEmptyAS(){
        this.getPeriodAS();
        if(this.selectedMonthDataIndexAS.length === 0){
          var trace = {
            x: [],
            y: [],
            type: 'bar',
            name: 'reporting rate',
            textfont: ["Droid Serif", "Arial", "Courier New", "Gravitas One", "Old Standard TT", "Open Sans", "Overpass", "PT Sans Narrow", "Raleway", "Times New Roman"]
           }
           this.dataAS = [];
           this.dataAS.push(trace);
           this.renderChartAS();
          return true;
        }
        return false;
      },
      renderChartAS() {
        // this.storeStructuredDataToFirebase()
        Plotly.newPlot(this.$refs.lineAS, this.dataAS, this.layoutAS, {
          scrollZoom: false
        });
      },
      updatePaginate(e){
          this.page = e+1;
      },
      updateSlide(e){
          this.$refs.mycarousel.goSlide(this.page-1);
      }

    },
    created(){
        this.axios.get(this.apiUrl).then(response => {
            if (this.lsData){
                if (this.lsData.length < response.data.length){
                    this.lsData = response.data;
                    this.$ls.set('DDRR_data', JSON.stringify(this.lsData));
                }
            }else{
                this.lsData = response.data;
                this.$ls.set('DDRR_data', JSON.stringify(this.lsData));
            }
         
       }) 
    },
    mounted(){
        this.checkLocalData()
    },
    beforeUpdate(){

    },
    updated(){
        
        Plotly.relayout(this.$refs.line, {
            'xaxis.autorange': true,
            'yaxis.autorange': true
        });
        Plotly.relayout(this.$refs.bar, {
            'xaxis.autorange': true,
            'yaxis.autorange': true
        });
        Plotly.relayout(this.$refs.incr, {
            'xaxis.autorange': true,
            'yaxis.autorange': true
        });

        Plotly.relayout(this.$refs.line1MS, {
            'xaxis.autorange': true,
            'yaxis.autorange': true
        });
        Plotly.relayout(this.$refs.line2MS, {
            'xaxis.autorange': true,
            'yaxis.autorange': true
        });

        Plotly.relayout(this.$refs.lineMM, {
            'xaxis.autorange': true,
            'yaxis.autorange': true
        });
        Plotly.relayout(this.$refs.line2MM, {
            'xaxis.autorange': true,
            'yaxis.autorange': true
        });
        Plotly.relayout(this.$refs.lineAS, {
            'xaxis.autorange': true,
            'yaxis.autorange': true
        });
    },
    computed: {
        
    },
    watch: {

        lsData: function(val){
            if (!this.lsData){
                this.axios.get(this.apiUrl).then(response => {
                    this.lsData = response.data;
                    this.$ls.set('DDRR_data', JSON.stringify(this.lsData));
                })
            }
        },
        selectedMonthMS: function(val){
            this.selectedMonthMS = val;
            
            if(!this.lsData){
            this.axios.get(this.apiUrl).then(response => {
                this.lsData = response.data;
                this.$ls.set('DDRR_data', JSON.stringify(this.lsData));
                this.callPlotMethodsMS();
            })
            }else{
            this.callPlotMethodsMS();
            }
        },
        selectedStatesMS: function(val){
            // this.lsData = JSON.parse(this.$ls.get('DDRR_data'));
            this.selectedStatesMS = val;
            this.callPlotMethodsMS();
        },
        selectedMonthMM: function(val){
          
          this.selectedMonthMM = val;
          if(!this.lsData){
            this.axios.get(this.apiUrl).then(response => {
              this.lsData = response.data;
              this.$ls.set('DDRR_data', JSON.stringify(this.lsData));
              this.callPlotMethodsMM();
            })
          }else{
            this.callPlotMethodsMM();
          }
          
        },
        selectedStateMM: function(val){
            //this.lsData = JSON.parse(this.$ls.get('DDRR_data'));
            this.selectedStateMM = val;
            this.callPlotMethodsMM();
        },
        // watch across states
        selectedMonthAS: function(val){
            if (this.lsData && !this.isMonthEmptyAS()){
                this.selectedMonthAS = val;
                this.value = [1,1];
                if(!this.lsData){
                    this.axios.get(this.apiUrl).then(response => {
                        this.lsData = response.data;
                        this.$ls.set('DDRR_data', JSON.stringify(this.lsData));
                        this.populateChartAS();
                    })
                }else{
                    this.populateChartAS();
                }
            }            
        },        
        value: function(val){
            if (!this.isMonthEmptyAS()){
                this.value = val;
                this.populateChartAS()
            }
            
        },
        // page: function(val){
        //     // console.log(this.$refs.mycarousel);
        //     this.$refs.mycarousel.goSlide(val-1);
        // }
        
    }
}
</script>

<style scoped>
  @import "../../../public/keen.io/css/keen-static.css";
  @import "../../../public/keen.io/css/keen-dashboards.css";
  @import '../../../node_modules/vue-multiselect/dist/vue-multiselect.min.css';
</style>
