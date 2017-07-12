import axios from 'axios'


/*function SignSlice() {

}*/


var helpers = {

  getGeoData() {
  	console.log('getData called')
    return axios.get('/ksigns', function(){

    })
   }



	}
export default helpers;