/* Global Variables */
const apikey= '&appid=8ae8d84a45d62d33277df69a27f57e4f&units=metric';

const tempDiv=document.getElementById('temp');
const dateDiv=document.getElementById('date');
const contentDiv=document.getElementById('content');

const baseurl='https:api.openweathermap.org/data/2.5/weather?zip='

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+1+'.'+ d.getDate()+'.'+ d.getFullYear();


//adding eventlistener to the button
document.getElementById('generate').addEventListener('click',(e)=>{
    const zipcode=document.getElementById('zip').value;
    const feelings=document.getElementById('feelings').value;
    // alert user if not provided data
    if(!zipcode){
        alert('Please enter a zipcode first')
    }
    if(!feelings){
        alert('Please add your feelings first')
    }
    // call webapi to receive data
    getweather(apikey,zipcode,baseurl)

        .then((data) =>{
		          postData('/sData',{date:newDate,
                       temp:data.main.temp,
                        content:feelings})
                  UpdateClientUi();
	   })
});

//fetch call for weather data
const getweather=async(apikey,zipcode,baseurl)=>{
    //fetching weather data
    const res= await fetch(`${baseurl}${zipcode}${apikey}`)

    try {
        //convert data
        const data = await res.json();
        return data;
    }
    catch(error){
        console.log('error',error);
    }
}

//posting data to server function
const postData = async ( url = '', data = {})=>{
      const response = await fetch(url, {
      	method: 'POST',
      	credentials: 'same-origin',
      	headers: {
          	'Content-Type': 'application/json',
      	},
     // Body data type must match "Content-Type" header
      	body: JSON.stringify(data),
	});

      try {
        const newData = await response.json();
        return newData;
      }catch(error) {
      console.log("error", error);
      }
  }

//Updating User Interface
const UpdateClientUi=async()=>{
	let req = await fetch('/gData');
	try{
        //convert data to json first
		const retrievedData= await req.json();
        //editing DOM Elements
		tempDiv.innerHTML=`Temp:${retrievedData.temp}`;
		dateDiv.innerHTML=`Date:${retrievedData.date}`;
		contentDiv.innerHTML=`Feelings:${retrievedData.content}`;
		}
        //to handle error if happened
	catch(error){
		catchError(error);
    }
}
