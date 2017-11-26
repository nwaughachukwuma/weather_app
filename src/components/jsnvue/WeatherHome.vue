<template>

  <weather id="app">
    
  </weather>
  
</template>

<script>
import Weather from './Weather'
export default {
  components: {
    Weather
  },
  data(){
    return {
      appname: 'App'
    }
  },
  mounted(){
    this.appname = "App Name"
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


