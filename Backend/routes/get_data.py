import sqlite3
from pathlib import Path

from fastapi import APIRouter, HTTPException

router = APIRouter()

database = Path(__file__).resolve().parent.parent / "Database" / "runway-food-court.db"

@router.get("/items/")
async def get_categories():
    select_categories = "SELECT * FROM items"
    connection = sqlite3.connect(database)
    try:
        connection.execute("PRAGMA foreign_keys = ON")
        cursor = connection.execute(select_categories)
        categories = cursor.fetchall()
        if not categories:
            raise HTTPException(status_code=404, detail="nothing found")
        return categories
    finally:
        connection.close()
