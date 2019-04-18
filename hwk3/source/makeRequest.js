"strict mode";

// Do a CORS request to get Davis weather hourly forecast
let current_temp = document.getElementById("current_temp");
let current_time = document.getElementById("current_time");

// Create the XHR object.
function createCORSRequest(method, url) {
  let xhr = new XMLHttpRequest();
  xhr.open(method, url, true);  // call its open method
  return xhr;
}

// Make the actual CORS request.
function makeCorsRequest() {
  let url = "http://api.openweathermap.org/data/2.5/forecast/hourly?q=Davis,CA,US&units=imperial&APPID=5c8288289feda628e2a7dd6980597f2b"
  let xhr = createCORSRequest('GET', url);
  // checking if browser does CORS
  if (!xhr) {
    alert('CORS not supported');
    return;
  }

  // Load some functions into response handlers.
  xhr.onload = function () {
    let responseStr = xhr.responseText;  // get the JSON string 
    let object = JSON.parse(responseStr);  // turn it into an object

    let icon = document.getElementById("current_img");
    let objectIcon = object.list[0].weather[0].icon;
    if (objectIcon == '01d' || objectIcon == '02d') {
      icon.src = "C:/Users/micor/OneDrive/Documents/GitHub/ecs162/hwk3/assets/clearsky.svg";
    } else if (objectIcon == '01n' || objectIcon == '02n') {
      icon.src = "C:/Users/micor/OneDrive/Documents/GitHub/ecs162/hwk3/assets/clear-night.svg";
    } else if (objectIcon == '03n' || objectIcon == '03d') {
      icon.src = "C:/Users/micor/OneDrive/Documents/GitHub/ecs162/hwk3/assets/scatteredclouds.svg";
    } else if (objectIcon == '04d' || objectIcon == '04n') {
      icon.src = "C:/Users/micor/OneDrive/Documents/GitHub/ecs162/hwk3/assets/brokencloud.svg";
    } else if (objectIcon == '10d') {
      icon.src = "C:/Users/micor/OneDrive/Documents/GitHub/ecs162/hwk3/assets/rain-day.svg";
    } else {
      icon.src = "C:/Users/micor/OneDrive/Documents/GitHub/ecs162/hwk3/assets/snow.svg";
    }

    current_temp.innerHTML = Math.round(object.list[0].main.temp) + "&deg;";

    let tempTime = new Date();
    let time = tempTime.toLocaleString('en-US', { hour: 'numeric', hour12: true });
    current_time.innerHTML = time;

    console.log(JSON.stringify(object, undefined, 2));
  };

  xhr.onerror = function () {
    alert('Woops, there was an error making the request.');
  };

  // Actually send request to server
  xhr.send();
}

// run this code to make request when this script file gets executed 
makeCorsRequest();
