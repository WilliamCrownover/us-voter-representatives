function displaySupporters(data) {
    $("#supporters-card").empty();
    $("#supporters-card").append(`

    <div class="collapsible-header"><span style= "font-weight:bold; color:#223E88"><h4>supportersCard</h4></span>
`);

for( var i = 0; i < Candidate.supportersCard.support.length; i++) {
 for(var j = 0; j < Candidate.supportersCard.oppose.length; j++) {


   if(Candidate.supportersCard.support[i].committeeName == "") {

    }
     else {
         (Candidate.supportersCard.oppose[j].committeeName == "")

        }     
}


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
}