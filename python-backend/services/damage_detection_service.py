import os
import numpy as np
import tensorflow as tf
from PIL import Image
from torchvision import transforms
from ultralytics import YOLO


print("Current working directory:", os.getcwd())



class DamageDetectionService:
    def __init__(self):
        # Load the YOLOv8 model
        model_path = os.path.join(os.path.dirname(__file__), '..', 'models', 'best.pt')
        self.model_yolo = YOLO(model_path)

        # Load the EfficientNetV2 model
        self.efficientnet_model = tf.keras.models.load_model(os.path.join(os.path.dirname(__file__), '..', 'models', 'EfficientNetV2_DamageDetection.keras'))

        print("Models loaded successfully")

    def predict_damage_and_repairability(self, image_path):
        # Step 1: Predict damage type (Dent or Scratch)
        damage_type = self._predict_damage_type(image_path)

        # Step 2: Predict repairability using YOLOv8 model
        repairability = self._predict_repairability(image_path)

        return {
            'damage_type': damage_type,
            'repairability': repairability
        }

    def _predict_damage_type(self, image_path):
        # Load the image
        image = Image.open(image_path)

        # Preprocess the image for EfficientNetV2
        processed_image = self._preprocess_image_for_efficientnet(image)

        # Predict damage type (dent or scratch)
        prediction = self.efficientnet_model.predict(processed_image)
        damage_type = 'Dent' if prediction[0][0] > 0.5 else 'Scratch'
        print(f"Damage Type Prediction: {damage_type}")
        return damage_type

    def _predict_repairability(self, image_path):
        # Load the image
        image = Image.open(image_path)

        # Preprocess the image for YOLOv8 model
        processed_image = self._preprocess_image_for_yolo(image)

        # Predict repairability using YOLOv8 model
        results = self.model_yolo(processed_image)
        result = results[0]
        boxes = result.boxes
        print('Repairability Predictions:', boxes)

        # Determine if the damage is repairable based on the confidence score
        repairable = any(box.conf[0] > 0.5 for box in boxes)
        return 'Repairable' if repairable else 'Unrepairable'

    @staticmethod
    def _preprocess_image_for_yolo(image):
        transform = transforms.Compose([
            transforms.Resize((640, 640)),
            transforms.ToTensor(),
        ])
        return transform(image).unsqueeze(0)

    @staticmethod
    def _preprocess_image_for_efficientnet(image):
        # EfficientNet expects images in a specific size and range
        target_size = (224, 224)  # EfficientNetV2 usually takes 224x224 images
        image = image.resize(target_size)
        image = np.array(image) / 255.0  # Normalize the image
        image = np.expand_dims(image, axis=0)  # Add batch dimension
        return image
