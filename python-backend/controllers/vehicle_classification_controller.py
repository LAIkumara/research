from flask import Blueprint, request, jsonify
from werkzeug.utils import secure_filename
import os
from services import VehicleClassificationService

# Initialize Vehicle Classification service
vehicle_classification_service = VehicleClassificationService()

# Blueprint for handling vehicle classification
vehicle_classification = Blueprint('vehicle_classification', __name__)

# Allowed file extensions for uploads
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif'}
UPLOAD_FOLDER = '/../uploads'


# Helper function to check allowed file extensions
def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


# Route for uploading vehicle classification images
@vehicle_classification.route('/upload', methods=['POST'])
def upload_vehicle_image():
    if 'image' not in request.files:
        return jsonify({"error": "No file uploaded"}), 400

    image = request.files['image']

    # Check if file is valid and allowed
    if image and allowed_file(image.filename):
        # Secure the filename and save the image
        filename = secure_filename(image.filename)
        folder_path = os.path.join(UPLOAD_FOLDER, '../uploads/vehicles')

        # Ensure the folder exists
        if not os.path.exists(folder_path):
            os.makedirs(folder_path)

        # Save the image to the designated folder
        image_path = os.path.join(folder_path, filename)
        image.save(image_path)

        # Use the VehicleClassificationService to predict vehicle type
        vehicle_classification_result = vehicle_classification_service.classify_vehicle(image_path)

        # Return the result
        return jsonify({
            "vehicle_type": vehicle_classification_result['vehicle_type']
        })

    else:
        return jsonify({"error": "Invalid file format. Only PNG, JPG, JPEG, and GIF are allowed."}), 400
