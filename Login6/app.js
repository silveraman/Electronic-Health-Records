var express = require("express"),
	mongoose = require("mongoose"),
	passport = require("passport"),
	bodyParser = require("body-parser"),
	LocalStrategy = require("passport-local"),
	passportLocalMongoose =
		require("passport-local-mongoose"),

Dotenv = require('dotenv');
const morgan = require('morgan');
const path = require('path');

const connectDB = require('./database/connection');
// var patientModel =  require('./models/data');
var User = require("./models/user");
// var nptModel = require("./server/model/model");
var nptModel = require("./models/model");
var ptrecordModel = require("./models/ptrecord");

//init app
var app = express();

//config.env connect
Dotenv.config( { path : 'config.env'} )
// const PORT = process.env.PORT || 8080

// log requests
app.use(morgan('tiny'));

// mongodb connection
connectDB();

//set view engine
app.set("view engine", "ejs");
// app.set("views", path.resolve(__dirname, "views/ejs"))

// load assets
app.use('/css', express.static(path.resolve(__dirname, "assets/css")));
app.use( express.static( "assets" ) );
app.use('/js', express.static(path.resolve(__dirname, "assets/js")));

///fetch the data from request
app.use(bodyParser.urlencoded({ extended: true }));


//default page load that is Doctor's login page
//===========================================//
//===========================================//

app.use(require("express-session")({
	secret: "Rusty is a dog",
	resave: false,
	saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//=====================
// ROUTES
//=====================

// Showing home page
app.get("/", function (req, res) {
	res.render("home");
});

// app.get("/assets/img/ehr", function (req, res) {
// 	res.render("/assets/img/ehr");
// });


// Showing Doctor's portal page
app.get("/dportal", isLoggedIn, function (req, res) {
	res.render("dportal");
});

// Showing register form
app.get("/register", function (req, res) {
	res.render("register");
});

// Handling user signup
app.post("/register", function (req, res) {
	var username = req.body.username
	var password = req.body.password
	User.register(new User({ username: username }),
			password, function (err, user) {
		if (err) {
			console.log(err);
			return res.render("register");
		}

		passport.authenticate("local")(
			req, res, function () {
			res.render("login");
		});
	});
});

//Showing login form
app.get("/login", function (req, res) {
	res.render("login");
});

//Handling user login
app.post("/login", passport.authenticate("local", {
	successRedirect: "/dportal",
	failureRedirect: "/login"
}), function (req, res) {
});

//Handling user logout
app.get("/logout", function (req, res) {
	req.logout();
	res.redirect("/");
});

function isLoggedIn(req, res, next) {
	if (req.isAuthenticated()) return next();
	res.redirect("/login");
}

//After Doctor's Login. =====================//
// Doctor's Portal===========================//
//===========================================//

//default page load (ehosp)
// app.get('/doctorportal',(req,res)=>{
// 	try {
// 		 patientModel.find((err,data)=>{
// 			 if(err){
// 				 console.log(err)
// 			 }else{
// 				 res.render('dportal',{data:data});
// 			 }
// 		 });
// 	} catch (error) {
// 		 console.log(error);
// 	}
// });

//search(ehosp)
//Patient id search
app.get('/search',(req,res)=>{
    try {
             nptModel.find({name:{'$regex':req.query.dsearch}},(err,npt)=>{
                 if(err){
                     console.log(err);
                 }else{
					 res.render('opd1',{npt:npt});
                 }
             })
    } catch (error) {
        console.log(error);
    }
});


//             //  patientModel.find({$and:[{patientid:{'$regex':req.query.dsearch}},{DOB:{'$regex':req.query.DOB}}]},(err,data)=>{

// app.post('/doctorportal',(req,res)=>{
//     try {
//            var patient = new patientModel({
//                patientid:req.body.patientid,
//                DOB:req.body.DOB
//            });
//            patient.save((err,data)=>{
//                if(err){
//                    console.log(err)
//                }else{
//                    res.redirect('/doctorportal');
//                }
//            })
//     } catch (error) {
//         console.log(error);
//     }
// });

//===========================================//
//===========================================//
// Add new patient
app.get("/add_user", function (req, res) {
	res.render("add_user");
});


//controller
app.post("/add_user", (req, res)=> {
    try {
           var npt = new nptModel({
			name : req.body.name,
			email : req.body.email,
			gender: req.body.gender,
			// status : req.body.status
			DOB: req.body.DOB,
			Address: req.body.Address,
			Contact_number: req.body.Contact_number,
			Occupation: req.body.Occupation,
			Bloodgroup: req.body.Bloodgroup,
			Insurance: req.body.Insurance,
			Bloodsugar: req.body.Bloodsugar,
			Hypertension: req.body.Hypertension,
			Allergy: req.body.Allergy
           });
           npt.save((err,data)=>{
               if(err){
                   console.log(err)
               }else{
                   res.redirect('/dportal');
               }
           })
    } catch (error) {
        console.log(error);
    }
});

//===========================================//
//===========================================//
//Patient ID Search

// app.get('/search',(req,res)=>{
// 	try {
// 		 nptModel.find((err,data)=>{
// 			 if(err){
// 				 console.log(err)
// 			 }else{
// 				 res.render('/opd1',{name: req.query.name});
// 			 }
// 		 });
// 	} catch (error) {
// 		 console.log(error);
// 	}
// });

app.post("/record", (req, res)=> {
    try {
           var ptrecord = new ptrecordModel({
			Symptoms : req.body.Symptoms,
			Medical_tests : req.body.Medical_tests,
			Test_reports : req.body.Test_reports,
			Test_file : req.body.Test_file,

			med1 : req.body.med1,
			amount1 : req.body.amount1,
			m1 : req.body.m1,
			e1 : req.body.e1,
			n1 : req.body.n1,
			days1 : req.body.days1,

			med2 : req.body.med2,
			amount2 : req.body.amount2,
			m2 : req.body.m2,
			e2 : req.body.e2,
			n2 : req.body.n2,
			days2 : req.body.days2,

			med3 : req.body.med3,
			amount3 : req.body.amount3,
			m3 : req.body.m3,
			e3 : req.body.e3,
			n3 : req.body.n3,
			days3 : req.body.days3,

			med4 : req.body.med4,
			amount4 : req.body.amount4,
			m4 : req.body.m4,
			e4 : req.body.e4,
			n4 : req.body.n4,
			days4 : req.body.days4,

			med5 : req.body.med5,
			amount5 : req.body.amount5,
			m5 : req.body.m5,
			e5 : req.body.e5,
			n5 : req.body.n5,
			days5 : req.body.days,

			med6 : req.body.med6,
			amount6 : req.body.amount6,
			m6 : req.body.m6,
			e6 : req.body.e6,
			n : req.body.n6,
			days6 : req.body.days6,

			advised : req.body.advised,
			speechtotext : req.body.speechtotext
		   });
           ptrecord.save((err,data)=>{
               if(err){
                   console.log(err)
               }else{
                   res.redirect('/dportal');
               }
           })
    } catch (error) {
        console.log(error);
    }
});

var port = process.env.PORT || 3000;
app.listen(port, function () {
	console.log("Server Has Started!");
});

//===========================================//
//===========================================//