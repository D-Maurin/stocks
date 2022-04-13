from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_cors import CORS
import os
from database import Item, db
from api.items import itemsAPI
from api.item_categories import itemCategoriesAPI
from api.models import modelsAPI
from api.equipments import equipmentsAPI

database_url = os.getenv('DATABASE_URL')
if database_url and database_url.startswith("postgres://"):
    database_url = database_url.replace("postgres://", "postgresql://", 1)

app = Flask(__name__,
            static_folder='ui/build')
CORS(app)
app.config['SQLALCHEMY_DATABASE_URI'] = database_url
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db.init_app(app)
migrate = Migrate(app, db)

app.register_blueprint(itemsAPI, url_prefix='/api')
app.register_blueprint(itemCategoriesAPI, url_prefix='/api')
app.register_blueprint(modelsAPI, url_prefix='/api')
app.register_blueprint(equipmentsAPI, url_prefix="/api")


@app.route('/<path:path>')
def static_file(path):
    return app.send_static_file(path)


@app.errorhandler(404)
def not_found(e):
    return app.send_static_file('index.html')
