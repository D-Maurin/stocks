
from flask import Blueprint, abort, jsonify, request
from database import ItemCategory, db, Item


itemCategoriesAPI = Blueprint('item_categories', __name__)


@itemCategoriesAPI.route('/item_categories', methods=['GET'])
def readItems():
    return jsonify([cat.serialize() for cat in ItemCategory.query.all()])


@itemCategoriesAPI.route('/item_categories', methods=['POST'])
def createItem():
    content = request.get_json()
    if not 'name' in content or not "color" in content:
        return abort(404)

    newCategory = ItemCategory(name=content['name'], color=content['color'])
    db.session.add(newCategory)
    db.session.commit()
    return jsonify(newCategory.serialize())


@itemCategoriesAPI.route("/item_categories/<uuid>", methods=['PUT'])
def updateItem(uuid):
    content = request.get_json()
    category = ItemCategory.query.get(uuid)

    if "name" in content:
        category.name = content['name']
    if "color" in content:
        category.color = content["color"]

    db.session.commit()
    return jsonify(category.serialize())


@itemCategoriesAPI.route("/item_categories/<uuid>", methods=['DELETE'])
def deleteItem(uuid):
    category = ItemCategory.query.get(uuid)
    db.session.delete(category)
    db.session.commit()
    return jsonify({"deleted": True})
