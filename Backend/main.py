from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from routes.add_data import router as add_router
from routes.get_data import router as get_router
from routes.login import router as login_router

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(add_router)
app.include_router(get_router)
app.include_router(login_router)
