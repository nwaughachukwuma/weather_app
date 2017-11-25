<template>
  <div class="container-fluid" id="app">

    <fullscreen ref="fullscreen" :fullscreen.sync="fullscreen">

    <carousel-3d :autoplay="true" :autoplay-timeout="5000" :width="1150" :height="600" :perspective="2" :space="370" :display="3" :controls-visible="true" :controls-prev-html="'&#10092;'" :controls-next-html="'&#10093;'" 
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
        

        <!-- <slide v-for="(slide, i) in slides" :index="i" :key="i">
            <img src="https://placehold.it/360x270">
        </slide> -->
    </carousel-3d>
    </fullscreen>
    <button type="button" class="btn btn-primary pull-right" @click="toggle()" >Go Fullscreen</button>
  </div>
</template>

<script>

import Plotly from 'plotly.js/dist/plotly'  
import Fullscreen from "vue-fullscreen/src/component.vue"
import MultiSelect from 'vue-multiselect'

import { Carousel3d, Slide } from 'vue-carousel-3d';

export default {
  components: {Fullscreen, Carousel3d, Slide, MultiSelect},
  data() {
      return {
        date: new Date(),
        fullscreen: false,
        selectedStatesMS: [],
        optionsState: ["Abia", "Adamawa", "Akwa-ibom", "Anambra", "Bauchi", "Benue", "Borno", "Bayelsa",
                "Cross River", "Delta", "Ebonyi", "Edo", "Ekiti", "Enugu", "FCT Abuja", "Gombe", "Imo",
                "Jigawa", "Kaduna", "Kebbi", "Kano", "Katsina", "Kogi",  "Kwara", "Lagos", "Nasarawa",
                "Niger", "Ogun", "Ondo", "Osun", "Oyo", "Plateau", "Rivers", "Sokoto", "Taraba", "Yobe",
                "Zamfara"],
        selectedMonthMS: null,
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
        randomStateIndexMS: Math.floor(Math.random() * 36)
      }
  },
    methods: {
        // toggle full screen
        toggle () {
            this.$refs['fullscreen'].toggle()
        },
        enter(){
            return true
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
                    that.lsData = response.data;
                    that.$ls.set('DDRR_data', JSON.stringify(that.lsData)); 
                    that.populateChart();
                    that.computeChartDataMS();
                    that.renderChartMS();  // render the chart to screen              
                });
            }else{
                this.populateChart();
                this.computeChartDataMS();
                this.renderChartMS();  // render the chart to screen
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
        this.axios.post("https://central-analytics-dashboard.firebaseio.com/modifiedSheet.json",
            this.chartData)
          .then(response => {
            console.log(response);
          });
      },
    
      renderChartMS() {
                     
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
      }
    },
    created(){
        this.axios.get(this.apiUrl).then(response => {
         if (this.lsData.length < response.data.length){
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
            this.computeChartDataMS();
            this.renderChartMS();
          })
        }else{
          this.computeChartDataMS();
          this.renderChartMS();
        }
      },
      selectedStatesMS: function(val){
        // this.lsData = JSON.parse(this.$ls.get('DDRR_data'));
        this.selectedStatesMS = val;
        this.computeChartDataMS();
        this.renderChartMS();
      }
    }
}
</script>

<style scoped>
  @import "../../../public/keen.io/css/keen-static.css";
  @import "../../../public/keen.io/css/keen-dashboards.css";
  @import '../../../node_modules/vue-multiselect/dist/vue-multiselect.min.css';
</style>
