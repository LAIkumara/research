from flask import Blueprint, request, jsonify
from werkzeug.utils import secure_filename
import os

UPLOAD_FOLDER = 'uploads'

# Check if the file extension is allowed
def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in {'png', 'jpg', 'jpeg', 'gif'}

market_prediction = Blueprint('market_prediction', __name__)

@market_prediction.route('/market_prediction/upload', methods=['POST'])
def upload_market_image():
    if 'image' not in request.files:
        return jsonify({"error": "No file uploaded"}), 400

    image = request.files['image']

    if image and allowed_file(image.filename):
        filename = secure_filename(image.filename)
        folder_path = os.path.join(UPLOAD_FOLDER, 'cars')

        if not os.path.exists(folder_path):
            os.makedirs(folder_path)

        image_path = os.path.join(folder_path, filename)
        image.save(image_path)

        return jsonify({
            "message": "File uploaded successfully!",
            "filePath": f'http://localhost:5000/uploads/cars/{filename}'
        })
    else:
        return jsonify({"error": "Invalid file format"}), 400
