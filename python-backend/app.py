from flask import Flask
from flask_cors import CORS
from controllers.damage_detection_controller import damage_detection
from controllers.tire_segmentation_controller import tire_segmentation
from controllers.vehicle_classification_controller import vehicle_classification

app = Flask(__name__)
CORS(app, resources={r'/*': {'origins': '*'}})

@app.route('/')
def hello():
    return "Hello, World!"

app.register_blueprint(damage_detection, url_prefix='/damage_detection')
app.register_blueprint(tire_segmentation, url_prefix='/tire_segmentation')
app.register_blueprint(vehicle_classification, url_prefix='/vehicle_classification')


if __name__ == '__main__':
    app.run(debug=True, host="0.0.0.0", port=5000)
