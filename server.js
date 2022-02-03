// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express=require('express');
// Start up an instance of app
const app=express();
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
const bodyParser=require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors=require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
const port=8080;
// response message showen in the terminal
const listening=()=>console.log(`server is running in port:${port}`);
//init the server using app.listen method
const server=app.listen(port,listening);

//set up post routes for post requests
app.post('/sData',(req,res)=>{
	//editing the server's object 
	projectData={
   		date:req.body.date,
		temp:req.body.temp,
		content:req.body.content
	};
});

//set up get routes for get request from the server
app.get('/gData',(req,res)=>{
	//sending object content (the Endpoint)
	res.send(projectData);
});