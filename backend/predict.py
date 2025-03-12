import torch
from torchvision import transforms
from PIL import Image
import sys
import json

# Load YOLOv8 model
try:
    model_yolo = torch.load('best.pt', weights_only=False)
    print("YOLOv8 model loaded successfully")
except Exception as e:
    print(f"Error loading YOLOv8 model: {e}")
    sys.exit(1)

def preprocess_image_for_yolo(image):
    transform = transforms.Compose([
        transforms.Resize((640, 640)),
        transforms.ToTensor(),
    ])
    return transform(image).unsqueeze(0)

def predict_repairability(image_path):
    image = Image.open(image_path)
    print('Preprocessing image...')
    processed_image = preprocess_image_for_yolo(image)
    print('Predicting repairability...')
    results = model_yolo(processed_image)
    print('Predictions:', results.pandas().xyxy[0].to_dict('records'))
    repairable = any(obj['confidence'] > 0.5 for obj in results.pandas().xyxy[0].to_dict('records'))
    return 'Repairable' if repairable else 'Unrepairable'

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python predict.py <image_path>")
        sys.exit(1)

    image_path = sys.argv[1]
    repairability = predict_repairability(image_path)

    result = {
        "repairability": repairability
    }

    print(json.dumps(result))
