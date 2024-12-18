import React, { useState, useEffect } from 'react';
import Tesseract from 'tesseract.js';

const CurrencyOverlay = ({ frameData, exchangeRate }) => {
  const [overlayData, setOverlayData] = useState([]);

  useEffect(() => {
    const processFrame = async () => {
      if (!frameData) return;

      try {
        const { data } = await Tesseract.recognize(frameData, 'eng', {
          logger: (info) => console.log(info),
        });

        const numbers = (data.text.match(/[\d,]+(\.\d+)?/g) || []).map((num) =>
          parseFloat(num.replace(/,/g, ''))
        );

        const convertedValues = numbers.map((num) => (num * exchangeRate).toFixed(2));

        setOverlayData(
          data.words.map((word, idx) => ({
            text: `${convertedValues[idx] || word.text}`,
            bbox: word.bbox,
          }))
        );
      } catch (err) {
        console.error("Error during OCR processing: ", err);
      }
    };

    processFrame();
  }, [frameData, exchangeRate]);

  return (
    <div className="overlay">
      {overlayData.map((item, idx) => (
        <div
          key={idx}
          style={{
            position: 'absolute',
            left: `${item.bbox.x0}px`,
            top: `${item.bbox.y0}px`,
            color: 'red',
            fontSize: '16px',
            background: 'rgba(0,0,0,0.5)',
            padding: '2px 4px',
            borderRadius: '4px',
          }}
        >
          {item.text}
        </div>
      ))}
    </div>
  );
};

export default CurrencyOverlay;
