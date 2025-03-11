from flask import Blueprint, request, jsonify
from werkzeug.utils import secure_filename
import os
from services import DamageDetectionService

# Initialize Damage Detection service
damage_detection_service = DamageDetectionService()

# Blueprint for handling damage detection
damage_detection = Blueprint('damage_detection', __name__)

# Allowed file extensions for uploads
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif'}
UPLOAD_FOLDER = '/../uploads'


# Helper function to check allowed file extensions
def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


# Route for uploading damage detection images
@damage_detection.route('/upload', methods=['POST'])
def upload_damage_image():
    if 'image' not in request.files:
        return jsonify({"error": "No file uploaded"}), 400

    image = request.files['image']

    # Check if file is valid and allowed
    if image and allowed_file(image.filename):
        # Secure the filename and save the image
        filename = secure_filename(image.filename)
        folder_path = os.path.join(UPLOAD_FOLDER, '../uploads/damages')

        # Ensure the folder exists
        if not os.path.exists(folder_path):
            os.makedirs(folder_path)

        # Save the image to the designated folder
        image_path = os.path.join(folder_path, filename)
        image.save(image_path)

        # Use the DamageDetectionService to predict damage type and repairability
        repairability = damage_detection_service.predict_damage_and_repairability(image_path)

        # Return the results
        return jsonify({
            "damage_type": repairability['damage_type'],
            "repairability": repairability['repairability']
        })

    else:
        return jsonify({"error": "Invalid file format. Only PNG, JPG, JPEG, and GIF are allowed."}), 400
