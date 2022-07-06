var mongoose = require('mongoose');

var patientSchema = new mongoose.Schema({
    patientid:{
        type:String
    }
    // DOB:{
    //     type:String
    // }
});

module.exports =  mongoose.model('patient',patientSchema);
