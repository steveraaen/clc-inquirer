import bkbrooms from "../../bkbrooms.json"

/*function SignSlice() {

}*/


var helpers = {
	getSigns: function() {
		var twoHundred = []
		for(let i = 0; i < 500; i++) {
			var localSign = bkbrooms.features[i];
			twoHundred.push(localSign)
		}
		return twoHundred
	}
}

export default helpers;