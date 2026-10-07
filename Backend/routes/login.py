import sqlite3
from pathlib import Path

from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

router = APIRouter()

database = Path(__file__).resolve().parent.parent / "Database" / "runway-food-court.db"


class Login(BaseModel):
    username: str
    password: str


@router.post("/login/")
async def login(body: Login):
    if not body.username.strip() or not body.password:
        raise HTTPException(status_code=400, detail="missing required fields")

    connection = sqlite3.connect(database)
    try:
        connection.execute("PRAGMA foreign_keys = ON")
        row = connection.execute(
            "SELECT username FROM credentials WHERE username = ? AND password = ?",
            (body.username.strip(), body.password),
        ).fetchone()
    finally:
        connection.close()

    if row is None:
        raise HTTPException(status_code=401, detail="invalid username or password")

    username = row[0]
    if username == "admin":
        role = "admin"
    elif username == "user":
        role = "user"
    else:
        raise HTTPException(status_code=403, detail="no panel for this account")

    return {"username": username, "role": role}
