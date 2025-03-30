import os
import numpy as np
import tensorflow as tf
from tensorflow.keras.preprocessing.image import ImageDataGenerator
from tensorflow.keras.applications import VGG16
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Dense, Flatten, Dropout
from tensorflow.keras.optimizers import Adam
from sklearn.metrics import classification_report, confusion_matrix
import matplotlib.pyplot as plt

# ================================
# ✅ Dataset Paths
# ================================
# Fix relative path (no starting / before ../../)
BASE_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), "../../public/DevanagariDataset/Dataset_hindi_character"))
#BASE_DIR = "/home/bhoomika/IT351/alphabet-learning/public/DevanagariDataset/Dataset_hindi_character"
TRAIN_DIR = os.path.join(BASE_DIR, "Train")
TEST_DIR = os.path.join(BASE_DIR, "Test")

# Image Parameters
IMG_SIZE = 128
BATCH_SIZE = 32
EPOCHS = 20

# ================================
# 🎨 Data Augmentation & Loading
# ================================
train_datagen = ImageDataGenerator(
    rescale=1.0/255.0,
    rotation_range=10,
    width_shift_range=0.1,
    height_shift_range=0.1,
    shear_range=0.1,
    zoom_range=0.1,
    horizontal_flip=False,
    fill_mode='nearest'
)

test_datagen = ImageDataGenerator(rescale=1.0/255.0)

train_generator = train_datagen.flow_from_directory(
    TRAIN_DIR,
    target_size=(IMG_SIZE, IMG_SIZE),
    batch_size=BATCH_SIZE,
    class_mode='categorical'
)

test_generator = test_datagen.flow_from_directory(
    TEST_DIR,
    target_size=(IMG_SIZE, IMG_SIZE),
    batch_size=BATCH_SIZE,
    class_mode='categorical',
    shuffle=False
)

# ================================
# 🧠 Load Pretrained VGG16 Model
# ================================
vgg16 = VGG16(
    weights='imagenet',
    include_top=False,
    input_shape=(IMG_SIZE, IMG_SIZE, 3)
)

# Freeze VGG16 Layers
for layer in vgg16.layers:
    layer.trainable = False

# Custom Model
model = Sequential([
    vgg16,
    Flatten(),
    Dense(256, activation='relu'),
    Dropout(0.5),
    Dense(len(train_generator.class_indices), activation='softmax')
])

# Compile Model
model.compile(
    optimizer=Adam(learning_rate=0.0001),
    loss='categorical_crossentropy',
    metrics=['accuracy']
)

# ================================
# 🚀 Model Training
# ================================
history = model.fit(
    train_generator,
    epochs=EPOCHS,
    validation_data=test_generator
)

# Save Model
MODEL_PATH = os.path.abspath(os.path.join(os.path.dirname(__file__), "../models/hindi_character_model_vgg16.h5"))
model.save(MODEL_PATH)
#model.save("../models/hindi_character_model_vgg16.h5")
print("✅ Model Saved Successfully!")

# ================================
# 📊 Plot Accuracy and Loss
# ================================
plt.plot(history.history['accuracy'], label='Train Accuracy')
plt.plot(history.history['val_accuracy'], label='Validation Accuracy')
plt.title('Model Accuracy')
plt.ylabel('Accuracy')
plt.xlabel('Epoch')
plt.legend()
plt.savefig("training_accuracy_plot.png")
plt.close()

plt.plot(history.history['loss'], label='Train Loss')
plt.plot(history.history['val_loss'], label='Validation Loss')
plt.title('Model Loss')
plt.ylabel('Loss')
plt.xlabel('Epoch')
plt.legend()
plt.savefig("training_loss_plot.png")
plt.close()
