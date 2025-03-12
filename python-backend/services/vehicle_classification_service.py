import os
import numpy as np
import tensorflow as tf
from PIL import Image

print("Current working directory:", os.getcwd())


class VehicleClassificationService:
    def __init__(self):
        # Load the MobileNetV2 model for Toyota vehicle classification
        model_path = os.path.join(os.path.dirname(__file__), '..', 'models', 'mobilenetv2_toyota.keras')
        self.model_mobilenetv2 = tf.keras.models.load_model(model_path)

        print("MobileNetV2 model loaded successfully")

    def classify_vehicle(self, image_path):
        # Step 1: Predict vehicle type (e.g., Toyota_Tundra, Toyota_Tacoma, etc.)
        vehicle_type = self._predict_vehicle_type(image_path)

        return {
            'vehicle_type': vehicle_type
        }

    def _predict_vehicle_type(self, image_path):
        # Load the image
        image = Image.open(image_path)

        # Preprocess the image for MobileNetV2
        processed_image = self._preprocess_image_for_mobilenetv2(image)

        # Predict the vehicle type using MobileNetV2
        prediction = self.model_mobilenetv2.predict(processed_image)
        vehicle_class = np.argmax(prediction, axis=1)[0]

        # Define the vehicle classes
        vehicle_classes = [
            "Toyota_Tundra",  "Toyota_Tacoma","Toyota_Prius", "Toyota_Highlander"
        ]

        vehicle_type = vehicle_classes[vehicle_class]
        print(f"Vehicle Type Prediction: {vehicle_type}")
        return vehicle_type

    @staticmethod
    def _preprocess_image_for_mobilenetv2(image):
        # MobileNetV2 expects images in a specific size and range
        target_size = (224, 224)  # MobileNetV2 usually takes 224x224 images
        image = image.resize(target_size)
        image = np.array(image) / 255.0  # Normalize the image
        image = np.expand_dims(image, axis=0)  # Add batch dimension
        return image
