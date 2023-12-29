const fitur1 = document.querySelector("#fitur1");
const fitur2 = document.querySelector("#fitur2");

const listFitur = ['ID', 'Year_Birth',	'Education',	'Marital_Status',	'Income',	'Kidhome',	'Teenhome',	'Dt_Customer',	'Recency', 'MntWines',	'MntFruits',	'MntMeatProducts',	'MntFishProducts',	'MntSweetProducts',	'MntGoldProds',	'NumDealsPurchases',	'NumWebPurchases',	'NumCatalogPurchases',	'NumStorePurchases',	'NumWebVisitsMonth', 'AcceptedCmp3'	,'AcceptedCmp4',	'AcceptedCmp5'	, 'AcceptedCmp1', 'AcceptedCmp2',	'Complain'	,'Z_CostContact',	'Z_Revenue'	, 'Response'];
const indexNumerikal = [4, 5, 6, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19];


for(let fitur of listFitur){
    let content1 = `<li><a class="dropdown-item">${fitur}</a></li>`;
    let content2 = `<li> 
    <label> 
      <input type="checkbox" 
             value="${fitur}"> 
          ${fitur}
      </label> 
  </li> `;
    fitur1.innerHTML += content1;
    fitur2.innerHTML += content2;
}

document.addEventListener('DOMContentLoaded', function () {
    var selectDropdown = document.getElementById('selectDropdown');

    fitur1.addEventListener('click', function (event) {
      if (event.target.classList.contains('dropdown-item')) {
        selectDropdown.textContent = event.target.textContent;
      }
    });
});
const chBoxes = document.querySelectorAll('.dropdown-menu input[type="checkbox"]'); 
const dpBtn = document.getElementById('multiSelectDropdown'); 
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
