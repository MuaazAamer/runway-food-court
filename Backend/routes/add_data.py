import sqlite3
from pathlib import Path

from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

router = APIRouter()

database = Path(__file__).resolve().parent.parent / "Database" / "runway-food-court.db"


class Category(BaseModel):
    name: str
    sort_order: int
    is_active: int

class Items(BaseModel):
    category_id: int
    code: str
    name: str
    track_stock: int
    is_active: int

class ItemPrice(BaseModel):
    item_id: int
    label: str
    price: float
    is_active: int

@router.post("/add_category/")
async def add_category(body: Category):
    if not body.name.strip():
        raise HTTPException(status_code=400, detail="missing required fields")

    insert_category = "INSERT INTO categories (name, sort_order, is_active) VALUES (?, ?, ?)"

    connection = sqlite3.connect(database)
    try:
        connection.execute("PRAGMA foreign_keys = ON")
        connection.execute(
            insert_category,
            (body.name, body.sort_order, body.is_active),
        )
        connection.commit()
    finally:
        connection.close()

    return {"message": "added category"}

@router.post("/add_items/")
async def add_items(body: Items):
    if not body.code.strip() or not body.name.strip():
        raise HTTPException(status_code=400, detail="missing required fields")

    insert_item = "INSERT INTO items (category_id, code, name, track_stock, is_active) VALUES (?, ?, ?, ?, ?)"

    connection = sqlite3.connect(database)
    try:
        connection.execute("PRAGMA foreign_keys = ON")
        connection.execute(insert_item, (body.category_id, body.code, body.name, body.track_stock, body.is_active))
        connection.commit()
    finally:
        connection.close()

    return {"message": "added item"}

@router.post("/add_item_price/")
async def add_item_price(body: ItemPrice):
    if not body.label.strip():
        raise HTTPException(status_code=400, detail="missing required fields")

    insert_item_price = "INSERT INTO item_price (item_id, label, price, is_active) VALUES (?, ?, ?, ?)"

    connection = sqlite3.connect(database)
    try:
        connection.execute("PRAGMA foreign_keys = ON")
        connection.execute(insert_item_price, (body.item_id, body.label, body.price, body.is_active))
        connection.commit()
    finally:
        connection.close()

    return {"message": "added item price"}