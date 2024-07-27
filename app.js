const BASE_URL="https://v6.exchangerate-api.com/v6/983834cf9dd3f22798c4aee2/latest";


const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");

const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");

const msg =document.querySelector(".msg");


for(let select of dropdowns){
    for(let currCode in countryList){
        let newOPtion = document.createElement("option");
        newOPtion.innerText=currCode;
        newOPtion.value=currCode;
        if(select.name === "from" && currCode === "USD"){
            newOPtion.selected="selected";
        }else if(select.name === "to" && currCode === "INR"){
            newOPtion.selected="selected";
        }
        select.append(newOPtion);
    }
    select.addEventListener("change",(evt)=>{
        updateFlag(evt.target);
    });
}

const updateFlag=(element)=>{
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newSrc = `http://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src =newSrc;
};
btn.addEventListener("click",async(evt)=>{
    evt.preventDefault();
    let amount = document.querySelector(".amount input");
    let amountVal = amount.value;
    if(amountVal ==="" || amountVal < 1){
        amountVal=1;
        amount.value="1";
    }
   const URL =`${BASE_URL}/${fromCurr.value}`;

   let response = await fetch(URL);
   const result = await response.json();

   let rate = result.conversion_rates[`${toCurr.value}`];
   let finalAmt = amountVal *rate;

   msg.innerText =`${amountVal} ${fromCurr.value} = ${finalAmt} ${toCurr.value}`;
});


