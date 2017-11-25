import {Bar} from 'vue-chartjs'

  export default {
    extends: Bar,
    data () {
      return {
        datacollection: {
          labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
          datasets: [
            {
              label: 'Data One',
              backgroundColor: '#f87979',
              data: [40, 20, 12, 39, 10, 10, 39, 80, 40, 20, 12, 11]
            },
            {
              label: 'Data two',
              backgroundColor: '#f8A979',
              data: [20, 30, 12, 39, 15, 40, 19, 50, 47, 20, 12, 31]
            }
          ]
        }
      }
    },
    mounted () {
      this.renderChart(this.datacollection, {responsive: true, maintainAspectRatio: false})
    }
  }