// GLOBAL VARIABLES
// API Keys
    var keyOpenFEC = "dkqwoLz9Uml9IbouInXZ4iQpOFR37CpleMzqeisu";
    var keyProPublica = "i6JIadHybCzIr9JNC5O5B2q3qmmPsw9ovJQjlRrJ";
// API URL Constructors
    // openFEC will be designated with "OF" in variable and function names
    // ProPublica will be designated with "PP" in variable and function names
    var urlOF = "https://api.open.fec.gov/v1";

// Tracking Variables
    var apiReturns = [];

// Candidate Data Object
    var Candidate = {
        idOF: "",
        idPP: "",
        photo: function() {
            return `https://theunitedstates.io/images/congress/450x550/${this.idPP}.jpg`;
        },
        infoCard: {
            firstName: "",
            middleInitial: "",
            lastName: "",
            fullName: function() {
                if(this.middleInitial) {
                    return `${this.firstName} ${this.middleInitial} ${this.lastName}`;
                } else {
                    return `${this.firstName} ${this.lastName}`;
                }
            },
            state: "",
            district: "",
            seat: function() {
                return `${this.state} Congressional District ${this.district}`;
            },
            partyShort: "",
            party: function() {
                if(this.partyShort === "DEM") {
                    return "Democratic Party";
                } else if(this.partyShort === "REP") {
                    return "Republican Party";
                } else {
                    return "Third-party or Independent"
                }
            }
        },
        financeCard: {
            totalRaised: "",
            independentContributions: "",
            nonIndependentContributions: function() {
                return (this.totalRaised - this.independentContributions).toFixed(2);
            },
            grassRootsPercent: function() {
                return ((this.independentContributions / this.totalRaised) * 100).toFixed(2);
            },
            expenditure: "",
            currentStash: "",
            netGainLoss: function() {
                return (this.totalRaised - this.expenditure).toFixed(2);
            }
        },
        supportersCard: {
            support: [],
            oppose: [],
        }
    }

// -----Temporary Variables-----
    var district = 04;
    var state = "OH"

// ----------------------------------------------------------------
// FUNCTIONS

function fetchCandidateTotalsOF() {
    var locQueryUrl = `${urlOF}/candidate/${Candidate.idOF}/totals/?
        sort_nulls_last=false&
        sort_hide_null=false&
        page=1&
        sort_null_only=false&
        api_key=${keyOpenFEC}&
        cycle=2020`
        .replace(/\s/g, '');

    fetch(locQueryUrl)
        .then(function (response) {
            if(!response.ok) {
                throw response.json();
            }
            return response.json();
        })
        .then(function (locRes) {
            console.log("openFEC Candidate Totals", locRes);
            Candidate.financeCard.totalRaised = locRes.results[0].contributions;
            Candidate.financeCard.expenditure = locRes.results[0].disbursements;
            Candidate.financeCard.independentContributions = locRes.results[0].individual_contributions;
            Candidate.financeCard.currentStash = locRes.results[0].last_cash_on_hand_end_period;

            apiReturns.push(true);
        })
        .catch(function (error) {
            return error;
        });
}

function parseSupporters(array) {
    var totalSupport = 0;
    var totalOppose = 0;
    for(var i = 0; i < array.length; i++) {
        var obj = {};
        if(array[i].support_oppose_indicator === "S") {
            totalSupport += array[i].total;
            obj["totalSpent"] = array[i].total;
            obj["committeeName"] = array[i].committee_name;
            Candidate.supportersCard.support.push(obj);
        } else {
            totalOppose += array[i].total;
            obj["totalSpent"] = array[i].total;
            obj["committeeName"] = array[i].committee_name;
            Candidate.supportersCard.oppose.push(obj);
        }
    }
    Candidate.supportersCard["totalSupportExpense"] = totalSupport.toFixed(2);
    Candidate.supportersCard["totalOpposeExpense"] = totalOppose.toFixed(2);
}

function fetchCandidateSupportOF() {
    var locQueryUrl = `${urlOF}/schedules/schedule_e/by_candidate/?
    sort_nulls_last=false&
    candidate_id=${Candidate.idOF}&
    election_full=true&
    sort_hide_null=false&
    page=1&
    per_page=50&
    sort_null_only=false&
    api_key=${keyOpenFEC}&
    cycle=2020`
    .replace(/\s/g, '');
    
    fetch(locQueryUrl)
        .then(function (response) {
            if(!response.ok) {
                throw response.json();
            }
            return response.json();
        })
        .then(function (locRes) {
            console.log("openFEC Candidate Support Schedule_e", locRes);
            parseSupporters(locRes.results);

            apiReturns.push(true);
        })
        .catch(function (error) {
            return error;
        });
}

function fetchCandidateOF() {
    var locQueryUrl = `${urlOF}/candidates/search/?
        incumbent_challenge=I&
        sort_nulls_last=false&
        candidate_status=C&
        sort_hide_null=false&
        office=H&
        page=1&
        state=${state}&
        election_year=2020&
        district=${district}&
        sort_null_only=false&
        api_key=${keyOpenFEC}&
        cycle=2022`
        .replace(/\s/g, '');

    fetch(locQueryUrl)
        .then(function (response) {
            if(!response.ok) {
                throw response.json();
            }
            return response.json();
        })
        .then(function (locRes) {
            console.log("openFEC Candidate Search", locRes);
            Candidate.idOF = locRes.results[0].candidate_id;
            Candidate.infoCard.district = locRes.results[0].district_number;
            Candidate.infoCard.partyShort = locRes.results[0].party;
            Candidate.infoCard.state = locRes.results[0].state;

            fetchCandidateTotalsOF();
            fetchCandidateSupportOF();

            apiReturns.push(true);
        })
        .catch(function (error) {
            return error;
        });
}

function fetchCandidatePP() {
    var locQueryUrl = `https://api.propublica.org/congress/v1/members/house/${state}/${district}/current.json`;

    fetch(locQueryUrl, {
        headers: {
        "X-API-Key": keyProPublica
        }
    })
        .then(function (response) {
            if(!response.ok) {
                throw response.json();
            }
            return response.json();
        })
        .then(function (locRes) {
            console.log("ProPublica Candidate Search", locRes);
            Candidate.infoCard.firstName = locRes.results[0].first_name;
            Candidate.idPP = locRes.results[0].id;
            Candidate.infoCard.lastName = locRes.results[0].last_name;
            Candidate.infoCard.middleInitial = locRes.results[0].middle_name;

            apiReturns.push(true);
        })
        .catch(function (error) {
            return error;
        });
}

fetchCandidateOF();
fetchCandidatePP();

// Using this to check the API responses and see that the Candidate object functions correctly
var display = setInterval(function() {
    if(apiReturns.length === 4) {
        clearInterval(display);
        console.log("The Candidate", Candidate);
        console.log("The Candidate Photo:", Candidate.photo());
        console.log("The Candidate Full Name:", Candidate.infoCard.fullName());
        console.log("The Candidate Seat:", Candidate.infoCard.seat());
        console.log("The Candidate Party:", Candidate.infoCard.party());
        console.log("The Candidate Commitee Contributions:", Candidate.financeCard.nonIndependentContributions());
        console.log("The Candidate Grassroots Percentage:", Candidate.financeCard.grassRootsPercent());
        console.log("The Candidate Net Gain or Loss to Stash:", Candidate.financeCard.netGainLoss());
        console.log("The Candidate Supporters & Opposition:", Candidate.supportersCard);
    }
}, 500);