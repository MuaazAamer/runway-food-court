import sqlite3
from pathlib import Path

database = Path(__file__).resolve().parent / "runway-food-court.db"
create_categories = """
CREATE TABLE IF NOT EXISTS categories (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL,
    sort_order INTEGER NOT NULL,
    is_active INTEGER NOT NULL
);
"""
create_items = """
CREATE TABLE IF NOT EXISTS items (
    id INTEGER PRIMARY KEY,
    category_id INTEGER NOT NULL,
    code TEXT NOT NULL UNIQUE,
    name TEXT NOT NULL,
    track_stock INTEGER NOT NULL,4
    is_active INTEGER NOT NULL,
    FOREIGN KEY (category_id) REFERENCES categories (id)
);
"""
create_item_variants = """
CREATE TABLE IF NOT EXISTS item_variants (
    id INTEGER PRIMARY KEY,
    item_id INTEGER NOT NULL,
    label TEXT NOT NULL,
    price INTEGER NOT NULL,
    is_active INTEGER NOT NULL,
    FOREIGN KEY (item_id) REFERENCES items (id)
);
"""

connection = sqlite3.connect(database)
try:
    connection.execute("PRAGMA foreign_keys = ON")
    connection.execute(create_categories)
    connection.execute(create_items)
    connection.execute(create_item_variants)
    connection.commit()
finally:
    connection.close()
