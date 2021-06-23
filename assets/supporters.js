// Functions
    // Number Formatter
    var formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    });

function displaySupporters(data) {
    $("#supporters-card").empty();
    $("#supporters-data").empty();
    $("#supports-data").empty();
    $("#supports-header").empty();
    $("#oppose-data").empty();
    $("#oppose-header").empty();

    $("#supporters-card").append(`
        <div class="card-content">
            <img src="./assets/images/thumbs_up_icon_142634.png" alt="info" width="100" height="100">
            <p>Supporters Card</p>
        </div>    
        <ul class="collapsible"   data-collapsible="accordion">
            <li>
                <div class= "collapsible-header" id="supports-header"></div>
                <div class= "collapsible-body" id="supports-data"></div>
            </li>
        </ul>
        <ul class="collapsible"   data-collapsible="accordion">
            <li>
                <div class= "collapsible-header" id="oppose-header"></div>
                <div class= "collapsible-body" id="oppose-data"></div>
            </li>
        </ul>
    `);

    $("#supporters-data").append(`
        <div class="collapsible-header"><span style= "font-weight:bold; color:#223E88"><h4>supportersCard</h4></span>
    `);



    for (var i = 0; i < Candidate.supportersCard.support.length; i++) {

        $("#supports-data").append(`
        <li> <span style= "font-weight: bold">Committee Name:</span> ${Candidate.supportersCard.support[i].committeeName}
        <br> 
        <span style= "font-weight: bold">Total Spent:</span> ${formatter.format(Candidate.supportersCard.support[i].totalSpent)}</li>
        <br>
       
        `);

    }
    $("#supports-header").append(`

<li><span style= "font-weight: bold">Total Support Expense:</span> ${formatter.format(Candidate.supportersCard.totalSupportExpense)}</li>

`);

    for (var j = 0; j < Candidate.supportersCard.oppose.length; j++) {
        $("#oppose-data").append(`
<li><span style= "font-weight: bold">Committee Name:</span> ${Candidate.supportersCard.oppose[j].committeeName}</li>
<li><span style= "font-weight: bold">Total Spent</span> ${formatter.format(Candidate.supportersCard.oppose[j].totalSpent)}</li>
<br>

`);
    }
    $("#oppose-header").append(`
<li><span style= "font-weight: bold">Total Oppose Expense</span> ${formatter.format(Candidate.supportersCard.totalOpposeExpense)}</li>
`);

    $('.collapsible').collapsible();
}
