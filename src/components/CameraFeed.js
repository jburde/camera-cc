import React, { useRef, useEffect } from 'react';

const CameraFeed = ({ onFrameProcessed }) => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      } catch (err) {
        console.error("Error accessing the camera: ", err);
      }
    };

    startCamera();
  }, []);

  const processFrame = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    if (video.readyState === video.HAVE_ENOUGH_DATA) {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

      // Send the frame to the parent for OCR processing
      const frameData = canvas.toDataURL('image/png');
      onFrameProcessed(frameData);
    }

    requestAnimationFrame(processFrame);
  };

  useEffect(() => {
    requestAnimationFrame(processFrame);
  }, []);

  return (
    <div style={{ position: 'relative' }}>
      <video ref={videoRef} style={{ width: '100%', height: 'auto' }} muted></video>
      <canvas ref={canvasRef} style={{ display: 'none' }}></canvas>
    </div>
  );
};

export default CameraFeed;
