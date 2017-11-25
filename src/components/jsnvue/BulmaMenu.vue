<template>
  <div>
    <div class="tile is-ancestor">
      <div class="tile is-parent is-6">
        <article class="tile is-child box">
          <h4 class="title">Five</h4>
          <div class="content">
            <div ref="line" style="width:95%;"></div>
          </div>
        </article>
      </div>
      <div class="tile is-parent is-6">
        <article class="tile is-child box">
          <h4 class="title">Six</h4>
          <div class="content">
            <!-- <chart :type="'pie'" :data="chartData"></chart> -->
            <div ref="line2" style="width:95%;"></div>
          </div>
        </article>
      </div>
    </div>

    <div class="tile is-ancestor">
      <div class="tile is-vertical is-9">
        <div class="tile">
          <div class="tile is-parent">
            <article class="tile is-child box">
              <p class="title">Seven</p>
              <p class="subtitle">Subtitle</p>
              <div class="content">
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ornare magna eros, eu pellentesque tortor vestibulum ut. Maecenas non massa sem. Etiam finibus odio quis feugiat facilisis.</p>
              </div>
            </article>
          </div>
          <div class="tile is-8 is-parent">
            <article class="tile is-child box">
              <p class="title">Eight</p>
              <p class="subtitle">Subtitle</p>
              <div class="content">
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ornare magna eros, eu pellentesque tortor vestibulum ut. Maecenas non massa sem. Etiam finibus odio quis feugiat facilisis.</p>
              </div>
            </article>
          </div>
        </div>
      </div>
      <div class="tile is-parent">
        <article class="tile is-child box">
          <div class="content">
            <p class="title">Eleven</p>
            <p class="subtitle">Subtitle</p>
            <div class="content">
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam semper diam at erat pulvinar, at pulvinar felis blandit. Vestibulum volutpat tellus diam, consequat gravida libero rhoncus ut. Morbi maximus, leo sit amet vehicula eleifend, nunc dui porta orci, quis semper odio felis ut quam.</p>
              <p>Integer sollicitudin, tortor a mattis commodo, velit urna rhoncus erat, vitae congue lectus dolor consequat libero. Donec leo ligula, maximus et pellentesque sed, gravida a metus. Cras ullamcorper a nunc ac porta. Aliquam ut aliquet lacus, quis faucibus libero. Quisque non semper leo.</p>
            </div>
          </div>
        </article>
      </div>
    </div>
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
            lsData: JSON.parse(this.$ls.get('DDRR_data'))
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
                    this.$ls.set('DDRR_data', JSON.stringify(this.lsData));            
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
       
      this.lsData =  this.$ls.get('DDRR_data');
      this.populateChart(); 
    },
    watch: {
        
    }
}
</script>

