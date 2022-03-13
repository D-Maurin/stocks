from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.dialects.postgresql import UUID, JSON
import uuid

db = SQLAlchemy()


class ItemCategory(db.Model):
    __tablename__ = "item_categories"

    id = db.Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    name = db.Column(db.String())
    color = db.Column(db.String())

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "color": self.color,
        }


class Item(db.Model):
    __tablename__ = "items"

    id = db.Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    category = db.Column(db.String())
    name = db.Column(db.String())
    flags = db.Column(JSON)

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "flags": self.flags,
            "category": self.category
        }
