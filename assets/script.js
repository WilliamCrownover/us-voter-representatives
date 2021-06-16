// GLOBAL VARIABLES
// API Keys
    var keyOpenFEC = "dkqwoLz9Uml9IbouInXZ4iQpOFR37CpleMzqeisu";
    var keyProPublica = "i6JIadHybCzIr9JNC5O5B2q3qmmPsw9ovJQjlRrJ";
// API URL Constructors
    // openFEC will be designated with "OF" in variable and function names
    // ProPublica will be designated with "PP" in variable and function names
    var urlOF = "https://api.open.fec.gov/v1";

// -----Temporary Variables-----
    var district = 01;

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
        state=WA&
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
        })
        .catch(function (error) {
            return error;
        });
}

function fetchCandidatePP() {
    var locQueryUrl = `https://api.propublica.org/congress/v1/members/house/WA/${district}/current.json`;

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
        })
        .catch(function (error) {
            return error;
        });
}

fetchCandidateOF();
fetchCandidatePP();