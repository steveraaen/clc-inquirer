import axios from 'axios'

var helpers = {

	initHood: function() {
		return axios.get('/hoods')
	},

  initGeoData: function() {
    return axios.get('/allsigns')
   },
     getNear: function() {
    return axios.get('/ksigns:/near')
   }
	}

export default helpers;