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
    if (objectIcon == '01d') {
      icon.src = "../assets/clearsky.svg";
    } else if (objectIcon == '01n') {
      icon.src = "../assets/clear-night.svg";
    } else if (objectIcon == '02d') {
      icon.src = "../assets/fewclouds-day.svg";
    } else if (objectIcon == '02n') {
      icon.src = "../assets/fewclouds-night.svg";
    } else if (objectIcon == '03d' || objectIcon == '03n') {
      icon.src = "../assets/scatteredclouds.svg";
    } else if (objectIcon == '04d' || objectIcon == '04n') {
      icon.src = "../assets/brokencloud.svg";
    } else if (objectIcon == '09d' || objectIcon == '09n') {
      icon.src = "../assets/showerrain.svg";
    } else if (objectIcon == '10d') {
      icon.src = "../assets/rain-day.svg";
    } else if (objectIcon == '10n') {
      icon.src = "../assets/rain-night.svg";
    } else if (objectIcon == '11d' || objectIcon == '11n') {
      icon.src = "../assets/thunderstorms.svg";
    } else if (objectIcon == '13d' || objectIcon == '13n') {
      icon.src = "../assets/snow.svg";
    } else {
      icon.src = "../assets/mist.svg";
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
