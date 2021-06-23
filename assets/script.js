// GLOBAL VARIABLES
// API Keys
    var keyOpenFEC = "dkqwoLz9Uml9IbouInXZ4iQpOFR37CpleMzqeisu";
    var keyProPublica = "i6JIadHybCzIr9JNC5O5B2q3qmmPsw9ovJQjlRrJ";
// API URL Constructors
    // openFEC will be designated with "OF" in variable and function names
    // ProPublica will be designated with "PP" in variable and function names
    var urlOF = "https://api.open.fec.gov/v1";

// Elements
    var repSearchFormEl = $("#repSearchForm");
    var stateSelectEl = $("#stateSelect");
    var districtSelect = $("#districtSelect");
    var noDistrictText = $("#noDistrict");
    var loadingTextEl = $("#loadingText");

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
                return parseInt(((this.independentContributions / this.totalRaised) * 100).toFixed(2));
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
            totalSupportExpense: 0.00,
            totalOpposeExpense: 0.00
        },
        voteHistoryCard: {
            explanations: [],
            votes: []
        },
        travelCard: {
            tripsCandidate: [],
            tripsOther: []
        }
    };

// Search Bar Variables
    var districtOF;
    var districtPP;
    var state;

// ----------------------------------------------------------------
// FUNCTIONS

function loadStateSelection() {
    for(var i = 0; i < stateData.length; i++) {
        stateSelectEl.append(`
            <option value="${stateData[i].abrv}">${stateData[i].name}</option>
        `);
    }
}

function loadDistrictSelection() {
    for(var i = 0; i < 53; i++) {
        districtSelect.append(`
            <option value="${String(i+1).padStart(2,"0")}">${i+1}</option>
        `)
    }
}

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

            displayFinances(Candidate.financeCard);

            apiReturns.push(true);
        })
        .catch(function (error) {
            return error;
        });
}

function parseSupporters(array) {
    var totalSupport = Candidate.supportersCard.totalSupportExpense;
    var totalOppose = Candidate.supportersCard.totalOpposeExpense;
    
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
    
    Candidate.supportersCard.totalSupportExpense = parseInt(totalSupport.toFixed(2));
    Candidate.supportersCard.totalOpposeExpense = parseInt(totalOppose.toFixed(2));
}

function fetchCandidateAdvertismentSupportOF() {
    var locQueryUrl = `${urlOF}/communication_costs/by_candidate/?
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
            console.log("openFEC Candidate Support Advertisments", locRes);
            
            if(locRes.pagination.count > 0) {
                parseSupporters(locRes.results);
            }

// Sending data to supporters.js
            displaySupporters(Candidate.supportersCard);

            apiReturns.push(true);
        })
        .catch(function (error) {
            return error;
        });
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

            Candidate.supportersCard.totalSupportExpense = 0;
            Candidate.supportersCard.totalOpposeExpense = 0;
            Candidate.supportersCard.support = [];
            Candidate.supportersCard.oppose = [];
            
            if(locRes.pagination.count > 0) {
                parseSupporters(locRes.results);
            }

            fetchCandidateAdvertismentSupportOF();

            apiReturns.push(true);
        })
        .catch(function (error) {
            return error;
        });
}

function fetchCandidateAltMethodOF() {
    var locQueryUrl = `${urlOF}/candidates/?
        api_key=${keyOpenFEC}&
        page=1&
        office=H&
        sort_null_only=false&
        sort_nulls_last=false&
        sort_hide_null=false&
        incumbent_challenge=I&
        sort=name&cycle=2020&
        district=${districtOF}&
        candidate_status=F&
        state=${state}`
        .replace(/\s/g, '');

    fetch(locQueryUrl)
        .then(function (response) {
            if(!response.ok) {
                throw response.json();
            }
            return response.json();
        })
        .then(function (locRes) {
            console.log("openFEC @@@@@ Second Try Candidate Search", locRes);

            if(locRes.results.length === 0) {
                console.log("STILL FAILED!");
            }
            
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
        district=${districtOF}&
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

            if(locRes.results.length === 0) {
                fetchCandidateAltMethodOF();
                return
            }
            
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

function parsePersonalExplanations(array) {
    var objOne = {};
    objOne["category"] = array[0].category;
    objOne["date"] = array[0].date;
    objOne["text"] = array[0].text;
    Candidate.voteHistoryCard.explanations.push(objOne);
    
    for(var i = 1; i < array.length; i++) {
        if(array[i].text !== array[i-1].text) {
            var obj = {};
            obj["category"] = array[i].category;
            obj["date"] = array[i].date;
            obj["text"] = array[i].text;
            Candidate.voteHistoryCard.explanations.push(obj);
        }
    }    
}

function fetchCandidatePersonalExplanationsPP() {
    var locQueryUrl = `https://api.propublica.org/congress/v1/members/${Candidate.idPP}/explanations/117/votes.json`;

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
            console.log("ProPublica Personal Explanation", locRes);

            Candidate.voteHistoryCard.explanations = [];

            if(locRes.num_results > 0) {
                parsePersonalExplanations(locRes.results);
            }

            writeVoterInfoCard();
            
            apiReturns.push(true);
        })
        .catch(function (error) {
            return error;
        });
}

