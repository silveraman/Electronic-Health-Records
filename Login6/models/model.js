var mongoose = require('mongoose');

var nptSchema = new mongoose.Schema({
    name : {
        type : String,
        // required: true
    },
    email : {
        type: String,
        // required: true,
        // unique: true
    },
    gender : String,
    // status : String
    DOB: String,
    Address: String,
    Contact_number: String,
    Occupation: String,
    Bloodgroup: String,
    Insurance: String,
    Bloodsugar: String,
    Hypertension: String,
    Allergy: String
})

module.exports = mongoose.model('npt', nptSchema);