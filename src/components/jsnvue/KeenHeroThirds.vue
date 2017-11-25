<template @load="toggle()">
  <div class="container-fluid">
    <fullscreen ref="fullscreen" :fullscreen.sync="fullscreen">
    <div class="row">
      <div class="col-sm-8">
        <div class="chart-wrapper">
          <div class="chart-title">
            Line Chart
          </div>
          <div class="chart-stage">                
            <div class="tile is-ancestor">
                <div class="tile is-parent is-6">
                    <article class="tile is-child box">
                    <div class="content">
                        <div ref="line" style="width:95%;"></div>
                        <!-- <chart :type="'pie'" :data="chartData"></chart> -->
                    </div>
                    </article>
                </div>
            </div>                
          </div>
          <div class="chart-notes">
            Current Reporting Rate
          </div>
        </div>
      </div>
      <div class="col-sm-4">
        <div class="chart-wrapper">
          <div class="chart-title">
            Cell Title
          </div>
          <div class="chart-stage">
            <img v-holder="'img=100px240?auto=yes'">
          </div>
          <div class="chart-notes">
            Notes about this chart
          </div>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-sm-6 col-md-4">
        <div class="chart-wrapper">
          <div class="chart-title">
            Cell Title
          </div>
          <div class="chart-stage">
            <img v-holder="'img=100px120?auto=yes'">
          </div>
          <div class="chart-notes">
            Notes about this chart
          </div>
        </div>
      </div>
      <div class="col-sm-6 col-md-4">
        <div class="chart-wrapper">
          <div class="chart-title">
            Cell Title
          </div>
          <div class="chart-stage">
            <img v-holder="'img=100px120?auto=yes'">
          </div>
          <div class="chart-notes">
            Notes about this chart
          </div>
        </div>
      </div>
      <div class="col-sm-6 col-md-4">
        <div class="chart-wrapper">
          <div class="chart-title">
            Cell Title
          </div>
          <div class="chart-stage">
            <img v-holder="'img=100px120?auto=yes'">
          </div>
          <div class="chart-notes">
            Notes about this chart
          </div>
        </div>
      </div>
    </div>
    </fullscreen>
    <button type="button" class="btn btn-primary pull-right" @click="toggle()" >Go Fullscreen</button>
  </div>
</template>

<script>

import Plotly from 'plotly.js/dist/plotly'  
import Fullscreen from "vue-fullscreen/src/component.vue"


export default {
  components: {Fullscreen},
  data() {
      return {
          holder: {
            img: '200x200',
            auto: 'yes',
            theme: 'white',
            background:"#fff", 
            foreground:"#a7a7a7", 
            size:10
        },
        fullscreen: false,
            apiUrl:
        "https://dhis2-daily-reporting.firebaseio.com/masterSheet.json",
            x: [],
            y: [],
            data: [],
            layout: {
                title: 'Day Line Chart',
                showlegend: true
            },
            lsData: JSON.parse(this.$ls.get('DRRR_data'))
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
            if(!this.lsData){
                this.axios.get(this.apiUrl).then(response => {
                    this.lsData = response.data;
                    this.$ls.set('DRRR_data', JSON.stringify(this.lsData));            
                });
            }
            this.populateChart();
      },
      populateChart() {
          // Fetch Labels for Chart

          for (var i = 5; i < this.lsData[0].length; i++) {
            this.lsData[0][i] = this.lsData[0][i].replace(this.lsData[0][i].slice(-6), '');
          }
          for (var j = 5; j < this.lsData[0].length; j++) {
              this.x.push(this.lsData[0][j]);
          }
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
        this.renderChart();  // render the chart to screen
      },
      storeStructuredDataToFirebase() {
        //FIX THIS: Forward structured data to firebase
        this.axios.post("https://central-analytics-dashboard.firebaseio.com/modifiedSheet.json",
            this.chartData)
          .then(response => {
            console.log(response);
          });
      },
      renderChart() {
             
        Plotly.plot(this.$refs.line, this.data, this.layout, {
          scrollZoom: true
        });
      },
    },
    mounted(){
        this.checkLocalData()
    },
    beforeUpdate(){
       
    //   Plotly.plot(this.$refs.line, this.data, this.layout, {
    //     scrollZoom: true
    //   });
    },
    watch: {
        lsData: function(){
            this.axios.get(this.apiUrl).then(response => {
                if(response.data[0][1].length !== this.lsData[0][1].length){
                    this.lsData =  response.data;
                    this.$ls.set('DRRR_data', JSON.stringify(this.lsData));
                    this.populateChart();
                }
            });
        },
    }
}
</script>