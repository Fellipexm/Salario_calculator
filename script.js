const exchangeRates = {
    BRL: 1,
    USD: null,
    EUR: null,
    GBP: null,
    JPY: null,
    CAD: null,
    AUD: null,
    CHF: null,
    CNY: null,
    INR: null,
    NZD: null,
    SGD: null,
    HKD: null,
    SEK: null,
    NOK: null,
    DKK: null,
    ZAR: null,
    TRY: null,
    RUB: null,
    PLN: null,
    HUF: null,
    CZK: null,
    ILS: null,
    MXN: null,
    IDR: null,
    MYR: null,
    THB: null,
    PHP: null,
    AED: null,
    SAR: null,
    ARS: null,
    CLP: null,
    COP: null,
    PEN: null,
    UAH: null,
    BHD: null,
    OMR: null,
    JOD: null,
    KWD: null
};

const apiKey = '992bc3464168e0b249267493'; // Substitua com sua chave de API

async function fetchExchangeRates() {
    try {
        const response = await fetch(`https://v6.exchangerate-api.com/v6/${apiKey}/latest/BRL`);
        const data = await response.json();
        if (data.result === "success") {
            Object.keys(exchangeRates).forEach(currency => {
                exchangeRates[currency] = data.conversion_rates[currency] || null;
            });

            displayExchangeRates();
        }
    } catch (error) {
        console.error('Erro ao buscar taxas de câmbio:', error);
    }
}

function displayExchangeRates() {
    const exchangeRatesDiv = document.getElementById('exchange-rates');
    exchangeRatesDiv.innerHTML = Object.keys(exchangeRates).map(currency => 
        `<span>${currency}: ${exchangeRates[currency]}</span>`
    ).join(' ');
}

function calculateSalary() {
    const salary = parseFloat(document.getElementById('salary').value);
    const hours = parseFloat(document.getElementById('hours').value);
    const currency = document.getElementById('currency').value;
    
    if (isNaN(salary) || isNaN(hours) || hours <= 0) {
        alert('Por favor, insira valores válidos.');
        return;
    }
    
    const dailyRate = salary / 30;
    const hourlyRate = dailyRate / hours;
    const convertedRate = hourlyRate * exchangeRates[currency];
    
    document.getElementById('result').innerText = 'O valor da sua hora trabalhada é ' + convertedRate.toFixed(2) + ' ' + currency;
}

// Chame a função para buscar as taxas de câmbio quando a página for carregada
window.onload = fetchExchangeRates;
