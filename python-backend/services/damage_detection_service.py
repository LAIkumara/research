from torchvision import transforms
from PIL import Image
from ultralytics import YOLO


class DamageDetectionService:
    def __init__(self):
        self.model_yolo = YOLO('best.pt')

    def predict_repairability(self, image_path):
        image = Image.open(image_path)

        print('Preprocessing image...')
        processed_image = self._preprocess_image_for_yolo(image)

        print('Predicting repairability...')
        results = self.model_yolo(processed_image)
        result = results[0]
        boxes = result.boxes
        print('Predictions:', boxes)

        repairable = any(box.conf[0] > 0.5 for box in boxes)
        return 'Repairable' if repairable else 'Unrepairable'

    @staticmethod
    def _preprocess_image_for_yolo(image):
        transform = transforms.Compose([
            transforms.Resize((640, 640)),
            transforms.ToTensor(),
        ])
        return transform(image).unsqueeze(0)