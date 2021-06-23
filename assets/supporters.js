function displaySupporters(data) {
    $("#supporters-card").empty();
    $("#supporters-card").append(`

    <div class="collapsible-header"><span style= "font-weight:bold; color:#223E88"><h4>supportersCard</h4></span>
`);

var totalSpent = 0.00;

for( var i = 0; i < Candidate.supportersCard.support.length; i++) {
    if(Candidate.supportersCard.support[i].committeeName.totalSpent == 0.00) {
console.log(Candidate.supportersCard.support[i]);
  
    }
     else {
        (Candidate.supportersCard.support[i].committeeName.totalSpent == 0.00);

        }     
}

// //for(var j = 0; j < Candidate.supportersCard.oppose.length; j++) {
//     if(Candidate.supportersCard.oppose[j].committeeName.totalSpent == 0.00) {

//     }
//      else {
//         (Candidate.supportersCard.oppose[j].committeeName. ==);

//         }     
// }


$("#supporters-card").append(`

<div class="collapsible-header" style="font-weight:bold"><span style="font-weight:bold">Title:\u00A0${supportersCard}</span></div>
<div class="collapsible-body">    

<p><span style="font-weight:bold">Support:\u00A0</span>${Candidate.supportersCard.support[i].committeeName}</p>
<p><span style="font-weight:bold">Oppose:\u00A0</span>${Candidate.supportersCard.oppose[j].committeeName}</p>

<p><span style="font-weight:bold">Total Spent:\u00A0</span>${Candidate.supportersCard.support[i].totalSpent}</p>
<p><span style="font-weight:bold">Total Spent:\u00A0</span>${Candidate.supportersCard.oppose[j].totalSpent}</p>
</div>
`);
}
displaySupporters();