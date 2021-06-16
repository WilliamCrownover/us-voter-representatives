// GLOBAL VARIABLES
// API Keys
    var keyOpenFEC = "dkqwoLz9Uml9IbouInXZ4iQpOFR37CpleMzqeisu";
    var keyProPublica = "i6JIadHybCzIr9JNC5O5B2q3qmmPsw9ovJQjlRrJ";
// API URL Constructors
    // openFEC will be designated with "OF" in variable and function names
    // ProPublica will be designated with "PP" in variable and function names
    var urlOF = "https://api.open.fec.gov/v1";

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
        }
    }

// -----Temporary Variables-----
    var district = 01;
    var state = "WA"

// ----------------------------------------------------------------
// FUNCTIONS

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
        })
        .catch(function (error) {
            return error;
        });
}

fetchCandidateOF();
fetchCandidatePP();

// Using this to check the API responses and see that the Candidate object functions correctly
var display = setTimeout(function() {
    console.log("The Candidate", Candidate);
    console.log("The Candidate", Candidate.photo());
    console.log("The Candidate", Candidate.infoCard.fullName());
    console.log("The Candidate", Candidate.infoCard.seat());
    console.log("The Candidate", Candidate.infoCard.party());
}, 2000);