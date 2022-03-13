
from flask import Blueprint, abort, jsonify, request
from database import db, Model


modelsAPI = Blueprint('models', __name__)


@modelsAPI.route('/models', methods=['GET'])
def readModels():
    return jsonify([model.serialize() for model in Model.query.all()])


@modelsAPI.route('/models', methods=['POST'])
def createModel():
    content = request.get_json()
    if not 'name' in content or not 'content' in content:
        return abort(400)

    newModel = Model(name=content['name'],
                     content=content['content'])
    db.session.add(newModel)
    db.session.commit()
    return jsonify(newModel.serialize())


@modelsAPI.route("/models/<uuid>", methods=['PUT'])
def updateModel(uuid):
    content = request.get_json()
    model = Model.query.get(uuid)

    if "name" in content:
        model.name = content['name']
    if "content" in content:
        model.content = content["content"]

    db.session.commit()
    return jsonify(model.serialize())


@modelsAPI.route("/models/<uuid>", methods=['DELETE'])
def deleteModel(uuid):
    model = Model.query.get(uuid)
    db.session.delete(model)
    db.session.commit()
    return jsonify({"deleted": True})
