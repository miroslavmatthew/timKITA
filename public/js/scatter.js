const fitur1 = document.querySelector("#fitur1");
const fitur2 = document.querySelector("#fitur2");
const aggregasi = document.querySelector("#aggregasi");
const canvas = document.querySelector("#canvas");
const listFitur = ['ID', 'Year_Birth',	'Education',	'Marital_Status',	'Income',	'Kidhome',	'Teenhome',	'Dt_Customer',	'Recency', 'MntWines',	'MntFruits',	'MntMeatProducts',	'MntFishProducts',	'MntSweetProducts',	'MntGoldProds',	'NumDealsPurchases',	'NumWebPurchases',	'NumCatalogPurchases',	'NumStorePurchases',	'NumWebVisitsMonth', 'AcceptedCmp3'	,'AcceptedCmp4',	'AcceptedCmp5'	, 'AcceptedCmp1', 'AcceptedCmp2',	'Complain'	,'Z_CostContact',	'Z_Revenue'	, 'Response'];
const indexNumerikal = [4, 5, 6, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19];


for(let i = 0; i < listFitur.length; i++){
    let content1 = `<li><a class="dropdown-item">${listFitur[i]}</a></li>`;
    let content2 = 
    `<li><a class="dropdown-item2">${listFitur[i]}</a></li>`;
    if(indexNumerikal.includes(i)){
        fitur1.innerHTML += content1;
        fitur2.innerHTML += content2;
    } 
}

const dpBtn = document.getElementById('multiSelectDropdown'); 
const aggBtn = document.getElementById('selectAgg')
let groupCategory= [];
let groupedBy, aggMethod, aggCols,colome;

document.addEventListener('DOMContentLoaded', function () {
    var selectDropdown = document.getElementById('selectDropdown'); 
    fitur1.addEventListener('click', async function (event) {
        
      if (event.target.classList.contains('dropdown-item')) {
        let choose = event.target.textContent
        groupedBy = choose;
        selectDropdown.textContent = choose;
        dpBtn.disabled = false;
        if(colome!=undefined){
            const responseRes = await fetch(`reqScatter?cat1=${groupedBy}&cat2=${colome}`);
            const textRes = await responseRes.text();
            const result = JSON.parse(textRes).result;
                dataset=[];
            for(let i=0; i < result.length; i++){
                dataset.push({
                    x: result[i].cat1,
                    y: result[i].cat2,
                });
            }
        }
        generateScatter();
    }
});

});

let dataset=[];

fitur2.addEventListener('click', async function (event) {
    if (event.target.classList.contains('dropdown-item2')) {
      let choose = event.target.textContent
      colome = choose;
      dpBtn.textContent = choose;
      const responseRes = await fetch(`reqScatter?cat1=${groupedBy}&cat2=${colome}`);
      const textRes = await responseRes.text();
      const result = JSON.parse(textRes).result;
        dataset=[];
      for(let i=0; i < result.length; i++){
          dataset.push({
            x: result[i].cat1,
            y: result[i].cat2,
          });
      }
      generateScatter();
  }
});
function generateScatter(){
    var canvas2 = document.getElementById('myChart');
    if(canvas2!==null){
        canvas2.remove();
    }
    canvas.innerHTML+='<canvas id="myChart"></canvas>';
      const ctx = document.getElementById("myChart");        
      new Chart(ctx, {
        type: "scatter",
        data: {
          datasets: [
            {
              label: "Scatter Dataset",
              data: dataset,
              backgroundColor: "rgb(255, 99, 132)",
            },
          ],
        },
        options: {
          scales: {
            x: {
              type: "linear",
              position: "bottom",
            },
          },
        },
      });
}
 

