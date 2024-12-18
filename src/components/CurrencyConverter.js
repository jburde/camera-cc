import React from 'react';

const CurrencyConverter = ({ extractedText, exchangeRate }) => {
  const extractNumbers = (text) => {
    const matches = text.match(/[\d,]+(\.\d+)?/g); // Regex to extract numbers
    return matches ? matches.map((num) => parseFloat(num.replace(/,/g, ''))) : [];
  };

  const convertedAmounts = extractNumbers(extractedText).map((num) =>
    (num * exchangeRate).toFixed(2)
  );

  return (
    <div>
      <h3>Converted Values:</h3>
      {convertedAmounts.map((amount, idx) => (
        <p key={idx}>Converted Amount: {amount}</p>
      ))}
    </div>
  );
};

export default CurrencyConverter;
