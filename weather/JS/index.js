var contentHtml = document.getElementById('forecast');
var search = document.getElementById('search');


async function getData(loc) {
    let data = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=0f0bea2ffe6e439b954212131230808&q=${loc}&days=3`)
    let finalResult = await data.json();
    displayCurrent(finalResult.location, finalResult.current);
    displayForecast(finalResult.forecast.forecastday)
}
search.addEventListener('input', (l)=>{
getData(l.target.value)
});


let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
function displayCurrent(a, b) {
    var todayDate = new Date(b.last_updated);
    let currentData = ` <div class="col-md-4 pb-2 custom-all">
    <div class="content-toay d-flex flex-column align-content-between  ">
      <div class="header-day ha p-2 ">
        <div class="day float-start">${days[todayDate.getDay()]}</div>
        <div class="date float-end">${todayDate.getDate()} ${months[todayDate.getMonth()]} </div>
      </div>
      <div class="main-content p-2">
        <div class="location">${a.name}</div>
        <div class="degre">
          <div class="nom-degree">
            ${b.temp_c}<sup>o</sup>C
          </div>
          <div class="climate-icon">
            <img src="https:${b.condition.icon}" width="90">
          </div>
        </div>
      </div>
      <div class="condition  p-2">${b.condition.text}</div>
      <div class="p-2 forecast-icon">
        <span >
          <img src="images/icon-umberella.png" alt=""> ${b.humidity}%</span>
        <span>
          <img src="images/icon-wind.png" alt=""> ${b.vis_km}km/h</span>
        <span>
          <img src="images/icon-compass.png" alt=""> ${b.wind_dir}</span>
      </div>

    </div>
  
  </div>`
    contentHtml.innerHTML = currentData;

}

function displayForecast(x) {
    let boxData = ``
    for (let i = 1; i < x.length; i++) {
        let nextDate = new Date(x[i].date);
        boxData += `<div class="col-md-4 pb-2 custom-all text-center">
        <div class="content-toay d-flex flex-column align-content-between  ">
          <div class="header-day ha p-2 ">
            <div class="day">${days[nextDate.getDay()]}</div>
          </div>
          <div class="main-content p-2">
            <div class="degre  pt-3 pb-3">
              <div class="climate-icon">
                <img src="https:${x[i].day.condition.icon}" width="50">
              </div>
              <div class="nom-max-degre"> ${x[i].day.maxtemp_c}<sup>o</sup>C</div>
            <small>${x[i].day.mintemp_c} <sup>o</sup></small>
            </div>
          </div>
          <div class="condition  p-2">${x[i].day.condition.text}</div>
        </div>
      </div>`

    }
    contentHtml.innerHTML += boxData;

}







getData('cairo');


// var newDate=new Date(finalResult.current.last_updated)
// console.log(newDate);
