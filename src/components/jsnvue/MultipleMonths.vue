<template>

  <div class="container-fluid" id="app">
    <fullscreen ref="fullscreen" :fullscreen.sync="fullscreen">
        <!-- <radar> </radar> -->

        <div class="tile is-ancestor">
          <!-- <radar> </radar> -->
          <div class="tile is-parent is-8">
            <article class="tile is-child box">
              <div class="content">
                <multi-select :multiple="true" v-model="selectedMonth" :options="optionsMonth" :hide-selected="true" :searchable="true" :allow-empty="true" placeholder="Select Month" @change="" @select=""></multi-select>
                <!-- <v-select v-model="selectedMonth" :options="optionsMonth" placeholder="Select Month"></v-select> -->
              </div>
            </article>
          </div>
          <div class="tile is-parent is-4">
            <article class="tile is-child box">
              <div class="content">
                <multi-select  v-model="selectedState" :options="optionsState" :hide-selected="true" :searchable="true" :allow-empty="false" placeholder="Select State" @change="" @select=""></multi-select>
                <!-- <v-select multiple v-model="selectedState" :options="optionsState" placeholder="Select State"></v-select> -->
                </div>
            </article>
          </div>
        </div>

        <div class="tile is-ancestor">
          <div class="tile is-parent is-6">
            <article class="tile is-child box">
              <label>Increments in NHMIS Reporting Rate trend for selected state (comparison for selected months)</label>
              <div class="content">
                <div ref="line2"style="width:100%;"></div>
              </div>
            </article>
          </div>
          <div class="tile is-parent is-6">
            <article class="tile is-child box">
              <label>NHMIS Reporting Rate trend for selected states (comparison for selected months)</label>
              <div class="content">
                <div ref="line"style="width:100%;"></div>
              </div>
            </article>
          </div>
        </div>
    </fullscreen>
    <button type="button" class="btn btn-primary pull-right" @click="toggle()" >Go Fullscreen</button>
  </div>
</template>


