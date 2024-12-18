import React from 'react';
import Tesseract from 'tesseract.js';

const OCRProcessor = ({ image, onTextExtracted }) => {
  const processImage = async () => {
    try {
      const { data } = await Tesseract.recognize(image, 'eng', {
        logger: (info) => console.log(info), // Optional logging
      });
      console.log("Extracted Text: ", data.text);
      onTextExtracted(data.text); // Pass extracted text to parent
    } catch (err) {
      console.error("Error during OCR: ", err);
    }
  };

  return <button onClick={processImage}>Process Image</button>;
};

export default OCRProcessor;
