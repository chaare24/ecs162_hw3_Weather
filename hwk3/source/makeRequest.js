"strict mode";

// Do a CORS request to get Davis weather hourly forecast

// Create the XHR object.
function createCORSRequest(method, url) {
  let xhr = new XMLHttpRequest();
  xhr.open(method, url, true);  // call its open method
  return xhr;
}

// Make the actual CORS request.
function makeCorsRequest() {
  let key = ",US&units=imperial&APPID=5c8288289feda628e2a7dd6980597f2b";
  let url = "http://api.openweathermap.org/data/2.5/forecast/hourly?q=";
  let input = document.getElementById("text_field").value.toString().replace(/ /g, '+');
  let fullUrl = url + input + key;
  let xhr = createCORSRequest('GET', fullUrl);
  // checking if browser does CORS
  if (!xhr) {
    alert('CORS not supported');
    return;
  }

  // Load some functions into response handlers.
  xhr.onload = function () {
    let responseStr = xhr.responseText;  // get the JSON string 
    let object = JSON.parse(responseStr);  // turn it into an object

    let icon = document.getElementsByClassName("current_img_class");
    for (let i = 0; i < icon.length; i++) {
      let objectIcon = object.list[i].weather[0].icon;
      if (objectIcon == '01d') {
        icon[i].src = "../assets/clearsky.svg";
      } else if (objectIcon == '01n') {
        icon[i].src = "../assets/clear-night.svg";
      } else if (objectIcon == '02d') {
        icon[i].src = "../assets/fewclouds-day.svg";
      } else if (objectIcon == '02n') {
        icon[i].src = "../assets/fewclouds-night.svg";
      } else if (objectIcon == '03d' || objectIcon == '03n') {
        icon[i].src = "../assets/scatteredclouds.svg";
      } else if (objectIcon == '04d' || objectIcon == '04n') {
        icon[i].src = "../assets/brokencloud.svg";
      } else if (objectIcon == '09d' || objectIcon == '09n') {
        icon[i].src = "../assets/showerrain.svg";
      } else if (objectIcon == '10d') {
        icon[i].src = "../assets/rain-day.svg";
      } else if (objectIcon == '10n') {
        icon[i].src = "../assets/rain-night.svg";
      } else if (objectIcon == '11d' || objectIcon == '11n') {
        icon[i].src = "../assets/thunderstorms.svg";
      } else if (objectIcon == '13d' || objectIcon == '13n') {
        icon[i].src = "../assets/snow.svg";
      } else {
        icon[i].src = "../assets/mist.svg";
      }
    }

    /* Phone View START*/
    let current_temp = document.getElementsByClassName("current_temp_class");
    let current_time = document.getElementsByClassName("current_time_class");

    for (let i = 0; i < current_temp.length; i++) {
      let tempTime = new Date();
      tempTime.setHours(tempTime.getHours() + i);
      let time = tempTime.toLocaleString('en-US', { hour: 'numeric', hour12: true });
      current_time[i].textContent = time.toString();

      current_temp[i].textContent = (Math.round(object.list[i].main.temp)).toString().concat('\xB0');
    }
    /* Phone View END*/

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

