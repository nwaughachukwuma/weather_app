import axios from 'axios';

axios.defaults.headers.common['Access-Control-Allow-Origin'] = 'http://localhost:8080';
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.get['Content-Type'] = 'application/json,application/x-www-form-urlencoded';
axios.defaults.headers.common['Accept'] = 'application/json,text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8';

export const HTTP = axios.create({
  baseURL: `http://localhost/weather.php`, //`https://www.metaweather.com/api/location/`,
  headers: {
    'Access-Control-Allow-Origin': '*',
    Authorization: 'Bearer {token}',
    // Host: 'www.metaweather.com',
    Refererer: 'https://www.metaweather.com/api/',
    'Access-Control-Allow-Methods': 'HEAD, GET, POST, PUT, PATCH, DELETE',
    'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token'
  }
})