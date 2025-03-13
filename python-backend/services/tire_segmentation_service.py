import os
import numpy as np
import tensorflow as tf
from PIL import Image

print("Current working directory:", os.getcwd())


class TireSegmentationService:
    def __init__(self):
        # Load the U-Net model for tire segmentation
        model_path = os.path.join(os.path.dirname(__file__), '..', 'models', 'resnet50_tire_condition.h5')
        self.model_unet = tf.keras.models.load_model(model_path)

        # Debug: Print model input shape
        print("Model Input Shape:", self.model_unet.input_shape)

        print("U-Net model loaded successfully")

    def segment_tire(self, image_path):
        # Step 1: Predict tire segmentation (e.g., tire damage or tire area)
        tire_segmentation = self._predict_tire_segmentation(image_path)

        return {
            'tire_segmentation': tire_segmentation
        }

    def _predict_tire_segmentation(self, image_path):
        # Load the image
        image = Image.open(image_path)

        # Preprocess the image for U-Net model
        processed_image = self._preprocess_image_for_unet(image)

        # Predict the tire segmentation using U-Net
        prediction = self.model_unet.predict(processed_image)

        # The U-Net output is usually a mask; we process it as per the specific model output
        mask = prediction[0]  # Assuming the output is a single mask (for binary segmentation)

        # Post-process the mask (e.g., thresholding, converting to a readable format)
        mask = (mask > 0.5).astype(np.uint8)  # Example: binary mask thresholding

        print(f"Tire Segmentation Mask: {mask.shape}")
        return mask

    @staticmethod
    def _preprocess_image_for_unet(image):
        # Debug: Print original image size
        print(f"Original Image Size: {image.size}")

        # Resize the image to the expected input size of the model (224x224)
        target_size = (224, 224)
        image = image.resize(target_size)

        # Debug: Print resized image size
        print(f"Resized Image Size: {image.size}")

        # Convert the image to RGB if it's not already
        if image.mode != 'RGB':
            image = image.convert('RGB')

        # Normalize the image and add batch dimension
        image = np.array(image) / 255.0  # Normalize to [0, 1]
        image = np.expand_dims(image, axis=0)  # Add batch dimension (shape becomes [1, 224, 224, 3])

        # Debug: Print final image shape
        print(f"Final Image Shape: {image.shape}")
        return image