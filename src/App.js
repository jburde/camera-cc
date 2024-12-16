//import logo from './logo.svg';
import React, { useEffect, useState } from 'react';
import './App.css';
import Currency from './Currency';

const API_KEY = 'rlraTVMhYLJLFVx2fVD3DqXhgCBnhviW'
const BASE_URL = 'https://api.currencybeacon.com/v1/convert'
const SUPPORTED_CURRENCIES = ['USD', 'AUD', 'EUR','GBP', 'JPY', 'CAD', 'CHF', 'CNY', 'INR'];

function App() {
  const [fromCurr, setFromCurr] = useState('USD');
  const [toCurr, setToCurr] = useState('AUD');
  const [exchangeRate, setExchangeRate] = useState();
  const [amount, setAmount] = useState(1);
  const [amountInFromCurr, setAmountInFromCurr] = useState(true);

  // Calculate amounts
  let toAmount, fromAmount;
  if (amountInFromCurr) {
    fromAmount = amount;
    toAmount = exchangeRate ? (amount * exchangeRate).toFixed(2) : '';
  } else {
    toAmount = amount;
    fromAmount = exchangeRate ? (amount / exchangeRate).toFixed(2) : '';
  }

  // Fetch exchange rate when currencies change
  useEffect(() => {
    if (fromCurr && toCurr) {
      fetch(`${BASE_URL}?from=${fromCurr}&to=${toCurr}&amount=1`, {
        headers: {
          'Authorization': `Bearer ${API_KEY}`
        }
      })
        .then(response => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.json();
        })
        .then(data => setExchangeRate(data.response.value))
        .catch(error => console.error('Error fetching exchange rate:', error));
    }
  }, [fromCurr, toCurr]);

  // Handlers for input changes
  const handleFromAmountChange = e => {
    setAmount(e.target.value);
    setAmountInFromCurr(true);
  };

  const handleToAmountChange = e => {
    setAmount(e.target.value);
    setAmountInFromCurr(false);
  };

  return (
    <>
      <h1 className='title'>Camera Currency Converter</h1>
      <p className='subtitle'>Select. Point. Convert.</p>

      <Currency
        currencyOptions={SUPPORTED_CURRENCIES}
        selectCurrency={fromCurr}
        onChangeCurrency={e => setFromCurr(e.target.value)}
        onChangeAmount={handleFromAmountChange}
        amount={fromAmount}
      />
      <div className="equals">arrow</div>
      <Currency
        currencyOptions={SUPPORTED_CURRENCIES}
        selectCurrency={toCurr}
        onChangeCurrency={e => setToCurr(e.target.value)}
        onChangeAmount={handleToAmountChange}
        amount={toAmount}
      />
    </>
  );
}

export default App;

  //console.log(exchangeRate)
  // useEffect(() => { 
  //   fetch(BASE_URL, {
  //     headers: {
  //       'Authorization': `Bearer ${API_KEY}` // Some APIs use 'Authorization' instead of 'x-api-key'
  //     }
  //   })
  //     .then((res) => {
  //       if (!res.ok) {
  //         throw new Error(`HTTP error! Status: ${res.status}`);
  //       }
  //       return res.json();
  //     })
  //     .then((data) => {
  //       const firstCurr = Object.keys(data.rates)[0]
  //       setCurrencyOptions([data.base, ...Object.keys(data.rates)]) //console.log(data))
  //       console.log(data)
  //       setFromCurr(data.base)
  //       setToCurr(firstCurr)
  //       setExchangeRate(data.rates[firstCurr])
  //     })
  // }, [])

  // useEffect(() => {
  //   if (fromCurr != null && toCurr != null && amount > 0) {
  //     fetch(`${BASE_URL}?from=${fromCurr}&to=${toCurr}&amount=${amount}`, {
  //       headers: {
  //         'x-api-key': API_KEY // Replace with your actual API key
  //       }
  //     })
  //       .then((res) => {
  //         if (!res.ok) {
  //           throw new Error(`HTTP error! Status: ${res.status}`);
  //         }
  //         return res.json();
  //       })
  //       .then((data) => {
  //         if (data.success) {
  //           setExchangeRate(data.result / amount); // Derive the rate from the conversion result
  //         } else {
  //           console.error('Conversion failed:', data.error);
  //         }
  //       })
  //       .catch((error) => console.error('Error fetching conversion:', error));
  //   }
  // }, [fromCurr, toCurr, amount]);
  
  // useEffect(() => {
  //   if (fromCurr != null && toCurr != null) {
  //   fetch(`${BASE_URL}?base=${fromCurr}&symbols=${toCurr}`)
  //     .then(res => res.json())
  //     .then(data => setExchangeRate(data.rates[toCurr]))
  //   }
  // }), [fromCurr, toCurr]

    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.js</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    // </div>
