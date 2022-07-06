var mongoose = require('mongoose');

var ptrecordSchema = new mongoose.Schema({
    
    Symptoms: String,
    Medical_tests : String,
    Test_reports : String,
    Test_file : String,

    med1 : String,
    amount1 : String,
    m1 : String,
    e1 : String,
    n1 : String,
    days1 : String,

    med2 : String,
    amount2 : String,
    m2 : String,
    e2 : String,
    n2 : String,
    days2 : String,

    med3 : String,
    amount3 : String,
    m3 : String,
    e3 : String,
    n3 : String,
    days3 : String,

    med4 : String,
    amount4 : String,
    m4 : String,
    e4 : String,
    n4 : String,
    days4 : String,

    med5 : String,
    amount5 : String,
    m5 : String,
    e5 : String,
    n5 : String,
    days5 : String,

    med6 : String,
    amount6 : String,
    m6 : String,
    e6 : String,
    n6 : String,
    days6 : String,

    advised : String,
    speechtotext : String
});

module.exports = mongoose.model('ptrecord', ptrecordSchema);