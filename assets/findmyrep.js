/* eslint-disable no-undef */
// GLOBAL VARIABLES
var API_KEY = 'AIzaSyDWmx5SNWTY95Rn78Kce0f2dhi4ZZkrdxY';
var gapiCivicsURL = '';
var keysArr = [];
var myString = '';
var district = 0;
var parsedAddress = '';

// Event handler for form submit to get user address info
// parse address info to prep for API call
$( '#usrAddressForm' ).submit( function( event ) {
	event.preventDefault();
	var addr = $( '#street_address' ).val().replace( /\s/g, '%20' );
	var zippy = $( '#zip' ).val();
	parsedAddress = addr + ', ' +zippy;
	getData( parsedAddress );
	writeDistrict();
} );

// Use Google Civics API to find user district number from address data
function getData( address ) {
	var foundAt=0;

	gapiCivicsURL = `https://civicinfo.googleapis.com/civicinfo/v2/representatives?includeOffices=true&key=${API_KEY}&address=${address}`;

	fetch( gapiCivicsURL )
		.then( function ( response ) {
			if( response.ok ) {
				return response.json();
			} else {
				console.log( 'error with data fetch' );
			}
		} )
		.then( function ( data ) {
			// due to changing object keys, must convert keys to array
			keysArr = Object.keys( data.divisions );

			for( var i=0; i < keysArr.length; i++ ) {
				myString = keysArr[i];
				// due to changing data, must search each value to find district key
				if( myString.search( '/cd:' ) !== -1 ) {
					foundAt = i;
				}
			}

			// must convert to actual string object
			myString = keysArr[foundAt];

			// get district by splitting resulting string at 'cd:'
			district = myString.split( '/cd:' )[1];
			console.log( district );
		} );
}

function writeDistrict(){
	var readyToGo = setInterval( function() {
		if( keysArr.length > 3 ) {
			clearInterval( readyToGo );

			$( '#districtOutput' ).html( `<li style="list-style-type: none;">Your District Number is:
        <span style="font-size: 48px; font-weight:bold">${district}</span></li>
      ` );
		}
	}, 1000 );
}

writeDistrict();