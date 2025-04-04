import cv2
import numpy as np
import matplotlib.pyplot as plt
import tensorflow as tf

# Load the trained model
model = tf.keras.models.load_model("model.keras")

# Class labels mapping (from given order)
class_labels = [
    "ञ", "द", "म", "स", "च", "४",
    "ट", "ध", "य", "ह", "छ", "५",
    "ठ", "क", "र", "क्ष", "ज", "६",
    "ड", "न", "ल", "त्र", "झ", "७",
    "ढ", "प", "व", "ज्ञ", "०", "८",
    "ण", "फ", "ख", "ग", "१", "९",
    "त", "ब", "श", "घ", "२",
    "थ", "भ", "ष", "ङ", "३"
]


def preprocess_image(image_path):
    """
    Preprocesses the image:
    - Converts pink text on white background → white text on black background
    - Converts to grayscale
    - Denoises image with bilateral filter
    - Uses adaptive thresholding for better contrast
    - Crops tightly around the letter
    - Resizes with aspect ratio & smooth padding to 32×32
    """
    # Load image
    img = cv2.imread(image_path)

    # Convert to grayscale
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)

    # Denoise using bilateral filter (preserves edges)
    gray = cv2.bilateralFilter(gray, 9, 75, 75)

    # Adaptive thresholding to handle lighting variations
    binary = cv2.adaptiveThreshold(gray, 255, cv2.ADAPTIVE_THRESH_GAUSSIAN_C, cv2.THRESH_BINARY_INV, 11, 2)

    # Find contours (detect letter boundary)
    contours, _ = cv2.findContours(binary, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)

    if contours:
        # Get bounding box (crop around the letter)
        x, y, w, h = cv2.boundingRect(contours[0])
        cropped = binary[y:y+h, x:x+w]
    else:
        cropped = binary  # If no contour found, use full image

    # Resize while maintaining aspect ratio
    h, w = cropped.shape
    scale = 28 / max(h, w)  # Scale so max dimension is 28
    new_w = int(w * scale)
    new_h = int(h * scale)
    
    resized = cv2.resize(cropped, (new_w, new_h), interpolation=cv2.INTER_LANCZOS4)

    # Create a 32×32 black canvas with smooth padding
    final_img = np.full((32, 32), 0, dtype=np.uint8)
    x_offset = (32 - new_w) // 2
    y_offset = (32 - new_h) // 2
    final_img[y_offset:y_offset+new_h, x_offset:x_offset+new_w] = resized

    # Normalize (convert values to range 0-1)
    final_img = final_img / 255.0

    # Reshape for model input
    final_img = np.expand_dims(final_img, axis=-1)  # (32, 32, 1)
    final_img = np.expand_dims(final_img, axis=0)   # (1, 32, 32, 1)

    # Show processed image before feeding into model
    plt.imshow(final_img[0, :, :, 0], cmap="gray")
    plt.title("Processed Image (Before Prediction)")
    plt.axis("off")
    plt.show()

    return final_img

def predict_character(image_path):
    """Predicts the Hindi alphabet from an image"""
    processed_img = preprocess_image(image_path)
    prediction = model.predict(processed_img)

    # Get the class with highest probability
    predicted_index = np.argmax(prediction)
    predicted_character = class_labels[predicted_index]

    print(f"Predicted Character: {predicted_character} (Class {predicted_index})")

# Example usage
image_path = "image4.png"  # Replace with your test image
predict_character(image_path)