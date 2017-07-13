import axios from 'axios'

var helpers = {

	initHood: function() {
		return axios.get('/hoods')
	},

  initGeoData: function() {
    return axios.get('/ksigns')
   }
	}

export default helpers;