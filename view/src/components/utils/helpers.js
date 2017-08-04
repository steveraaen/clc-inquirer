import axios from 'axios'

var helpers = {

	initHood: function() {
		return axios.get('/hoods')
	},
  initGeoData: function() {
    return axios.get('/allsigns')
   },
  monData: function() {
    return axios.get('/mon')
   }, 
   tueData: function() {
    return axios.get('/tue')
   },
    wedData: function() {
    return axios.get('/wed')
   },
    thuData: function() {
    return axios.get('/thu')
   },
    friData: function() {
    return axios.get('/fri')
   },
    satData: function() {
    return axios.get('/sat')
   },
   

	}

export default helpers;