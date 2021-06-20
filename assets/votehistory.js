$(document).ready(function(){
    $('.collapsible').collapsible();
  });

var displayVotes = setInterval(function() {
        if(apiReturns.length >= 8) {
            clearInterval(displayVotes);
            writeVoterInfoCard();
                // appendVotesData(); 
                // appendExplanationsData(); 
        }
    }, 500);

function appendVotesData() {
    for(i = 0; i < Candidate.voteHistoryCard.votes.length; i++) {
        $("#vote-history-content").append(`
        <ul class="collapsible" data-collapsible="accordion">
            <li>
                <div class="collapsible-header" style="font-weight:bold">Vote History</div>
                <div class="collapsible-body">
                    <p><span style="font-weight:bold">Date of Vote: </span>${Candidate.voteHistoryCard.votes[i].date}</p>
                    <p><span style="font-weight:bold">Bill Number: </span>${Candidate.voteHistoryCard.votes[i].billID}</p>
                    <p><span style="font-weight:bold">Title: </span>${Candidate.voteHistoryCard.votes[i].title}</p>
                    <p><span style="font-weight:bold">Description: </span>${Candidate.voteHistoryCard.votes[i].description}</p>
                    <p><span style="font-weight:bold">Question: </span>${Candidate.voteHistoryCard.votes[i].question}</p>
                    <p><span style="font-weight:bold">Position: </span>${Candidate.voteHistoryCard.votes[i].position}</p>
                    <p><span style="font-weight:bold">Result: </span>${Candidate.voteHistoryCard.votes[i].result}</p>
                    <p><span style="font-weight:bold">Total Yes Votes: </span>${Candidate.voteHistoryCard.votes[i].totalYes}</p>
                    <p><span style="font-weight:bold">Total No Votes: </span>${Candidate.voteHistoryCard.votes[i].totalNo}</p>
                    <p><span style="font-weight:bold">Total Present: </span>${Candidate.voteHistoryCard.votes[i].totalPresent}</p>
                    <p><span style="font-weight:bold">Total Non Votes: </span>${Candidate.voteHistoryCard.votes[i].totalNotVoting}</p>
                </div>
            </li>
        </ul>
        `);
    }
    // $("#vote-history-content").find(".collapsible").collapsible(); 
}

function appendExplanationsData() {
    for(i = 0; i < Candidate.voteHistoryCard.explanations.length; i++) {
        $("#vote-history-content").append(`
        <ul class="collapsible" data-collapsible="accordion">
            <li>
                <div class="collapsible-header" style="font-weight:bold">Missed Votes</div>
                <div class="collapsible-body">
                <p><span style="font-weight:bold">Category: </span>${Candidate.voteHistoryCard.explanations[i].category}</p>
                <p><span style="font-weight:bold">Date of Vote: </span>${Candidate.voteHistoryCard.explanations[i].date}</p>
                <p><span style="font-weight:bold">Explanation given: </span>${Candidate.voteHistoryCard.explanations[i].text}</p>
                </div>
            </li>
        </ul>
        `)
    }
}

function writeVoterInfoCard() {
    appendVotesData(); 
    appendExplanationsData(); 
    $("#vote-history-content").find(".collapsible").collapsible();
}
