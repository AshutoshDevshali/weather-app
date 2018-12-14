const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");


app.get("/", function(req, res){
	res.render("index", {weather: null, error: null});
})



app.post("/", function(req, res){
	var city = req.body.city;
  	var url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=449cbe02021374c6e6f2cf2609325970`;
	request(url, function(error, response, body){
	if(error){
    res.render('index', {weather: null, error: "Error! please try again"});
	} else {
		var weather = JSON.parse(body);
		if(weather.main == undefined){
			res.render("index", {weather: null, error: "Error! Please try again"});
		} else {
			res.render("index", {weather: weather, error: null});
		}
	}
		})
})



app.listen("3000", function(){
	console.log("Server has started");
})
