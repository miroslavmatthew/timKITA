const fitur1 = document.querySelector("#fitur1");
const fitur2 = document.querySelector("#fitur2");
const aggregasi = document.querySelector("#aggregasi");
const canvas = document.querySelector("#canvas");
const listFitur = ['ID', 'Year_Birth',	'Education',	'Marital_Status',	'Income',	'Kidhome',	'Teenhome',	'Dt_Customer',	'Recency', 'MntWines',	'MntFruits',	'MntMeatProducts',	'MntFishProducts',	'MntSweetProducts',	'MntGoldProds',	'NumDealsPurchases',	'NumWebPurchases',	'NumCatalogPurchases',	'NumStorePurchases',	'NumWebVisitsMonth', 'AcceptedCmp3'	,'AcceptedCmp4',	'AcceptedCmp5'	, 'AcceptedCmp1', 'AcceptedCmp2',	'Complain'	,'Z_CostContact',	'Z_Revenue'	, 'Response'];
const indexNumerikal = [4, 5, 6, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19];
const aggregateFunction = ['SUM','COUNT','AVG','MIN','MAX'];

for(let i = 0; i < listFitur.length; i++){
    let content1 = `<li><a class="dropdown-item">${listFitur[i]}</a></li>`;
    let content2 = 
    `<li><a class="dropdown-item2">${listFitur[i]}</a></li>`;
    fitur2.innerHTML += content2;
    if(!indexNumerikal.includes(i)) fitur1.innerHTML += content1;
}

const dpBtn = document.getElementById('multiSelectDropdown'); 
const aggBtn = document.getElementById('selectAgg')
let groupCategory= [];
let groupedBy, aggMethod, aggCols,colome,laber;

document.addEventListener('DOMContentLoaded', function () {
    var selectDropdown = document.getElementById('selectDropdown');
    
    
    
    fitur1.addEventListener('click', async function (event) {
        
      if (event.target.classList.contains('dropdown-item')) {
        let choose = event.target.textContent
        groupedBy = choose;
        selectDropdown.textContent = choose;
        const responseGroup = await fetch("reqGroupBy?group=" + choose);
        const textGroup = await responseGroup.text();
        const group = JSON.parse(textGroup).group;
        groupCategory=[];
        if(group.length > 0){
            for(let detail of group){
                let groupName = detail[choose]
                groupCategory.push(groupName);
            }
            
        }
        if(colome!=undefined){
          const responseRes = await fetch(`reqGroupByRes?group=${groupedBy}&agg=${aggMethod}&col=${colome}`);
            const textRes = await responseRes.text();
            const result = JSON.parse(textRes).result;
                dataCategory=[];
                laber = aggMethod + " of " + colome;
            for(let i=0; i < result.length; i++){
                dataCategory.push(result[i].result);
            }
        }
        generateBarchart();
        aggBtn.disabled = false;
    }
});
aggregasi.addEventListener('click', async function (event) {
    if (event.target.classList.contains('dropdown-item')) {
        let choose = event.target.textContent
        aggMethod = choose;
        aggBtn.textContent = choose;
        dpBtn.disabled = false;
        if(colome!=undefined){
            const responseRes = await fetch(`reqGroupByRes?group=${groupedBy}&agg=${aggMethod}&col=${colome}`);
            const textRes = await responseRes.text();
            const result = JSON.parse(textRes).result;
                dataCategory=[];
                laber = aggMethod + " of " + colome;
            for(let i=0; i < result.length; i++){
                dataCategory.push(result[i].result);
            }
        }
        generateBarchart();
    }
});
});

let dataCategory=[];

fitur2.addEventListener('click', async function (event) {
    if (event.target.classList.contains('dropdown-item2')) {
      let choose = event.target.textContent
      colome = choose;
      dpBtn.textContent = choose;
      if(!indexNumerikal.includes(listFitur.indexOf(colome))&&!indexNumerikal.includes(listFitur.indexOf(groupedBy))){
        aggregasi.innerHTML="";
        aggregasi.innerHTML+='<li><a class="dropdown-item">COUNT</a></li>';
        aggMethod = "COUNT";
        aggBtn.textContent = "COUNT";
      }
      else{
        aggregasi.innerHTML="";
        for (let i = 0; i < aggregateFunction.length; i++) {
          aggregasi.innerHTML+=`<li><a class="dropdown-item">${aggregateFunction[i]}</a></li>`
        }
      }
      const responseRes = await fetch(`reqGroupByRes?group=${groupedBy}&agg=${aggMethod}&col=${colome}`);
      const textRes = await responseRes.text();
      const result = JSON.parse(textRes).result;
        dataCategory=[];
        laber = aggMethod + " of " + colome;
      for(let i=0; i < result.length; i++){
          dataCategory.push(result[i].result);
      }
      generateBarchart();
  }
});

function generateBarchart(){
    var canvas2 = document.getElementById('myChart');
    if(canvas2!==null){
        canvas2.remove();
    }
    canvas.innerHTML+='<canvas id="myChart"></canvas>';
      const ctx = document.getElementById("myChart");
      new Chart(ctx, {
        type: "bar",
        data: {
          labels: groupCategory,
          datasets: [
            {
              label: laber,
              data: dataCategory,
              borderWidth: 1,
            },
          ],
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });
}

