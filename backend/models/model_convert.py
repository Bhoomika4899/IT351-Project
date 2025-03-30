import tensorflowjs as tfjs
import tensorflow as tf

# Load the .h5 model
model = tf.keras.models.load_model('hindi_character_model_vgg16.h5')

# Convert and save as TensorFlow.js format
tfjs.converters.save_keras_model(model, 'hindi_character_model_vgg16_js')
