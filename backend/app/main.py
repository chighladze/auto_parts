from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .database import engine, Base

# Import all models to ensure they are registered with SQLAlchemy
from .models import *
from .routers import (
    warehouse,
    section,
    part,
    inventory,
    auth,
    brand,
    part_group,
    part_subgroup,
    car,
)

# Create all database tables
Base.metadata.create_all(bind=engine)

# Initialize FastAPI application
app = FastAPI(title="Auto Parts Warehouse API")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:8082",
        "http://127.0.0.1:8082",
        "http://localhost:3000",
        "http://127.0.0.1:3000",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Connect routers
app.include_router(auth.router, prefix="/api/auth", tags=["Authentication"])

app.include_router(warehouse.router, prefix="/api/warehouses", tags=["Warehouses"])

app.include_router(section.router, prefix="/api/sections", tags=["Sections"])

app.include_router(brand.router, prefix="/api/brands", tags=["Brands"])

app.include_router(part_group.router, prefix="/api/part-groups", tags=["Part Groups"])

app.include_router(
    part_subgroup.router, prefix="/api/part-subgroups", tags=["Part Subgroups"]
)

app.include_router(car.router, prefix="/api/cars", tags=["Cars"])

app.include_router(part.router, prefix="/api/parts", tags=["Parts"])

app.include_router(inventory.router, prefix="/api/inventory", tags=["Inventory"])


@app.get("/")
def read_root():
    return {"message": "Auto Parts API"}
