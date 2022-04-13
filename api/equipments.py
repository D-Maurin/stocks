
from flask import Blueprint, abort, jsonify, request
from database import db, Equipment


equipmentsAPI = Blueprint('equipments', __name__)


@equipmentsAPI.route('/equipments', methods=['GET'])
def readEquipments():
    return jsonify([equipment.serialize() for equipment in Equipment.query.all()])


@equipmentsAPI.route('/equipments', methods=['POST'])
def createEquipment():
    content = request.get_json()
    if not 'name' in content or not 'content' in content:
        return abort(400)

    newEquipment = Equipment(name=content['name'],
                             content=content['content'])
    db.session.add(newEquipment)
    db.session.commit()
    return jsonify(newEquipment.serialize())


@equipmentsAPI.route("/equipments/<uuid>", methods=['PUT'])
def updateEquipment(uuid):
    content = request.get_json()
    equipment = Equipment.query.get(uuid)

    if "name" in content:
        equipment.name = content['name']
    if "content" in content:
        equipment.content = content["content"]

    db.session.commit()
    return jsonify(equipment.serialize())


@equipmentsAPI.route("/equipments/<uuid>", methods=['DELETE'])
def deleteEquipment(uuid):
    equipment = Equipment.query.get(uuid)
    db.session.delete(equipment)
    db.session.commit()
    return jsonify({"deleted": True})
