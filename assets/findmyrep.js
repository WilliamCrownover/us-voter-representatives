var API_KEY = "AIzaSyDWoNvuofpIPra70zQ42CMuJJJMCx1NzKc";
var zipCode = "";
var gapiCivicsURL = "";
var keysArr = [];
var myString = "";
var numberString;
var district = 0;
var parsedAddress = "";

// console.log(gapiCivicsURL);

function handleDistrictSearch(event) {
  event.preventDefault();
  console.log("userclickregistered");
  var addr = $("#street_address").val().replace(/\s/g,"%20");
  var zippy = $("#zip").val();
  parsedAddress = addr + ", " +zippy;
  console.log("parsed address is: " + parsedAddress);
  getData(parsedAddress);
}

$("#usrAddressForm").on("submit", handleDistrictSearch);

function getData(address) {
    var foundAt=0;
  gapiCivicsURL = `https://civicinfo.googleapis.com/civicinfo/v2/representatives?includeOffices=true&key=${API_KEY}&address=${address}`;
  fetch(gapiCivicsURL)
    .then(function (response) {
        if(response.ok) {
          return response.json();
        }
        else {
          console.log("error with data fetch");
        }
      })
      .then(function (data) {
        keysArr = Object.keys(data.divisions);
        for(i=0; i < keysArr.length; i++) {
            myString = keysArr[i];
            if(myString.search("/cd:") !== -1) {
                foundAt = i;
            }
        }
        myString = keysArr[foundAt];
        district = myString.split("/cd:")[1];
        console.log(district);
      });
}

var readyToGo = setInterval(function() {
  if(keysArr.length > 3) {
    clearInterval(readyToGo);
    $("#districtOutput").append(`<li>Your District Number is:
    <span style="font-size: 36px; font-weight:bold">${district}</span></li>`);
    console.log(district);
    district = 0;
  }
  else {
    console.log("error - keys array not complete in fxn setinterval");
  }
})