// GLOBAL VARIABLES
// API Keys
    var keyOpenFEC = "dkqwoLz9Uml9IbouInXZ4iQpOFR37CpleMzqeisu";
    var keyProPublica = "i6JIadHybCzIr9JNC5O5B2q3qmmPsw9ovJQjlRrJ";
// API URL Constructors
    // openFEC will be designated with "OF" in variable names
    // ProPublica will be designated with "PP" in variable names
    var urlOF = "https://api.open.fec.gov/v1";

// -----Temporary Variables-----
    var district = 01;

// ----------------------------------------------------------------
// FUNCTIONS

function fetchCandidate() {
    var locQueryUrl = `${urlOF}/candidates/search/?
        incumbent_challenge=I&
        sort_nulls_last=false&
        candidate_status=C&
        sort_hide_null=false&
        office=H&
        page=1&
        state=WA&
        election_year=2020&
        sort=name&
        district=${district}&
        per_page=20&
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

fetchCandidate();