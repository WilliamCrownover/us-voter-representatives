// console.log(Candidate.voteHistoryCard.votes[0]); 


var displayVotes = setInterval(function() {
        if(apiReturns.length >= 8) {
            clearInterval(displayVotes);
                appendVotesData();
                appendExplanationsData();
        }
    }, 500);



function appendVotesData() {
    for(i = 0; i < Candidate.voteHistoryCard.votes.length; i++) {
        $("#vote-history-content").append(`
        <output>Date of Vote: ${Candidate.voteHistoryCard.votes[i].date}</output>
        <output>Bill Number: ${Candidate.voteHistoryCard.votes[i].billID}</output>
        <output>Title: ${Candidate.voteHistoryCard.votes[i].title}</output>
        <output>Description: ${Candidate.voteHistoryCard.votes[i].description}</output>
        <output>Question: ${Candidate.voteHistoryCard.votes[i].question}</output>
        <output>Position: ${Candidate.voteHistoryCard.votes[i].position}</output>
        <output>Result: ${Candidate.voteHistoryCard.votes[i].result}</output>
        <output>Total Yes Votes: ${Candidate.voteHistoryCard.votes[i].totalYes}</output>
        <output>Total No Votes: ${Candidate.voteHistoryCard.votes[i].totalNo}</output>
        <output>Total Present: ${Candidate.voteHistoryCard.votes[i].totalPresent}</output>
        <output>Total Non Votes: ${Candidate.voteHistoryCard.votes[i].totalNotVoting}</output>
        `)
    }
}

function appendExplanationsData() {
    for(i = 0; i < Candidate.voteHistoryCard.explanations.length; i++) {
        $("#vote-history-content").append(`
        <output>Category: ${Candidate.voteHistoryCard.explanations[i].category}</output>
        <output>Date of Vote: ${Candidate.voteHistoryCard.explanations[i].date}</output>
        <output>Explanation given: ${Candidate.voteHistoryCard.explanations[i].text}</output>
        `)
    }
}