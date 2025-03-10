from flask import Blueprint, request, jsonify
from werkzeug.utils import secure_filename
import os
from services import DamageDetectionService

damage_detection_service = DamageDetectionService()

damage_detection = Blueprint('damage_detection', __name__)

ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif'}
UPLOAD_FOLDER = 'uploads'

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@damage_detection.route('/damage_detection/upload', methods=['POST'])
def upload_damage_image():
    if 'image' not in request.files:
        return jsonify({"error": "No file uploaded"}), 400

    image = request.files['image']

    if image and allowed_file(image.filename):
        filename = secure_filename(image.filename)
        folder_path = os.path.join(UPLOAD_FOLDER, 'damages')

        if not os.path.exists(folder_path):
            os.makedirs(folder_path)

        image_path = os.path.join(folder_path, filename)
        image.save(image_path)

        repairability = damage_detection_service.predict_repairability(image_path)
        return jsonify({"repairability": repairability})
    else:
        return jsonify({"error": "Invalid file format"}), 400
