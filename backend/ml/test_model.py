import numpy as np
import cv2
import tensorflow as tf
import matplotlib.pyplot as plt

# Load Model
MODEL_PATH = "model.keras"
model = tf.keras.models.load_model(MODEL_PATH)

def preprocess_image(image_path):
    # Load image
    image = cv2.imread(image_path, cv2.IMREAD_UNCHANGED)

    # If image has alpha channel, remove transparency
    if image.shape[-1] == 4:  
        image = cv2.cvtColor(image, cv2.COLOR_BGRA2BGR)

    # Convert to grayscale
    image = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)

    # Invert colors if needed (make sure background is GREY, letter is WHITE)
    if np.mean(image) > 127:  
        image = cv2.bitwise_not(image)

    # Binarize image
    _, binary = cv2.threshold(image, 0, 255, cv2.THRESH_BINARY + cv2.THRESH_OTSU)

    # 🔥 Shrink thick stroke by erosion 🔥
    kernel = np.ones((5, 5), np.uint8)  
    thinned = cv2.erode(binary, kernel, iterations=3)  # Shrink the stroke by eroding

    # ✅ **FORCE Background to be GREY (128)**  
    final_image = np.full_like(thinned, 128)  # Grey background  
    final_image[thinned == 255] = 255  # White letters  

    # Resize to model input size
    processed_image = cv2.resize(final_image, (32, 32))
    processed_image = processed_image / 255.0  # Normalize
    processed_image = np.expand_dims(processed_image, axis=-1)  # Add channel dimension
    processed_image = np.repeat(processed_image, 3, axis=-1)  # Convert to 3-channel
    processed_image = np.expand_dims(processed_image, axis=0)  # Add batch dimension

    # Display processed image
    plt.imshow(final_image, cmap='gray')
    plt.title("Processed Image Before Feeding to Model")
    plt.show()

    return processed_image

# Prediction Function
def predict_character(image_path, model):
    processed_image = preprocess_image(image_path)
    prediction = model.predict(processed_image)
    predicted_class = np.argmax(prediction, axis=1)[0]

    return predicted_class

# Example Usage
image_path = "image2.png"  # Replace with actual test image path
predicted_class = predict_character(image_path, model)
print(f"Predicted Class: {predicted_class}")
