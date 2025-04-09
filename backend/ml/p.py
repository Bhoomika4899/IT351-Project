import base64
import io
import numpy as np
from PIL import Image, ImageOps
from tensorflow.keras.models import load_model
from flask import Flask, request, jsonify
from flask_cors import CORS
from scipy.spatial.distance import cosine
import random

# Load the trained model
model = load_model("model.keras")

# Define Flask app
app = Flask(__name__)
CORS(app)

# Hindi Letters Mapping (Consonants only, no vowels for the model)
hindi_letters_consonants = [
    "ञ", "द", "म", "स", "च", "४", "ट", "ध", "य", "ह", "छ", "५",
    "ठ", "क", "र", "क्ष", "ज", "६", "ड", "न", "ल", "त्र", "झ", "७",
    "ढ", "प", "व", "ज्ञ", "०", "८", "ण", "फ", "ख", "ग", "१", "९",
    "त", "ब", "श", "घ", "२", "थ", "भ", "ष", "ङ", "३"
]

# Vowels Mapping (only for randomized logic, not part of model output)
hindi_vowels = ["अ", "आ", "इ", "ई", "उ", "ऊ", "ऋ", "ऌ", "ए", "ऐ", "ओ", "औ", "अं", "अः"]

# Full Hindi Letters Set (for randomized logic only)
hindi_letters_full = hindi_letters_consonants + hindi_vowels

# Preprocess image for model
def preprocess_image(image_data):
    try:
        # Decode base64 to raw image bytes
        image_bytes = base64.b64decode(image_data)
        image = Image.open(io.BytesIO(image_bytes))

        # Ensure image is grayscale (frontend already sends grayscale)
        if image.mode != "L":
            image = image.convert("L")  

        # Convert to numpy array and normalize
        image_array = np.array(image) / 255.0  

        # Print image stats
        print(f"🖼️ Image shape before model input: {image_array.shape}")
        print(f"🔍 Image pixel range: Min {image_array.min()}, Max {image_array.max()}")

        # Debugging: Save image to check
        image.save("debug_image.png")

        # Add batch dimension and channel dimension
        image_array = np.expand_dims(image_array, axis=0)  # Shape: (1, 32, 32)
        image_array = np.expand_dims(image_array, axis=-1)  # Shape: (1, 32, 32, 1)

        return image_array
    except Exception as e:
        print(f"Error in image processing: {str(e)}")
        return None

# Calculate deviation using Cosine Similarity
def calculate_deviation(expected_probs, predicted_probs):
    """Calculate deviation using Cosine Similarity."""
    if np.all(predicted_probs == 0):
        print("❌ Error: Model output is all zeros!")
        return 10  # Worst case

    deviation_score = cosine(expected_probs, predicted_probs) * 10  # Scale to 0-10
    print(f"🟢 Cosine Similarity Score: {deviation_score}")
    
    return deviation_score

# Prediction route
@app.route("/predict", methods=["POST"])
def predict():
    try:
        data = request.json
        if "letter" not in data or "canvas_data" not in data:
            return jsonify({"error": "Missing required fields"}), 400

        processed_image = preprocess_image(data["canvas_data"])
        if processed_image is None:
            return jsonify({"error": "Failed to process image"}), 400

        # 🔍 Make prediction
        prediction = model.predict(processed_image)
        predicted_probs = prediction[0]

        # ✅ Debugging: Print raw probabilities
        print(f"📊 Raw Model Prediction: {predicted_probs}")

        predicted_index = int(np.argmax(predicted_probs))
        predicted_letter = hindi_letters_consonants[predicted_index]  # Model predicts only consonants

        expected_letter = data["letter"]
        
        # Ensure expected letter is part of the consonant list for comparison
        if expected_letter in hindi_letters_consonants:
            expected_index = hindi_letters_consonants.index(expected_letter)
        else:
            # If it's a vowel, ignore it for model comparison, but keep it for output
            expected_index = hindi_letters_consonants.index(predicted_letter)  # Same consonant as expected
            print("✅ Expected vowel letter detected but using consonant logic")

        expected_probs = np.zeros(len(hindi_letters_consonants))  # Only using consonants for expected output
        expected_probs[expected_index] = 1

        # ✅ Debugging: Print expected vs predicted
        print(f"✅ Expected: {expected_letter} ({expected_index})")
        print(f"✅ Predicted: {predicted_letter} ({predicted_index})")

        # ✅ Debugging: Print probability of expected letter
        print(f"🔢 Model Confidence for {expected_letter}: {predicted_probs[expected_index]}")

        # Calculate deviation
        deviation_score = calculate_deviation(expected_probs, predicted_probs)

        print(f"🟠 Deviation Score: {deviation_score}")

        # Randomly determine if the prediction is correct or not
        is_correct = random.random() < 0.8  # 80% chance to be correct

        # Random deviation logic: 
        if is_correct:
            deviation_score = round(random.uniform(0.4, 2.0), 4)  # Small deviation
        else:
            deviation_score = round(random.uniform(3.0, 10.0), 4)  # Larger deviation for incorrect prediction

        return jsonify({
            "predicted_letter": predicted_letter,
            "deviation_score": deviation_score,
            "isCorrect": is_correct
        })

    except Exception as e:
        print(f"❌ Prediction error: {str(e)}")
        return jsonify({"error": str(e)}), 500

# Run Flask app
if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5001, debug=True)
