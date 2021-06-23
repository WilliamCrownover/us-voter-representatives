function displaySupporters(data) {
    $("#supporters-data").empty();
    $("#supporters-data").append(`

    <div class="collapsible-header"><span style= "font-weight:bold; color:#223E88"><h4>supportersCard</h4></span>
`);



for( var i = 0; i < Candidate.supportersCard.support.length; i++) {

        $("#supports-data").append(`
        <output> <span style= "font-weight: bold">Committee Name:</span> ${Candidate.supportersCard.support[i].committeeName}: 
        <span style= "font-weight: bold">Total Spent:</span> ${ Candidate.supportersCard.support[i].totalSpent}</output>
       
        `);  
   
}
$("#supports-data").append(`

<output><span style= "font-weight: bold">Total Support Expense:</span> ${Candidate.supportersCard.totalSupportExpense}</output>
`);  
for(var j = 0; j < Candidate.supportersCard.oppose.length; j++) {
$("#supports-data").append(`
<output><span style= "font-weight: bold">Oppose:</span> ${Candidate.supportersCard.oppose[j].committeeName}</output>
<output><span style= "font-weight: bold">Total Spent</span> ${Candidate.supportersCard.oppose[j].totalSpent}</output>

`);      
}
$("#supports-data").append(`
<output><span style= "font-weight: bold">Total Oppose Expense</span> ${Candidate.supportersCard.totalOpposeExpense}</output>
`); 
 }
