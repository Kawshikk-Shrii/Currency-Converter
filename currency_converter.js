// const BASE_URL = "https://api.exchangerate.host/convert";

// const dropdowns = document.querySelectorAll(".dropdown select");
// const btn = document.querySelector("form button");
// const fromcurr = document.querySelector(".from select");
// const tocurr = document.querySelector(".to select");
// const msg = document.querySelector(".msg");

// for(let select of dropdowns){
//     for(let currcode in countryList){
//         let newoption = document.createElement("option");
//         newoption.innerText = currcode;
//         newoption.value = currcode;
//         if(select.name === "from" && currcode === "USD"){
//             newoption.selected = "selected";
//         }
//         select.append(newoption);
//     }

//     select.addEventListener("change",(evt) => {
//         updateflag(evt.target);
//     });
// }

// const updateexchangerate = async () => {
//     let amount = document.querySelector(".amount input");
//     let amtval = amount.value;
//     if(amtval === "" || amtval < 1){
//         amtval = 1;
//         amount.value = "1";
//     }

//     const URL = `${BASE_URL}?from=${fromcurr.value}&to=${tocurr.value}&amount=${amtval}`;
//     try{
//         let response = await fetch(URL);
//         let data = await response.json();

//         if (!data.success || !data.info) {
//             msg.innerText = "Failed to get exchange rate.";
//             console.error("Invalid API response:", data);
//             return;
//         }

//         let rate = data.info.rate;
//         //let finalamt = amtval * rate;
//         let finalamt = data.result;
//         msg.innerText = `${amtval} ${fromcurr.value} = ${finalamt.toFixed(2)} ${tocurr.value}`;
//     } catch (error) {
//         console.error("Error fetching exchange rate:", error);
//         msg.innerText = "Something went wrong.";
//     }
// };

// const updateflag = (element) => {
//     let currcode = element.value;
//     let countrycode = countryList[currcode];
//     let newsrc = `https://flagsapi.com/${countrycode}/shiny/64.png`;
//     let img = element.parentElement.querySelector("img");
//     img.src = newsrc;
// }

// btn.addEventListener("click",(evt) => {
//     evt.preventDefault();
//     updateexchangerate();
// });

// window.addEventListener("load",()=>{
//     updateexchangerate();
// });

const BASE_URL = "https://api.exchangerate.host/convert";

const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromcurr = document.querySelector(".from select");
const tocurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");

// Populate the dropdowns with currency codes
for (let select of dropdowns) {
    for (let currcode in countryList) {
        let newOption = document.createElement("option");
        newOption.innerText = currcode;
        newOption.value = currcode;
        if (select.name === "from" && currcode === "USD") {
            newOption.selected = "selected";
        }
        if (select.name === "to" && currcode === "INR") {
            newOption.selected = "selected";
        }
        select.append(newOption);
    }

    select.addEventListener("change", (evt) => {
        updateflag(evt.target);
    });
}

// Update flag image based on currency
const updateflag = (element) => {
    let currcode = element.value;
    let countrycode = countryList[currcode];
    let newsrc = `https://flagsapi.com/${countrycode}/shiny/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newsrc;
}

// Fetch and update exchange rate
const updateexchangerate = async () => {
    let amount = document.querySelector(".amount input").value;
    if (amount === "" || amount < 1) {
        amount = 1;
        document.querySelector(".amount input").value = "1";
    }

    const from = fromcurr.value;
    const to = tocurr.value;

    const URL = `${BASE_URL}?from=${from}&to=${to}&amount=${amount}`;
    let response = await fetch(URL);
    let data = await response.json();

    let rate = data.result;
    let finalAmount = rate;
    msg.innerText = `${amount} ${from} = ${finalAmount.toFixed(2)} ${to}`;
}

btn.addEventListener("click", (evt) => {
    evt.preventDefault();
    updateexchangerate();
});

window.addEventListener("load", () => {
    updateexchangerate();
});