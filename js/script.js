// today card variables
let today = document.getElementById("today");
let dateDay = document.getElementById("date-day");
let locationCity = document.getElementById("location");
let todayDegree = document.getElementById("today-degree");
let iconToday = document.getElementById("icon-today");
let todayDescription = document.getElementById("today-description");
let humidty = document.getElementById("humidty");
let wind = document.getElementById("wind");
let compass = document.getElementById("compass");
let search = document.getElementById("search-bar");
let response;
let weatherdata;
let currentCity = "cairo";
let date = new Date();
let weekDays = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
let monthName = ["Jan","Feb","March","April","May","June","July","Aug","Sept","Oct","Nov","Dec"];



// next day
let nextDay=document.getElementsByClassName("next-day");
let dateNextDay=document.getElementsByClassName("date-next-day");
let iconNextDay=document.getElementsByClassName("icon-next-day");
let maxDegree=document.getElementsByClassName("max-degree");
let minDegree=document.getElementsByClassName("min-degree");
let nextDayDescription=document.getElementsByClassName("nextDay-description");



// get data

async function getWeatherData(){
  response=await fetch(`http://api.weatherapi.com/v1/forecast.json?key=0a85d05e028e47719cb204923221805&q=${currentCity}&days=3`);
  weatherdata=await response.json();
  console.log(weatherdata)
  displayWeatherData();
  displayWeatherNextDays()
}




// display weatherday
function displayWeatherData(){
  let wheaterDate=weatherdata.forecast.forecastday[0].date;
  let currentDate=wheaterDate.split("-");
  let currentDateDay=currentDate[2];
  today.innerHTML=weekDays[date.getDay()];   
  dateDay.innerHTML=`${currentDateDay} ${monthName[date.getMonth()]}`
  locationCity.innerHTML=weatherdata.location.name;
  todayDegree.innerHTML=Math.round(weatherdata.current.temp_c) ;
  iconToday.setAttribute(`src`,`https://${weatherdata.current.condition.icon}`);
  todayDescription.innerHTML=weatherdata.current.condition.text;
  humidty.innerHTML=weatherdata.current.humidity;
  wind.innerHTML=weatherdata.current.wind_kph;
  compass.innerHTML=weatherdata.current.wind_dir;
}


// next day
function getNextDays(nextWeatherDate){
  let day=new Date(nextWeatherDate)
  return day && weekDays[day.getDay()]
}
// month name
function nextMonth(nextWeatherDate){
  let month=new Date(nextWeatherDate);
  return month && monthName[month.getMonth()]
}


// display next day weather
function displayWeatherNextDays(){
  for(let i=0;i<nextDay.length;i++){
    let nextWeatherDate=weatherdata.forecast.forecastday[i+1].date;
    let currentDate=nextWeatherDate.split("-");
    let currentDateDay=currentDate[2];
    nextDay[i].innerHTML=getNextDays(nextWeatherDate);
    dateNextDay[i].innerHTML=`${currentDateDay} ${nextMonth(nextWeatherDate)}`;
    iconNextDay[i].setAttribute('src',`https://${weatherdata.forecast.forecastday[i+1].day.condition.icon}`);
    maxDegree[i].innerHTML=Math.round(weatherdata.forecast.forecastday[i+1].day.maxtemp_c);
    minDegree[i].innerHTML=Math.round(weatherdata.forecast.forecastday[i+1].day.mintemp_c);
    nextDayDescription[i].innerHTML=weatherdata.forecast.forecastday[i+1].day.condition.text;
  }
}



//  Search City
search.addEventListener("keyup",function(){
  currentCity=search.value;
  getWeatherData()
})

// Call function weather
getWeatherData()