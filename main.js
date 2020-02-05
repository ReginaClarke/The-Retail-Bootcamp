const button = document.querySelector("button")
const newDiv = document.querySelector("#Search");
const BASE_URL = "https://last10k-company-v1.p.rapidapi.com/v1/company/income?formType=10-q&ticker=m"
const userInput = document.querySelector("input")

// console.log(newDiv)


button.addEventListener("click", async () => {//adding in event listener

  axios(`${BASE_URL}`, {
    "method": "GET",
    "headers": {
      "x-rapidapi-host": "last10k-company-v1.p.rapidapi.com",
      "x-rapidapi-key": "a57b7b861amsheeecddc0b27a96ap1ac360jsn0f840c7e9bac"
    }
  })
    .then(response => {
      console.log(response);

      const revenue = response.data.data.attributes.result.RevenueFromContractWithCustomerExcludingAssessedTax;
      // //   // console.log(revenue)
      const cogs = response.data.data.attributes.result.CostOfGoodsAndServicesSold;
      // //   console.log(cogs)
      const netIncome = response.data.data.attributes.result.NetIncomeLoss;
      const grossMargin = revenue + cogs;
      const grossMarginRate = (revenue - grossMargin) / revenue * 100 + "%";
      const netIncomeRate = (netIncome / revenue) * 100 + "%";

      newDiv.innerHTML = `<div>GM%: ${grossMarginRate} Net Income%: ${netIncomeRate}</div>`

    })
    .catch(err => {
      console.log(err);
    });

})  //close the async function


