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
        <div class="finance-ratio" style="padding: 15px">
            <p style="margin: 5px 0">Percentage of Contributions</p>
            <div style="background-color: yellow; padding: 3px 5px; width: ${100-(data.grassRootsPercent())}%">Comittee<br> ${100-(data.grassRootsPercent())}%</div>
            <div style="background-color: green; padding: 3px 5px; width: ${data.grassRootsPercent()}%">Independent<br> ${data.grassRootsPercent()}%</div>
        </div>
        <div class="finance-table">
            <output>Total Raised: ${formatter.format(data.totalRaised)}</output>
            <output>Comittee: ${formatter.format(data.nonIndependentContributions())}</output>
            <output>Independent: ${formatter.format(data.independentContributions)}</output>
            <output>Expenditure: ${formatter.format(data.expenditure)}</output>
            <output>Current War Chest: ${formatter.format(data.currentStash)}</output>
            <output>Net Gain or Loss: ${formatter.format(data.netGainLoss())}</output>
        </div>
    `)
}