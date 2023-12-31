const fitur1 = document.querySelector("#fitur1");
const fitur2 = document.querySelector("#fitur2");
const aggregasi = document.querySelector("#aggregasi");

const listFitur = ['ID', 'Year_Birth',	'Education',	'Marital_Status',	'Income',	'Kidhome',	'Teenhome',	'Dt_Customer',	'Recency', 'MntWines',	'MntFruits',	'MntMeatProducts',	'MntFishProducts',	'MntSweetProducts',	'MntGoldProds',	'NumDealsPurchases',	'NumWebPurchases',	'NumCatalogPurchases',	'NumStorePurchases',	'NumWebVisitsMonth', 'AcceptedCmp3'	,'AcceptedCmp4',	'AcceptedCmp5'	, 'AcceptedCmp1', 'AcceptedCmp2',	'Complain'	,'Z_CostContact',	'Z_Revenue'	, 'Response'];
const indexNumerikal = [4, 5, 6, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19];


for(let i = 0; i < listFitur.length; i++){
    let content1 = `<li><a class="dropdown-item">${listFitur[i]}</a></li>`;
    let content2 = 
    `<li> 
        <div class="form-check">
            <input type="checkbox" class="form-check-input" id="${listFitur[i]}" value="${listFitur[i]}">
            <label  class="form-check-label" for="${listFitur[i]}" onclick="event.stopPropagation()">${listFitur[i]}</label> 
        </div>
    </li> `;
    fitur1.innerHTML += content1;
    if(indexNumerikal.includes(i)) fitur2.innerHTML += content2;
}

const dpBtn = document.getElementById('multiSelectDropdown'); 
const aggBtn = document.getElementById('selectAgg')
var tableContent = document.getElementById('table-contents')
var tableHeader = document.getElementById('table-headers')

let groupedBy, aggMethod, aggCols;

document.addEventListener('DOMContentLoaded', function () {
    var selectDropdown = document.getElementById('selectDropdown');
    
    
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
        aggBtn.disabled = false;
        handleCB();
    }
});

aggregasi.addEventListener('click', async function (event) {
    if (event.target.classList.contains('dropdown-item')) {
        let choose = event.target.textContent
        aggMethod = choose;
        aggBtn.textContent = choose;
        dpBtn.disabled = false;
        handleCB();
    }
});
});
const chBoxes = document.querySelectorAll('.dropdown-menu input[type="checkbox"]'); 
const items = document.querySelectorAll('.dropdown-menu input'); 
const rows = document.getElementsByClassName('group-row');
let mySelectedListItems = []; 

async function handleCB() { 
    mySelectedListItems = []; 
    let mySelectedListItemsText = ''; 
    
    chBoxes.forEach((checkbox) => { 
        if (checkbox.checked) { 
            mySelectedListItems.push(checkbox.value); 
            mySelectedListItemsText += checkbox.value + ', '; 
        } 
    }); 
    
    for(let i = tableHeader.children.length-1; i > 0; i--){
        tableHeader.removeChild(tableHeader.children[i]);
    }
    
    for(let row of rows){
        for(let i = row.children.length-1; i > 0; i--){
            row.removeChild(row.children[i]);
        }
    }


    for(let item of mySelectedListItems){
        let newHeader = document.createElement('th');
        newHeader.textContent = aggMethod + " of " + item;
        tableHeader.appendChild(newHeader)
        
        
        const responseRes = await fetch(`reqGroupByRes?group=${groupedBy}&agg=${aggMethod}&col=${item}`);
        const textRes = await responseRes.text();
        const result = JSON.parse(textRes).result;

        for(let i=0; i < result.length; i++){
            let newCol = document.createElement("td");
            newCol.textContent = result[i].result;
            
            rows[i].appendChild(newCol)
        }
    }
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