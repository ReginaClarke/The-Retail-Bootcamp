const button = document.querySelector("button")
const newDiv = document.querySelector("#Search");
const BASE_URL = "https://last10k-company-v1.p.rapidapi.com/v1/company/income?formType=10-k&ticker="
const userInput = document.querySelector("input")

// console.log(newDiv)


button.addEventListener("click", async () => {//adding in event listener

  const ticker = userInput.value;
  await axios(`${BASE_URL}${ticker}`, {
    "method": "GET",
    "headers": {
      "x-rapidapi-host": "last10k-company-v1.p.rapidapi.com",
      "x-rapidapi-key": "a57b7b861amsheeecddc0b27a96ap1ac360jsn0f840c7e9bac"
    }
  })
    .then(response => {
      console.log(response);

      const revenue = response.data.data.attributes.result.RevenueFromContractWithCustomerExcludingAssessedTax;
      //console.log(revenue)
      const cogs = Math.abs(response.data.data.attributes.result.CostOfGoodsAndServicesSold);
      //console.log(cogs)
      const netIncome = response.data.data.attributes.result.NetIncomeLoss;
      const companyName = response.data.data.attributes.company.name
      const grossMargin = revenue - cogs;
      const imu = Math.round((revenue - grossMargin) / revenue * 100) + "%";
      const netIncomeRate = Math.round((netIncome / revenue) * 100) + "%";

      newDiv.innerHTML = `<div id="companyOutput">${companyName} <br> Initial Markup (aka IMU%): ${imu} <br>Net Income%: ${netIncomeRate}</div>`

    })
    .catch(err => {
      console.log(err);
    });

})  //close the async function


