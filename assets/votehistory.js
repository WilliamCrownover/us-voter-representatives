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
            <li>
                <div class="collapsible-header" style="font-weight:bold"><span style="font-weight:bold">Title:\u00A0${Candidate.voteHistoryCard.votes[i].title}</span></div>
                <div class="collapsible-body"> 

                    <p><span style="font-weight:bold">Date:\u00A0</span>${Candidate.voteHistoryCard.votes[i].date}</p>
                    <p><span style="font-weight:bold">Bill Number:\u00A0</span>${Candidate.voteHistoryCard.votes[i].billID}</p>
                    <p><span style="font-weight:bold">Description:\u00A0</span>${Candidate.voteHistoryCard.votes[i].description}</p>
                    <p><span style="font-weight:bold">Question:\u00A0</span>${Candidate.voteHistoryCard.votes[i].question}</p>
                    <p><span style="font-weight:bold">Position:\u00A0</span>${Candidate.voteHistoryCard.votes[i].position}</p>
                    <p><span style="font-weight:bold">Result:\u00A0</span>${Candidate.voteHistoryCard.votes[i].result}</p>
                    <p><span style="font-weight:bold">Total Present:\u00A0</span>${Candidate.voteHistoryCard.votes[i].totalPresent}</p>

                    <p><span style="font-weight:bold">Total Yes: </span>${Candidate.voteHistoryCard.votes[i].totalYes}     
                        <span style="font-weight:bold">Total No: </span>${Candidate.voteHistoryCard.votes[i].totalNo}     
                        <span style="font-weight:bold">Total Non Votes: </span>${Candidate.voteHistoryCard.votes[i].totalNotVoting}</p>
                </div>
            </li>
        `);
    }
    // $("#vote-history-content").find(".collapsible").collapsible(); 
}

function appendExplanationsData() {
    for(i = 0; i < Candidate.voteHistoryCard.explanations.length; i++) {
        $("#missed-votes-content").append(`
        <ul class="collapsible" data-collapsible="accordion">
            <li>
                <div class="collapsible-header" style="font-weight:bold"><span style="font-weight:bold">Date of missed vote:\u00A0${Candidate.voteHistoryCard.explanations[i].date}</span></div>
                <div class="collapsible-body">
                <p><span style="font-weight:bold">Category: </span>${Candidate.voteHistoryCard.explanations[i].category}</p>
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
    $("#missed-votes-content").find(".collapsible").collapsible();
}
