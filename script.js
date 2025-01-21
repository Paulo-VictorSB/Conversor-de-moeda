const awaitApi = document.querySelector('.awaitApi')
const fromCurrency = document.querySelector('#fromCurrency')
const toCurrency = document.querySelector('#toCurrency')

const APIkey = "4b1fedcdf87f5a04dd6838a6c1343110"

async function ExchangeGeratesApi(){
    const response = await fetch(`https://api.exchangeratesapi.io/v1/latest?access_key=${APIkey}&format=1`);
    if(response.status == 200){
        awaitApi.style.display = 'none';
        const obj = await response.json();
        console.log(obj);
        GerarMoedas(obj);
    }
}

function GerarMoedas(obj) {
    Object.entries(obj.rates).forEach(([moeda, valor]) => {
        const optionfromCurrency = document.createElement('option');
        optionfromCurrency.value = moeda;
        optionfromCurrency.textContent = moeda;

        const optiontoCurrency = document.createElement('option');
        optiontoCurrency.value = moeda;
        optiontoCurrency.textContent = moeda;

        fromCurrency.appendChild(optionfromCurrency);
        toCurrency.appendChild(optiontoCurrency);
    });
}