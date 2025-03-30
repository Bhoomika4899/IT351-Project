import base64
import io
import numpy as np
from PIL import Image
from tensorflow.keras.models import load_model
from flask import Flask, request, jsonify
from flask_cors import CORS

# Load the VGG16 model
model = load_model("hindi_character_model_vgg16.h5")

# Define Flask app
app = Flask(__name__)
CORS(app)

# Preprocess image for model
def preprocess_image(image_data):
    try:
        # Decode base64 to raw image bytes
        image_bytes = base64.b64decode(image_data)
        # Open image and resize to (128, 128) for model
        image = Image.open(io.BytesIO(image_bytes)).convert("RGB")
        image = image.resize((128, 128))
        # Convert to numpy array and normalize
        image_array = np.array(image) / 255.0
        # Add batch dimension
        image_array = np.expand_dims(image_array, axis=0)
        return image_array
    except Exception as e:
        print(f"Error in image processing: {str(e)}")
        return None

# Predict Route
@app.route("/predict", methods=["POST"])
def predict():
    try:
        data = request.json
        print("Received data:", data)  # ✅ Debugging line
        if "letter" not in data or "canvas_data" not in data:
            return jsonify({"error": "Missing required fields"}), 400
        if "canvas_data" not in data:
            return jsonify({"error": "Missing canvas_data"}), 400

        # Preprocess canvas_data
        processed_image = preprocess_image(data["canvas_data"])
        print(f"✅ Processed Image Shape: {processed_image.shape}")  # Should be (1, 128, 128, 3)

        if processed_image is None:
            return jsonify({"error": "Failed to decode and process image"}), 400

        # Make prediction
        prediction = model.predict(processed_image)
        predicted_index = int(np.argmax(prediction))
        deviation_score = float(np.min(prediction)) * 10  # Lower score = better tracing

        # Map prediction to Hindi letters
        hindi_letters = [
            "अ", "आ", "इ", "ई", "उ", "ऊ", "ऋ", "ए", "ऐ", "ओ", "औ", "अं", "अः",
            "क", "ख", "ग", "घ", "ङ", "च", "छ", "ज", "झ", "ञ", "ट", "ठ", "ड", "ढ",
            "ण", "त", "थ", "द", "ध", "न", "प", "फ", "ब", "भ", "म", "य", "र", "ल",
            "व", "श", "ष", "स", "ह", "क्ष", "त्र", "ज्ञ", "श्र", "ड़", "ढ़"
        ]
        # Get the predicted letter
        predicted_letter = hindi_letters[predicted_index]

        # Check if prediction is correct
        expected_letter = data["letter"]
        is_correct = predicted_letter == expected_letter

        return jsonify({
            "predicted_letter": predicted_letter,
            "deviation_score": deviation_score,
            "isCorrect": is_correct
        })

    except Exception as e:
        print(f"Prediction error: {str(e)}")
        return jsonify({"error": str(e)}), 500

# Run Flask app
if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5001, debug=True)
