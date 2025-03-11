from flask import Flask
from flask_cors import CORS
from controllers.damage_detection_controller import damage_detection
from controllers.tire_quality_controller import tire_quality
from controllers.market_prediction_controller import market_prediction

app = Flask(__name__)
CORS(app, resources={r'/*': {'origins': '*'}})


app.register_blueprint(damage_detection, url_prefix='/damage_detection')
app.register_blueprint(tire_quality)
app.register_blueprint(market_prediction)


if __name__ == '__main__':
    app.run(debug=True, host="0.0.0.0", port=5000)
