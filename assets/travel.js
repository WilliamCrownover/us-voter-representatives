
// fills card with the data about trips 
function fillTravelCard(trips) {
    // Jquery container for the trip card
    var tripCard$ = $('#travel-card');
    
    var tripTemplate = '<div class="expend-table"> <output> Flight Date: _departure_</output>  <output>Destination: _destination_</output> <output>Sponsor: _sponsor_</output> </div> <br/>';

    //Looping through trips
    for (let idx = 0; idx < trips.length; idx++) {
        //taking a trip object on index idx in array trips
        const tripData = trips[idx];
        //puts the template var into new var so we will not corrupted
        let replacedTemplate = tripTemplate;
        //replacing each templated value with actual data
        replacedTemplate = replacedTemplate.replace('_destination_', tripData.destination);
        replacedTemplate = replacedTemplate.replace('_sponsor_', tripData.sponsor);
        replacedTemplate = replacedTemplate.replace('_departure_', tripData.departure);
        //appends resulting html (replacedTemplate) to trip card 
        tripCard$.append(replacedTemplate);
    }
    
}
