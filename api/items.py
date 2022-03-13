
from flask import Blueprint, abort, jsonify, request
from database import db, Item


itemsAPI = Blueprint('items', __name__)


@itemsAPI.route('/items', methods=['GET'])
def readItems():
    return jsonify([item.serialize() for item in Item.query.all()])


@itemsAPI.route('/items', methods=['POST'])
def createItem():
    content = request.get_json()
    if not 'name' in content or not 'flags' in content or not 'category' in content:
        return abort(400)

    newItem = Item(name=content['name'],
                   flags=content['flags'],
                   category=content['category'])
    db.session.add(newItem)
    db.session.commit()
    return jsonify(newItem.serialize())


@itemsAPI.route("/items/<uuid>", methods=['PUT'])
def updateItem(uuid):
    content = request.get_json()
    item = Item.query.get(uuid)

    if "name" in content:
        item.name = content['name']
    if "category" in content:
        item.category = content["category"]
    if "flags" in content:
        item.flags = content['flags']

    db.session.commit()
    return jsonify(item.serialize())


@itemsAPI.route("/items/<uuid>", methods=['DELETE'])
def deleteItem(uuid):
    item = Item.query.get(uuid)
    db.session.delete(item)
    db.session.commit()
    return jsonify({"deleted": True})
