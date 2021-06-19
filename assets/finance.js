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
        <div class="finance-table">
            <output>Total Raised: ${formatter.format(data.totalRaised)}</output>
            <output>Comittee: ${formatter.format(data.nonIndependentContributions())}</output>
            <output>Independent: ${formatter.format(data.independentContributions)}</output>
            <output>Expenditure: ${formatter.format(data.expenditure)}</output>
            <output>Current War Chest: ${formatter.format(data.currentStash)}</output>
            <output>Net Gain or Loss to WarChest: ${formatter.format(data.netGainLoss())}</output>
        </div>
    `)
}