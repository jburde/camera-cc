//import logo from './logo.svg';
import React, { useEffect, useState } from 'react';
import './App.css';
import Currency from './Currency';

const API_KEY = 'rlraTVMhYLJLFVx2fVD3DqXhgCBnhviW'
const BASE_URL = 'https://api.currencybeacon.com/v1/latest'

function App() {

  const [currencyOptions, setCurrencyOptions] = useState([])
  //console.log(currencyOptions)
  // pass func, convert to json, add to array 
  const [fromCurr, setFromCurr] = useState({})
  const [toCurr, setToCurr] = useState()
  const [exchangeRate, setExchangeRate] = useState()
  const [amount, setAmount] = useState(1)
  const [amountInFromCurr, setAmountInFromCurr] = useState(true)

  let toAmount, fromAmount
  if (amountInFromCurr) {
    fromAmount = amount
    toAmount = amount * exchangeRate
  } else {
    toAmount = amount
    fromAmount = amount / exchangeRate
  }

  //console.log(exchangeRate)
  useEffect(() => { 
    fetch(BASE_URL, {
      headers: {
        'Authorization': `Bearer ${API_KEY}` // Some APIs use 'Authorization' instead of 'x-api-key'
      }
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        const firstCurr = Object.keys(data.rates)[0]
        setCurrencyOptions([data.base, ...Object.keys(data.rates)]) //console.log(data))
        console.log(data)
        setFromCurr(data.base)
        setToCurr(firstCurr)
        setExchangeRate(data.rates[firstCurr])
      })
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  useEffect(() => {
    if (fromCurr != null && toCurr != null && amount > 0) {
      fetch(`${BASE_URL}?from=${fromCurr}&to=${toCurr}&amount=${amount}`, {
        headers: {
          'x-api-key': API_KEY // Replace with your actual API key
        }
      })
        .then((res) => {
          if (!res.ok) {
            throw new Error(`HTTP error! Status: ${res.status}`);
          }
          return res.json();
        })
        .then((data) => {
          if (data.success) {
            setExchangeRate(data.result / amount); // Derive the rate from the conversion result
          } else {
            console.error('Conversion failed:', data.error);
          }
        })
        .catch((error) => console.error('Error fetching conversion:', error));
    }
  }, [fromCurr, toCurr, amount]);
  
  

  // useEffect(() => {
  //   if (fromCurr != null && toCurr != null) {
  //   fetch(`${BASE_URL}?base=${fromCurr}&symbols=${toCurr}`)
  //     .then(res => res.json())
  //     .then(data => setExchangeRate(data.rates[toCurr]))
  //   }
  // }), [fromCurr, toCurr]

  function handleFromAmountChange(e) {
    setAmount(e.target.value)
    setAmountInFromCurr(true)
  }

  function handleToAmountChange(e) {
    setAmount(e.target.value)
    setAmountInFromCurr(false)
  }

  return (
    <>
      <h1>Camera Currency Converter</h1>
      <p>Select. Point. Convert.</p>

    <Currency 
      currencyOptions={currencyOptions}
      selectCurrency={fromCurr}
      onChangeCurrency={e => setFromCurr(e.target.value)}
      onChangeAmount={handleFromAmountChange}
      amount = {fromAmount}
    />
    <div className="equals">arrow</div>
    <Currency
      currencyOptions={currencyOptions}
      selectCurrency={toCurr}
      onChangeCurrency={e => setToCurr(e.target.value)}
      onChangeAmount={handleToAmountChange}
      amount = {toAmount}
    />
    </>
    
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
  );
}

export default App;
