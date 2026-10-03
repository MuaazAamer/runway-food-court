import sqlite3
from pathlib import Path

from fastapi import FastAPI, HTTPException
from pydantic import BaseModel

app = FastAPI()

database = Path(__file__).resolve().parent.parent / "Database" / "runway-food-court.db"


class Category(BaseModel):
    name: str
    sort_order: int
    is_active: int

@app.post("/add_category/")
async def add_category(body: Category):
    if not body.name or not body.sort_order or not body.is_active:
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
