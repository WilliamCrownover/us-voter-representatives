
var infoCardDataId= $("#infoCardDataContainer");


 function displayInfoCard(data) {  

    infoCardDataId.empty();
      infoCardDataId.append(`
      <div class="card" id="info-card" class="collapsible" data-collapsible="accordion">

                <div class="card-content" class="collapsible" data-collapsible="accordion">
                    <img src="./assets/images/education_icon_142625.png" alt="info" width="100" height="100">
                    <p>Information Card</p>
                </div>

                <div class="table" class="collapsible" data-collapsible="accordion">
                    
                    <div class="expend-table" id=infoCardDataContainer class="collapsible-body">
                         <output>Name:${Candidate.infoCard.fullName()}</output>
                         <output>Seat:${Candidate.infoCard.seat()}</output>
                         <output>Party:${Candidate.infoCard.party()}</output>
                    </div>
                </div>
            </div>
            `)

     $("#infoCardDataContainer > .collapsible").collapsible();  

    
 }

  // displayInfoCard(Candidate.infoCard.fullName());
    // displayInfoCard(Candidate.infoCard.seat());
     //displayInfoCard(Candidate.infoCard.party());
 
    displayInfoCard(Candidate.infoCard.fullName);

