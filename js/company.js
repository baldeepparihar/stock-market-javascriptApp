// fetch for company profile
const companyTitle = document.getElementById("company-title");
const companyLogo = document.getElementById("company-logo");
const price = document.getElementById("price");
const companyDescription = document.getElementById("company-description");
const changesPercentage = document.getElementById("changesPercentage");
const symbol = window.location.search.replace("?symbol=", "");
// console.log(titleText);

if (symbol) {
  getCompanyProfile(symbol);
} else {
  alert("nothing is passed");
}

function getCompanyProfile(symbol) {
  const url = `https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/company/profile/${symbol}`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      const profile = data.profile;
      companyTitle.textContent = profile.companyName;
      companyDescription.textContent = profile.description;
      price.textContent = "Stock Price: $" + profile.price;
      // Add decimals to 0
      // Wasn't working without decimals
      let num = 0;
      if (changesPercentage >= num.toFixed(10)){
        changesPercentage.classList.add('green');
      } else if(changesPercentage < num.toFixed(10)) {
        changesPercentage.classList.add('red');
      }
      changesPercentage.textContent = profile.changesPercentage;

      // set logo
      let img = document.createElement("img");
      img.src = profile.image;
      companyLogo.appendChild(img);
      console.log(data);
    })
    .catch((err) => {
      console.warn("Something went wrong.", err.message);
    });
}

// const title = document.getElementById("company-title");
// title.textContent = titleText;
 
  let chartData = [];
  let xAxis = [];
  let yAxis = []; 

  async function chartIt() {
    await getHistoricalStockPrice(symbol);
    var ctx = document.getElementById('myChart').getContext('2d');
      let myChart = await new Chart(ctx, {
      type: 'line',
      data: {
          labels: xAxis,
          datasets: [{
              label: 'Historical Stock Price',
              data: yAxis,
              backgroundColor: '#e75480',
              // [
              //     'rgba(255, 99, 132, 0.2)',
              //     'rgba(54, 162, 235, 0.2)',
              //     'rgba(255, 206, 86, 0.2)',
              //     'rgba(75, 192, 192, 0.2)',
              //     'rgba(153, 102, 255, 0.2)',
              //     'rgba(255, 159, 64, 0.2)'
              // ],
              borderColor: [
                  'rgba(255, 99, 132, 1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)',
                  'rgba(75, 192, 192, 1)',
                  'rgba(153, 102, 255, 1)',
                  'rgba(255, 159, 64, 1)'
              ],
              borderWidth: 1
          }]
      },
      options: {
          scales: {
              y: {
                  beginAtZero: true
              }
          }
      }
  });
  }

function getHistoricalStockPrice() {
  const url = `https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/historical-price-full/${symbol}?serietype=line`;
  const historicalData = fetch(url)
    .then((response) => response.json())
    .then((data) => {
      return data;
    });
    
  const  printHistory = async () => {
    await historicalData.then(history => {
      console.log('printHistory: ', history.historical);
      const arr = history.historical.reverse();
       arr.map(element => {
         xAxis.push(element.date);
         yAxis.push(element.close);
         
       })
    });
  }
  printHistory();
}
chartIt();








