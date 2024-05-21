async function search(a) {
    let api = await fetch(
      `https://api.weatherapi.com/v1/forecast.json?key=7d77b96c972b4d119a3151101212704&q=${a}&days=3`
    );
    if (api.ok && 400 != api.status) {
      let a = await api.json();
      displayMainCard(a.location, a.current),
      displayNextTwocard(a.forecast.forecastday);
    }
  }
 document.getElementById("search").addEventListener("input", (a) => {
    search(a.target.value);

  });
  var weekDays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  function displayMainCard(a, t) {
    if (null != t) {
      var e = new Date(t.last_updated.replace(" ", "T"));
      let n = `<div class="today forecast">
         <div class="forecast-header" id="today"> 
          <div class="day">${

           weekDays[e.getDay()]
        }
         </div>    
      <div class=" date">${
        e.getDate() + " "+months[e.getMonth()]}
        </div>   
      </div>
     <div class="forecast-content" id="current">  
      <div class="location">${ a.name}
      </div> <div class="degree">    
      <div class="num">${ t.temp_c }
      <sup>o</sup>C</div> 
     <div class="forecast-icon"> 
      <img src="https:${t.condition.icon}" alt="" width=90> 
     </div>
     </div>   
     <div class="custom">${t.condition.text}</div> 
     <span><img src="img/icon-umberella.png" alt="">20%</span><span><img src="img/icon-wind.png" alt="">18km/h</span><span><img src="img/icon-compass.png" alt="">East</span> </div></div>`;
     document.getElementById("forecast").innerHTML = n;
    }
  }
function  displayNextTwocard(a) {
    let t = "";
    for (let e = 1; e < a.length; e++)
      t += `\t<div class="forecast"><div class="forecast-header"> <div class="day">${
       weekDays[new Date(a[e].date.replace(" ", "T")).getDay()+1]

      }</div>
       </div>
       <div class="forecast-content"> 
       <div class="forecast-icon"> <img src="https:${a[e].day.condition.icon}" alt="" width=48> </div> <div class="degree">${a[e].day.maxtemp_c}<sup>o</sup>C</div>
       <p>${ a[e].day.mintemp_c}<sup>o</sup></p>  
       <div class="custom">${a[e].day.condition.text}</div></div></div>`;
       document.getElementById("forecast").innerHTML += t;
}
search("cairo");
  