<script>
  //import './figure.js'
  import Plotly from 'plotly.js/dist/plotly'
  import Fullscreen from "vue-fullscreen/src/component.vue"
  import MultiSelect from 'vue-multiselect'
  
  export default {

    components: {Fullscreen, MultiSelect},

    data() {
      return {

        fullscreen: true,
        selectedState: null,
        optionsState: ["Abia", "Adamawa", "Akwa-ibom", "Anambra", "Bauchi", "Benue", "Borno", "Bayelsa",
                "Cross River", "Delta", "Ebonyi", "Edo", "Ekiti", "Enugu", "Federal capital territory", "Gombe", "Imo",
                "Jigawa", "Kaduna", "Kebbi", "Kano", "Katsina", "Kogi",  "Kwara", "Lagos", "Nasarawa",
                "Niger", "Ogun", "Ondo", "Osun", "Oyo", "Plateau", "Rivers", "Sokoto", "Taraba", "Yobe",
                "Zamfara"],
        selectedMonth: [],
        optionsMonth: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
        
        apiUrl:
        "https://dhis2-daily-reporting.firebaseio.com/masterSheet.json",
        
        x: [ 'D1', 'D2', 'D3', 'D4', 'D5', 'D6', 'D7', 'D8', 'D9', 'D10', 'D11', 'D12', 'D13', 'D14',
                  'D15', 'D16', 'D17', 'D18', 'D19', 'D20', 'D21', 'D22', 'D23', 'D24', 'D25', 'D26', 'D27',
                  'D28', 'D29', 'D30', 'D31' ],
        y: {},
        traces: {},
        data: [],
        data2: [],
        traces2: {},
        layout: {
          title: '',
          showlegend: true,
          autosize: true
        },
        lsData: JSON.parse(this.$ls.get('DDRR_data')),
        selectedMonthsDataIndices: {},
        randomStateIndex: Math.floor(Math.random() * 36)
      }
    },
    methods: {

      // toggle full screen
      toggle () {
        this.$refs['fullscreen'].toggle()
        // this.fullscreen = !this.fullscreen
      },
      enter(){
        return true
      },
      checkLocalData(){

        var that = this;
        // initialize current month to this month
        if(this.selectedMonth.length === 0){
          this.selectedMonth.push(this.optionsMonth[(new Date).getMonth()]); // get the current month at init.
        }
        //if this.Data is null fetch from database.
        if(!this.lsData){
            this.axios.get(this.apiUrl).then(response => {
                that.lsData = response.data;
                that.$ls.set('DDRR_data', JSON.stringify(that.lsData)); 
                this.computeChartData();
                this.renderChart();  // render the chart to screen              
            });
        }else{
          this.computeChartData();
          this.renderChart();  // render the chart to screen
        }
      },
      // ||||||||||||||||||||||||||||
      // ||compute the chart data. ||
      // ||||||||||||||||||||||||||||
      computeChartData(){

        // init major variables
        var that = this;
        var rowLength = this.lsData[0].length;
        this.data = [];
        this.data2 = [];
        this.traces = {};
        this.traces2 = {};
        this.y = [];        

        this.getPeriods(); // get all the period data by month as is in db       
        
        var states = []; // array of states to use as state obj. 
        for (var i = 5; i < this.lsData[0].length; i++){
          states.push(this.lsData[0][i]);  // so we don't change data elements based on reference
        }

        var indexOfState;
        var localSelectedState

        // go to method this.getPeriods to see how this.selectedMonthsDataIndices is gotten
        for (var month in this.selectedMonthsDataIndices) {
          if (this.selectedMonthsDataIndices.hasOwnProperty(month)) {
            this.y[month] = []; // initialize the dataset for each month
            
            if(!this.selectedState){ // no state has been chosen; except randomly selected state
              localSelectedState = states[this.randomStateIndex];
              indexOfState = this.lsData[0].indexOf(localSelectedState);
            }else{ // when a state has been chosen;
              localSelectedState = states.filter(function(elem, index, array){
                  return elem.includes(that.selectedState.toLowerCase()); // get the local state in reference
              })
              indexOfState = this.lsData[0].indexOf(localSelectedState[0]); // get the index of the local state
            }
            this.getStateData(month, indexOfState); // get the data/frequency for the state
          }
        }     
        
        var traceName;
        this.selectedMonth.map(function(value, index){
          traceName = value;
          that.traces[traceName] = that.computeAxisData(traceName); // trace: compute the x-axis and y-axis data for each state and period.
          that.data.push(that.traces[traceName]);        
        }) 

        // |||||||||||||||||||||||||||||||||||||||
        // |||Compute Left Chart ...increment ||||
        // |||||||||||||||||||||||||||||||||||||||   
        
        for (var trace in this.traces){
          if (this.traces.hasOwnProperty(trace)){
              this.traces2[trace] = Object.assign({}, this.traces[trace]); // clone/deep-copy array
              this.traces2[trace].y = this.traces[trace].y.map(function(value, i){
              if (i > 0){
                return value - that.traces[trace].y[i-1];
              }
              else{
                return 0;
              }
            })
            this.data2.push(this.traces2[trace]);
          }
        }

      },
      getPeriods() {

        var that = this; // make new reference.
        // Get data for the chosen month
        if (this.selectedMonth.length === 0){
          this.selectedMonth.push(this.optionsMonth[(new Date).getMonth()]); // get the current month at init.
        }

        var selectedMonthsDataIndices = {}; // to get the months and the db id./SN of the month's dates
        // console.log(selectedMonthsDataIndices) to see what it gives

        this.selectedMonth.filter(function(elem, index, array){
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
        this.selectedMonthsDataIndices = selectedMonthsDataIndices;
      },
      getStateData(month, stateIndex) {
      
        var that = this;
        this.selectedMonthsDataIndices[month].map(function(elem, index){
          that.y[month].push(that.lsData[elem][stateIndex]);
        })
      },
      storeStructuredDataToFirebase() {
        //FIX THIS: Forward structured data to firebase
        this.axios.post("https://central-analytics-dashboard.firebaseio.com/modifiedSheet.json",
            this.chartData)
          .then(response => {
            console.log(response);
          });
      },
      computeAxisData(traceName){

        const y = [];
        
        this.y[traceName].map(function(value, i) {
            y.push(value);
        });

        var trace = {
          x: this.x,
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
      renderChart() {
             
        Plotly.newPlot(this.$refs.line2, this.data2, this.layout, {
          scrollZoom: false
        });
        Plotly.newPlot(this.$refs.line, this.data, this.layout, {
          scrollZoom: false
        });
      },
    },
    created(){
 
   },
   computed: {
    
   },
   updated(){
      Plotly.relayout(this.$refs.line, {
            'xaxis.autorange': true,
            'yaxis.autorange': true
        });
        Plotly.relayout(this.$refs.line2, {
            'xaxis.autorange': true,
            'yaxis.autorange': true
        });
   },
    mounted() {
      this.checkLocalData(); 
    },
    beforeUpdate(){
       
    },
    watch: {
        selectedMonth: function(val){
          
          this.selectedMonth = val;
          if(!this.lsData){
            this.axios.get(this.apiUrl).then(response => {
              this.lsData = response.data;
              this.$ls.set('DDRR_data', JSON.stringify(this.lsData));
              this.computeChartData();
              this.renderChart();
            })
          }else{
            this.computeChartData();
            this.renderChart();
          }
          
        },
        selectedState: function(val){
          //this.lsData = JSON.parse(this.$ls.get('DDRR_data'));
          this.selectedState = val;
          this.computeChartData();
          this.renderChart();
        }
    }

  }
</script>

<style scoped>
@import '../../../node_modules/vue-multiselect/dist/vue-multiselect.min.css';
@import '../../assets/css/styles.css';
</style>