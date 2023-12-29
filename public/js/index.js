const fitur1 = document.querySelector("#fitur1");
const fitur2 = document.querySelector("#fitur2");

const listFitur = ['ID', 'Year_Birth',	'Education',	'Marital_Status',	'Income',	'Kidhome',	'Teenhome',	'Dt_Customer',	'Recency', 'MntWines',	'MntFruits',	'MntMeatProducts',	'MntFishProducts',	'MntSweetProducts',	'MntGoldProds',	'NumDealsPurchases',	'NumWebPurchases',	'NumCatalogPurchases',	'NumStorePurchases',	'NumWebVisitsMonth', 'AcceptedCmp3'	,'AcceptedCmp4',	'AcceptedCmp5'	, 'AcceptedCmp1', 'AcceptedCmp2',	'Complain'	,'Z_CostContact',	'Z_Revenue'	, 'Response'];
const indexNumerikal = [4, 5, 6, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19];


for(let i = 0; i < listFitur.length; i++){
    let content1 = `<li><a class="dropdown-item">${listFitur[i]}</a></li>`;
    let content2 = `<li> 
    <label> 
      <input type="checkbox" value="${listFitur[i]}"> 
          ${listFitur[i]}
        </input   
      </label> 
  </li> `;
    fitur1.innerHTML += content1;
    if(indexNumerikal.includes(i)) fitur2.innerHTML += content2;
}

const dpBtn = document.getElementById('multiSelectDropdown'); 
document.addEventListener('DOMContentLoaded', function () {
    var selectDropdown = document.getElementById('selectDropdown');

    fitur1.addEventListener('click', function (event) {
      if (event.target.classList.contains('dropdown-item')) {
        selectDropdown.textContent = event.target.textContent;
        dpBtn.disabled = false;
      }
    });
});
const chBoxes = document.querySelectorAll('.dropdown-menu input[type="checkbox"]'); 
const items = document.querySelectorAll('.dropdown-menu input'); 
let mySelectedListItems = []; 

function handleCB() { 
    mySelectedListItems = []; 
    let mySelectedListItemsText = ''; 

    chBoxes.forEach((checkbox) => { 
        if (checkbox.checked) { 
            mySelectedListItems.push(checkbox.value); 
            mySelectedListItemsText += checkbox.value + ', '; 
        } 
    }); 

    dpBtn.innerText = mySelectedListItems.length > 0 ? mySelectedListItemsText.slice(0, -2) : 'Select'; 
} 

chBoxes.forEach((checkbox) => { 
    checkbox.addEventListener('change', handleCB); 
}); 


async function inisiasiSummary(){
    const responseSummary = await fetch("reqSummaryData");
    const textSummary = await responseSummary.text();
    const summary = JSON.parse(textSummary).summary;

    if(summary.length > 0){
        let curr = summary[0];
        let konsumen = curr.jumlah_pembeli
        let penghasilan = parseFloat(curr.penghasilan).toFixed(2);
        let currDate = new Date();
        let currYear = Number(currDate.getFullYear());
        let umur = currYear - parseInt(curr.tahun_lahir);

        document.querySelector("#summary-konsumen").textContent = konsumen;
        document.querySelector("#summary-umur").textContent = umur;
        document.querySelector("#summary-income").textContent = penghasilan;    
    }
}

inisiasiSummary()