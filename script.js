// Tela de espera
const awaitApi = document.querySelector('.awaitApi')
// Div central
const card_body = document.querySelector('.card-body')
// Campo conversão moeda de origem
const fromCurrency = document.querySelector('#fromCurrency')
// Campo de conversão moeda de destino
const toCurrency = document.querySelector('#toCurrency')
// Campo do valor para converão
const inputValue = document.querySelector('#inputValue')
// Campo para apresentar o resultado
const result = document.querySelector('#result')
// Campo para calcular os dados.
const submit = document.querySelector('#submit')
// Campo para trocar os dados.
const swapButton = document.querySelector('#swapButton')

// Sua chave API
const APIkey = "4b1fedcdf87f5a04dd6838a6c1343110"

async function ExchangeGeratesApi() {

    /*
        Qual o motivo de usar o local storage? Resumidamente, poucas requisições na API gratuita, então ele faz a requisição 1x vez e armazena os dados no local storage para utilizar os dados sem precisar requisitar a API.
    */

    // Verifica se os dados já estão no localStorage
    let storedData = localStorage.getItem('exchangeRatesData');

    if (storedData) {
        // Se os dados estiverem no localStorage, usa os dados armazenados
        const obj = JSON.parse(storedData); // Converte os dados para objeto
        GerarMoedas(obj);
    } else {
        // Caso contrário, faz a requisição e armazena os dados
        const response = await fetch(`https://api.exchangeratesapi.io/v1/latest?access_key=${APIkey}&format=1`);
        if (response.status == 200) {
            awaitApi.style.display = 'none';
            const obj = await response.json();
            GerarMoedas(obj);
            
            localStorage.setItem('exchangeRatesData', JSON.stringify(obj));
        } else {
            awaitApi.style.display = 'block';
            awaitApi.textContent = 'Erro ao buscar dados da API. Tente novamente mais tarde.';
            return;
        }
    }
}

function GerarMoedas(obj) {
    // Dentro do objeto, separa a moeda do valor
    Object.entries(obj.rates).forEach(([moeda, valor]) => {
        // Cria os options com os valores retornados da API e os adiciona ao select
        const optionfromCurrency = document.createElement('option');
        optionfromCurrency.value = valor;
        optionfromCurrency.textContent = moeda;

        const optiontoCurrency = document.createElement('option');
        optiontoCurrency.value = valor;
        optiontoCurrency.textContent = moeda;

        fromCurrency.appendChild(optionfromCurrency);
        toCurrency.appendChild(optiontoCurrency);
    });
}

submit.addEventListener('click', () => {
    if (inputValue.value > 0) {
        // Obter as cotações selecionadas
        const fromCurrencyRate = parseFloat(fromCurrency.value); // Cotação da moeda de origem em relação ao Euro
        const toCurrencyRate = parseFloat(toCurrency.value); // Cotação da moeda de destino em relação ao Euro

        // Realizar a conversão
        const euroValue = inputValue.value / fromCurrencyRate; // Converter para Euro
        const resultValue = euroValue * toCurrencyRate; // Converter de Euro para a moeda de destino

        // Exibir o resultado
        const selectedText = toCurrency.options[toCurrency.selectedIndex].text; // Nome da moeda de destino
        result.style.display = 'block';
        result.innerHTML = `${resultValue.toFixed(2)} ${selectedText}`;
    } else {
        alert('Por favor, insira um valor maior que zero.');
    }
});

// Função de troca 
swapButton.addEventListener('click', ()=>{
    const temp = fromCurrency.value;
    fromCurrency.value = toCurrency.value;
    toCurrency.value = temp;
})

// Chama a função principal.
ExchangeGeratesApi();