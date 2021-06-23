
var infoCardDataId= $("#infoCardDataContainer");


 function displayInfoCard() {  

    

    infoCardDataId.empty();
      infoCardDataId.append(`
         <div class="card" id="info-card">

            <div class="table">
                
                <div class="expend-table" id=infoCardDataContainer class="collapsible" data-collapsible="accordion">
                        <output>Name:${Candidate.infoCard.fullName()}</output>
                        <output>Seat:${Candidate.infoCard.seat()}</output>
                        <output>Party:${Candidate.infoCard.party()}</output>
                </div>
            </div>
        </div>
            `)

     $("#infoCardDataContainer > .collapsible").collapsible();  


    //  console.log(Candidate.infoCard.firstName)
 }

     // displayInfoCard(Candidate.infoCard.fullName());
    // displayInfoCard(Candidate.infoCard.seat());
     //displayInfoCard(Candidate.infoCard.party());
    //displayInfoCard(Candidate.infoCard);