function parseVotePositions(array) {
    for(var i = 0; i < array.length; i++) {
        var obj = {};
        obj["date"] = array[i].date;
        obj["billID"] = array[i].bill.number;
        obj["title"] = array[i].description;
        obj["description"] = array[i].bill.title || "";
        obj["question"] = array[i].question;
        obj["position"] = array[i].position;
        obj["result"] = array[i].result;
        obj["totalYes"] = array[i].total.yes;
        obj["totalNo"] = array[i].total.no;
        obj["totalPresent"] = array[i].total.present;
        obj["totalNotVoting"] = array[i].total.not_voting;
        Candidate.voteHistoryCard.votes.push(obj);
    }
}

function fetchCandidateVotePositions() {
    var locQueryUrl = `https://api.propublica.org/congress/v1/members/${Candidate.idPP}/votes.json`;

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
            console.log("ProPublica Vote Positions", locRes);

            Candidate.voteHistoryCard.votes = [];
            
            if(locRes.results[0].num_results > 0) {
                parseVotePositions(locRes.results[0].votes);
            }

            fetchCandidatePersonalExplanationsPP();

            apiReturns.push(true);
        })
        .catch(function (error) {
            return error;
        });
}

function parseTrips(array) {
    for(var i = 0; i < array.length; i++) {
        var obj = {};
        if(array[i].is_member === 1 && array[i].filing_type === "Original") {
            obj["departure"] = array[i].departure_date;
            obj["return"] = array[i].return_date;
            obj["destination"] = array[i].destination;
            obj["sponsor"] = array[i].sponsor;
            Candidate.travelCard.tripsCandidate.push(obj);
        } else if(array[i].is_member === 0 && array[i].filing_type === "Original") {
            obj["traveler"] = array[i].traveler;
            obj["departure"] = array[i].departure_date;
            obj["return"] = array[i].return_date;
            obj["destination"] = array[i].destination;
            obj["sponsor"] = array[i].sponsor;
            Candidate.travelCard.tripsOther.push(obj);
        }
    }
}

function fetchCandidateTravels() {
    var locQueryUrl = `https://api.propublica.org/congress/v1/members/${Candidate.idPP}/private-trips.json`;

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
            console.log("ProPublica Trips", locRes);
            
            Candidate.travelCard.tripsCandidate = [];
            Candidate.travelCard.tripsOther = [];

            if(locRes.num_results > 0) {
                parseTrips(locRes.results);
            }
//calls to generate travel card
            fillTravelCard(Candidate.travelCard.tripsCandidate);

            apiReturns.push(true);
        })
        .catch(function (error) {
            return error;
        });
}

function fetchCandidatePP() {
    var locQueryUrl = `https://api.propublica.org/congress/v1/members/house/${state}/${districtPP}/current.json`;

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
            
            fetchCandidateVotePositions();
            fetchCandidateTravels();

            apiReturns.push(true);
        })
        .catch(function (error) {
            return error;
        });
}

function noDistrict() {
    noDistrictText.removeClass("hidden");
    var displayNoDistrictText = setTimeout(function() {
        noDistrictText.addClass("hidden");
    }, 3500);
}

function handleSearchSubmit(event) {
    event.preventDefault();

    state = stateSelectEl.val();
    lastSearched.state = state;
    var tempDistrictNumber = parseInt(districtSelect.val());

    for(var i = 0; i < stateData.length; i++) {
        if(stateData[i].abrv === state) {
            if(tempDistrictNumber > stateData[i].districtCount) {
                console.log("No District");
                noDistrict();
                return
            }
        }
    }
    
    if(oneDistrictStates.includes(state)) {
        districtOF = "00";
    } else {
        districtOF = districtSelect.val();
    }

    districtPP = districtSelect.val();
    lastSearched.district = districtPP;

    apiReturns = [];

    fetchCandidateOF();
    fetchCandidatePP();

    loadingTextEl.removeClass("hidden");

    setLastSearched();

    var loading = setInterval(function() {
        if(apiReturns.length === 8) {
            loadingTextEl.addClass("hidden");
            console.log("-----Loaded-----");
            displayInfoCard();
            clearInterval(loading);
        }
    }, 500);
}

loadStateSelection();
loadDistrictSelection();

repSearchFormEl.on("submit", handleSearchSubmit)

// Using this to check the API responses and see that the Candidate object functions correctly
var display = setInterval(function() {
    if(apiReturns.length === 8) {
        clearInterval(display);
         console.log("The Candidate", Candidate);
        // console.log("The Candidate Photo:", Candidate.photo());
        // console.log("The Candidate Full Name:", Candidate.infoCard.fullName());
        // console.log("The Candidate Seat:", Candidate.infoCard.seat());
        // console.log("The Candidate Party:", Candidate.infoCard.party());
        // console.log("The Candidate Commitee Contributions:", Candidate.financeCard.nonIndependentContributions());
        // console.log("The Candidate Grassroots Percentage:", Candidate.financeCard.grassRootsPercent());
        // console.log("The Candidate Net Gain or Loss to Stash:", Candidate.financeCard.netGainLoss());
        // console.log("The Candidate Supporters & Opposition:", Candidate.supportersCard);
        // console.log("The Candidate Vote History:", Candidate.voteHistoryCard);
        // console.log("The Candidate Trips:", Candidate.travelCard);

        // This is needed to delay the collapsible method so it applies properly
        setTimeout(function() {
            $('.collapsible').collapsible();
        }, 500);
    }
}, 500);