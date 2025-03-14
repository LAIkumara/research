from flask import Blueprint, request, jsonify
from werkzeug.utils import secure_filename
import os
from services import TireSegmentationService

# Initialize Tire Segmentation service
tire_segmentation_service = TireSegmentationService()

# Blueprint for handling tire segmentation
tire_segmentation = Blueprint('tire_segmentation', __name__)

# Allowed file extensions for uploads
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif'}
UPLOAD_FOLDER = '/../uploads'


# Helper function to check allowed file extensions
def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


# Route for uploading tire segmentation images
@tire_segmentation.route('/upload', methods=['POST'])
def upload_tire_image():
    if 'image' not in request.files:
        return jsonify({"error": "No file uploaded"}), 400

    image = request.files['image']

    # Check if file is valid and allowed
    if image and allowed_file(image.filename):
        # Secure the filename and save the image
        filename = secure_filename(image.filename)
        folder_path = os.path.join(UPLOAD_FOLDER, '../uploads/tires')

        # Ensure the folder exists
        if not os.path.exists(folder_path):
            os.makedirs(folder_path)

        # Save the image to the designated folder
        image_path = os.path.join(folder_path, filename)
        image.save(image_path)

        # Use the TireSegmentationService to predict the tire segmentation
        tire_segmentation_result = tire_segmentation_service.segment_tire(image_path)

        # Debug: Print the structure of tire_segmentation_result
        print("Tire Segmentation Result:", type(tire_segmentation_result), tire_segmentation_result)

        # Ensure the result is a dictionary and contains the expected key
        if isinstance(tire_segmentation_result, dict) and 'tire_segmentation' in tire_segmentation_result:
            # Return the results
            return jsonify({
                "tire_segmentation": tire_segmentation_result['tire_segmentation'].tolist()  # Convert numpy array to list
            })
        else:
            return jsonify({"error": "Unexpected result format from segmentation service"}), 500

    else:
        return jsonify({"error": "Invalid file format. Only PNG, JPG, JPEG, and GIF are allowed."}), 400