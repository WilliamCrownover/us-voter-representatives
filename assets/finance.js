// Elements
var financeDataContainerEl = $("#financeDataContainer");

// Functions
    // Number Formatter
var formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
});

function displayFinances(data) {
    financeDataContainerEl.empty();
    financeDataContainerEl.append(`
        <ul class="collapsible" data-collapsible="accordion">
            <li>
                <div class="collapsible-header" style="font-weight:bold">Percentage of Contributions</div>
                <div class="collapsible-body" style="padding: 15px">
                    <div style="background-color: yellow; padding: 3px 5px; width: ${100-(data.grassRootsPercent())}%">Comittee<br> ${100-(data.grassRootsPercent())}%</div>
                    <div style="background-color: green; padding: 3px 5px; width: ${data.grassRootsPercent()}%">Independent<br> ${data.grassRootsPercent()}%</div>
                </div>
            </li>
        </ul>
        <ul class="collapsible" data-collapsible="accordion">
            <li>
                <div class="collapsible-header"><span style="font-weight:bold">Total Raised:&#160</span>${formatter.format(data.totalRaised)}</div>
                <div class="collapsible-body">
                    <p><span style="font-weight:bold">Comittee:&#160</span>${formatter.format(data.nonIndependentContributions())}</p>
                    <p><span style="font-weight:bold">Independent:&#160</span>${formatter.format(data.independentContributions)}</p>
                </div>
            </li>
        </ul>
        <p style="margin-left: 15px"><span style="font-weight:bold">Expenditure:&#160</span>${formatter.format(data.expenditure)}</p>
        <ul class="collapsible" data-collapsible="accordion">
            <li>
                <div class="collapsible-header"><span style="font-weight:bold">Current War Chest:&#160</span>${formatter.format(data.currentStash)}</div>
                <div class="collapsible-body"><span style="font-weight:bold">Net Gain or Loss:&#160</span>${formatter.format(data.netGainLoss())}</div>
            </li>
        </ul>
    `)

    $('.collapsible').collapsible();
}

// var displayFinanceData = setInterval(function() {
//     if(apiReturns.length === 8) {
//         clearInterval(displayFinanceData);
//         displayFinances(Candidate.financeCard);
//     }
// }, 500);