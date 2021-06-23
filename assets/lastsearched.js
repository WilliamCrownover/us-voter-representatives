var lastSearched = {
    state: '',
    district: ''
};

function setLastSearched() {
    var lastSearchedTimer = setInterval(function() {
        if(lastSearchedDistrict.state) {
            clearInterval(lastSearchedTimer);
            localStorage.setItem("lastSearchedDistrict", JSON.stringify(lastSearchedDistrict)); 
        }
    }, 500);
}

function displayLastSearch() {
    $("#previousSearch").empty();
    $("#previousSearch").append(`
        <h6>Previous Search: ${lastSearchedDistrict.state} - ${lastSearchedDistrict.district}</h6>
    `)
}