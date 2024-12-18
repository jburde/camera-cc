import React from "react";

export default function CurrencyRow(props) {
    const { //destructure/spread
        currencyOptions,
        selectCurrency,
        onChangeCurrency,
        onChangeAmount,
        amount
    } = props

    return (
        <div className="menu">
            <select value={selectCurrency} onChange={onChangeCurrency}>
                {currencyOptions.map(option => (
                    <option key={option} value={option}>{option}</option>
                ))}
            </select>
            {/* <input type="number" className="input" value={amount} onChange={onChangeAmount}/> */}
        </div>
    )
}