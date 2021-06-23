
// fills card with the data about trips 
function fillTravelCard(trips) {
    // Jquery container for the trip card
    var tripCard$ = $('#travel-card');

    //empties the parent object for clean slate to load data
    tripCard$.empty();

    //Looping through trips
    for (let idx = 0; idx < trips.length; idx++) {
        //taking a trip object on index idx in array trips
        const tripData = trips[idx];
        //uses string interpolation to create a template
        let template = `
        <ul class="collapsible" data-collapsible="accordion">
            <li>
                <div class="collapsible-header" style="font-weight:bold"><span style="font-weight:bold">Flight On ${tripData.departure} to ${tripData.destination} </span></div>
                <div class="collapsible-body">
                    <p><span style="font-weight:bold">Destination: </span>${tripData.destination}</p>
                    <p><span style="font-weight:bold">Sponsor: </span>${tripData.sponsor}</p>
                    <p><span style="font-weight:bold">Flight Date: </span>${tripData.departure}</p>
                </div>
            </li>
        </ul>`;

        //appends resulting html (replacedTemplate) to trip card 
        tripCard$.append(template);
    }

    //Initialization collapsible element for travel card
    $("#travel-card > .collapsible").collapsible();
}
