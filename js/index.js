//search input
const searchInput = document.getElementById("searchInput");
let result = document.getElementById("results-wrapper");
let ticker = document.querySelector('.ticker');

const stockResults = (searchInput) => {
  if (searchInput) {
    const url = `https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/search?query=${searchInput}&limit=10&exchange=NASDAQ`;
    let dataList = "";
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        result.innerHTML = "";
        for (i = 0; i < data.length; i++) {
          dataList += `<li onclick="location.href='company.html?symbol=${data[i]["symbol"]}'"><i>${data[i]["name"]}</i> (${data[i]["symbol"]})</li>`;
        }
        result.innerHTML = `<ul>${dataList}</ul>`;
        return true;
      })
      .catch((err) => {
        console.warn("Something went wrong.", err.message);
        return false;
      });

  }

};

// searchInput.addEventListener('searchInput', debounce(onInput, 500));
const debounce = (fn, delay) => {

  let timeoutID;
  return function(...args){

      if(timeoutID){
        clearTimeout(timeoutID)
      }
     timeoutID = setTimeout( () => {
        fn(...args)
      }, delay)
    }
}

searchInput.addEventListener("keyup", debounce(e => {
    // console.log(e);
  stockResults(searchInput.value);
}, 1000));


function getStocks() {
  const url = "https://apidojo-yahoo-finance-v1.p.rapidapi.com/auto-complete?q=tesla&region=US";
  let tickerItem = "";
  fetch(url, {
    "method": "GET",
    "headers": {
      "x-rapidapi-host": "apidojo-yahoo-finance-v1.p.rapidapi.com",
      "x-rapidapi-key": "0f16ae37dbmshb709c040c338584p1c8ba2jsn5167955a5ed4"
    }
  })
  .then(response => response.json())
  .then((data) => {
    console.log("Data:", data.quotes);
    const quotes = data.quotes;
    tickerItem = "";
    for (i = 0; i < quotes.length; i++) {
      console.log(quotes[i].symbol);
      tickerItem += `<li class="ticker__item" onclick="location.href='company.html?symbol=${quotes[i].symbol}'">${quotes[i].symbol}</li>`;
    }
    ticker.innerHTML = `<ul class="ticker">${tickerItem}</ul>`;

    return true;
  })
  .catch(err => {
    console.error(err);
  });
}
getStocks();

