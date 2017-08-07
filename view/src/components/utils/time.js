var moment = require("moment")

var date = moment();
var dow = date.day();

function today(dow) {
    if (dow === 0) {
        return "SUN"
    } else if (dow === 1) {
        return "MON"
    } else if (dow === 2) {
        return "TUE"
    } else if (dow === 3) {
        return "WED"
    } else if (dow === 4) {
        return "THU"
    } else if (dow === 5) {
        return "FRI"
    } else if (dow === 6) {
        return "SAT"
    }
}

module.exports = today(dow)