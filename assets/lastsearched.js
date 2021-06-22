var lastSearched = {
    state: '',
    district:0
};

function setLastSearched() {
    var lastSearchedTimer = setInterval(function() {
        if(lastSearched.state) {
            clearInterval(lastSearchedTimer);
            localStorage.setItem("lastSearchedDistrict", JSON.stringify(lastSearched)); 
        }
    }, 500);
}

