<template>
  <v-app id="inspire">
    <v-navigation-drawer permanent v-model="drawer" enable-resize-watcher app :mini-variant.sync="mini">
      <v-list dense>

        <v-list-tile to="/">
          <v-list-tile-action>
            <v-icon medium dark>home</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>App Home</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

        <v-list-group v-for="item in items" :value="item.active" v-bind:key="item.title">
          <v-list-tile slot="item" @click="">
            <v-list-tile-action>
              <v-icon>{{ item.action }}</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>{{ item.title }}</v-list-tile-title>
            </v-list-tile-content>
            <v-list-tile-action>
              <v-icon>keyboard_arrow_down</v-icon>
            </v-list-tile-action>
          </v-list-tile>
          <v-list-tile v-for="subItem in item.items" v-bind:key="subItem.title" :to="subItem.route" >
            <!-- <v-list-tile-action>
                <v-icon>{{ subItem.icon }}</v-icon>
              </v-list-tile-action> -->
            <v-list-tile-content>              
              <v-list-tile-title>{{ subItem.title }}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list-group>


      </v-list>
    </v-navigation-drawer>
    <v-toolbar color="indigo" dark fixed app>
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title>Weather App</v-toolbar-title>
    </v-toolbar>
    <main>
      <v-content>
        <router-view></router-view>
      </v-content>
    </main>
    <v-footer color="indigo" class="pa-3" app>        
      <div class="">
        <span class="white--text">Built with <label style="color:red;">&#9829;</label> by <a href="https://ng.linkedin.com/in/cpnwaugha">Chukwuma Nwaugha</a>
        <v-spacer></v-spacer>
          <div>&copy; {{ new Date().getFullYear() }}</div>
        </span>
      </div>
    </v-footer>
  </v-app>
</template>


<script src="../node_modules/jquery/dist/jquery.min.js"></script>
<script src="../node_modules/bootstrap/dist/js/bootstrap.min.js"></script>

<script>
  export default {
    data () {
      return {
        drawer: true,
        items: [
          {
            action: 'settings',
            title: 'Settings',
            active: true,
            items: [
              { title: 'Admin', route: '/admin' },                           
            ]
          },
          // {
          //   action: 'bubble_chart',
          //   title: 'ChartJS Charts',
          //   items: [
          //     { title: 'Bar Chart', route: '/bar' },
          //     { title: 'Line Chart', route: '/line' },
          //     { title: 'Pie Chart', route: '/pie' }
          //   ]
          // },
        ],
        mini: true
      }
    },
    props: {
      source: String
    }
  }
</script>
 


<style lang="stylus">
  @import './stylus/main'
</style>

<style lang="less">
@import "../node_modules/bootstrap/less/bootstrap.less";
</style>

<style lang="sass">
@import "./custom-bootstrap.scss";
@import "../node_modules/bulma/bulma.sass";
</style>

<style>
  @import "../node_modules/vuetify/dist/vuetify.min.css";
  @import "../public/keen.io/css/keen-static.css";
  @import "../public/keen.io/css/keen-dashboards.css";
  @import "./assets/css/styles.css";
  
</style>


