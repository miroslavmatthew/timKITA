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
    var tableContent = document.getElementById('table-contents')
    var tableHeader = document.getElementById('table-headers')
    let groupedBy;


    fitur1.addEventListener('click', async function (event) {
      if (event.target.classList.contains('dropdown-item')) {
        let choose = event.target.textContent
        groupedBy = choose;
        selectDropdown.textContent = choose;
        tableContent.innerHTML = ""
        tableHeader.innerHTML = ""
        const responseGroup = await fetch("reqGroupBy?group=" + choose);
        const textGroup = await responseGroup.text();
        const group = JSON.parse(textGroup).group;

        if(group.length > 0){
            let newHeader = document.createElement('th');
            newHeader.textContent = choose;
            tableHeader.appendChild(newHeader)
            
            for(let detail of group){
                let groupName = detail[choose]
                let newRow = document.createElement("tr");
                newRow.className = 'group-row';
                
                let newCol = document.createElement("td");
                newCol.textContent = groupName;
                
                newRow.appendChild(newCol)

                tableContent.appendChild(newRow);
            }
        }

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