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
  .text-xs-center{
    margin: 0 auto;
  }
  .text-xs-right{
    margin-left: 100px;
  }
</style>


