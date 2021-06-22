
var infoCardDataId= $("#infoCardDataContainer");



 function displayInfoCard() {  

    infoCardDataId.empty();
      infoCardDataId.append(`
      <div class="card" id="info-card" class="collapsible" data-collapsible="accordion">

                <div class="card-content" class="collapsible" data-collapsible="accordion">
                    <img src="./assets/images/education_icon_142625.png" alt="info" width="100" height="100">
                    <p>Information Card</p>
                </div>

                <div class="table" class="collapsible" data-collapsible="accordion">
                    
                    <div class="expend-table" id=infoCardDataContainer class="collapsible" data-collapsible="accordion">
                         <output>Name:${data.fullName()}</output>
                        <output>Seat:${data.seat()}</output>
                        <output>Party:${data.party()}</output>
                    </div>
                </div>
            </div>
            `)

     $('.collapsible').collapsible();  

    
 }



displayInfoCard(infoCard)