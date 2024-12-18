import React, { useRef } from 'react';

const Camera = ({ onCapture }) => {
    const videoRef = useRef(null);
    const canvasRef = useRef(null);

    const startCamera = async() => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });
            videoRef.current.srcObject = stream;
            videoRef.current.play();
        } catch (err) {
            console.error("Error accessing camera", err);
        }
    };

    const captureImage = () => {
        const canvas = canvasRef.current;
        const video = videoRef.current;
        const ctx = canvas.getContext('2d');

        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

        const image = canvas.toDataURL('image/png');
        onCapture(image); // Pass the captured image to parent
    };

    return (
        <div>
            <video ref={videoRef} autoPlay className="camera-feed"></video>
            <canvas ref={canvasRef} style={{ display: 'none' }}></canvas>
            <button onClick={captureImage}>Capture</button>
            <button onClick={startCamera}>Start Camera</button> 
        </div>
    );
};

export default Camera;