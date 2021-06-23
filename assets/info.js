
var infoCardDataId= $("#infoCardDataContainer");
var repPhotoEL = $("#repPhoto");


function displayInfoCard() {  
    infoCardDataId.empty();
    repPhotoEL.empty();

    console.log(Candidate.photo());

    repPhotoEL.append(`
        <img src="${Candidate.photo()}" onerror="this.style.display='none'">
    `)
    infoCardDataId.append(`
        <p style="margin-left: 15%"><span style="font-weight:bold">Name:&#160</span>${Candidate.infoCard.fullName()}</p>
        <p style="margin-left: 15%"><span style="font-weight:bold">Seat:&#160</span>${Candidate.infoCard.seat()}</p>
        <p style="margin-left: 15%"><span style="font-weight:bold">Party:&#160</span>${Candidate.infoCard.party()}</p>
    `)

    $("#infoCardDataContainer > .collapsible").collapsible();  


    //  console.log(Candidate.infoCard.firstName)
}

    // displayInfoCard(Candidate.infoCard.fullName());
// displayInfoCard(Candidate.infoCard.seat());
    //displayInfoCard(Candidate.infoCard.party());
//displayInfoCard(Candidate.infoCard);

