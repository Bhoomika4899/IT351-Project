import React, { useRef, useState } from "react";

const ImageProcessor = () => {
  console.log("Progress.js is rendering this component!");
  alert("Check if this alert shows up!");
    const canvasRef = useRef(null);
    const [processedImage, setProcessedImage] = useState(null);

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            const img = new Image();
            img.src = e.target.result;
            img.onload = () => processImage(img);
        };
        reader.readAsDataURL(file);
    };

    const processImage = (img) => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        canvas.width = 256;
        canvas.height = 256;

        // Fill background with gray
        ctx.fillStyle = "#808080";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Draw the uploaded image resized
        ctx.drawImage(img, 0, 0, 256, 256);

        // Convert to grayscale with white letters
        const imageData = ctx.getImageData(0, 0, 256, 256);
        const data = imageData.data;

        for (let i = 0; i < data.length; i += 4) {
            let avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
            if (avg > 150) {
                data[i] = data[i + 1] = data[i + 2] = 255; // White for letters
            } else {
                data[i] = data[i + 1] = data[i + 2] = 128; // Gray for background
            }
        }

        ctx.putImageData(imageData, 0, 0);
        setProcessedImage(canvas.toDataURL());
    };

    return (
        <div style={{ textAlign: "center", marginTop: "20px" }}>
            <h2>Image Processor</h2>
            <input type="file" accept="image/*" onChange={handleImageUpload} />
            <canvas ref={canvasRef} style={{ display: "none" }}></canvas>
            {processedImage && (
                <div>
                    <h3>Processed Image:</h3>
                    <img src={processedImage} alt="Processed" style={{ border: "1px solid black" }} />
                </div>
            )}
        </div>
    );
};

export default ImageProcessor;
