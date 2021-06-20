// Elements
var financeDataContainerEl = $("#financeDataContainer");

// Functions
    // Number Formatter
var formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
});

function displayFinances(data) {
    financeDataContainerEl.append(`
        <ul class="collapsible" data-collapsible="accordion">
            <li>
                <div class="collapsible-header">Percentage of Contributions</div>
                <div class="collapsible-body">
                    <div style="background-color: yellow; padding: 3px 5px; width: ${100-(data.grassRootsPercent())}%">Comittee<br> ${100-(data.grassRootsPercent())}%</div>
                    <div style="background-color: green; padding: 3px 5px; width: ${data.grassRootsPercent()}%">Independent<br> ${data.grassRootsPercent()}%</div>
                </div>
            </li>
        </ul>
        <ul class="collapsible" data-collapsible="accordion">
            <li>
                <div class="collapsible-header">Total Raised: ${formatter.format(data.totalRaised)}</div>
                <div class="collapsible-body">
                    <p>Comittee: ${formatter.format(data.nonIndependentContributions())}</p>
                    <p>Independent: ${formatter.format(data.independentContributions)}</p>
                </div>
            </li>
        </ul>
        <p style="margin-left: 15px">Expenditure: ${formatter.format(data.expenditure)}</p>
        <ul class="collapsible" data-collapsible="accordion">
            <li>
                <div class="collapsible-header">Current War Chest: ${formatter.format(data.currentStash)}</div>
                <div class="collapsible-body">Net Gain or Loss: ${formatter.format(data.netGainLoss())}</div>
            </li>
        </ul>
    `)
}

// var displayFinanceData = setInterval(function() {
//     if(apiReturns.length === 8) {
//         clearInterval(displayFinanceData);
//         displayFinances(Candidate.financeCard);
//     }
// }, 500);