from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

from ..database import get_db
from ..models import warehouse as models
from ..models import section as section_models
from ..schemas import warehouse as schemas
from ..schemas import section as section_schemas

router = APIRouter()  # Убираем префикс, так как он уже указан в main.py


@router.post("/", response_model=schemas.Warehouse)
def create_warehouse(warehouse: schemas.WarehouseCreate, db: Session = Depends(get_db)):
    db_warehouse = models.Warehouse(**warehouse.dict())
    db.add(db_warehouse)
    db.commit()
    db.refresh(db_warehouse)
    return db_warehouse


@router.get("/", response_model=List[schemas.Warehouse])
def read_warehouses(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    warehouses = db.query(models.Warehouse).offset(skip).limit(limit).all()
    return warehouses


@router.get("/{warehouse_id}", response_model=schemas.Warehouse)
def read_warehouse(warehouse_id: int, db: Session = Depends(get_db)):
    warehouse = (
        db.query(models.Warehouse).filter(models.Warehouse.id == warehouse_id).first()
    )
    if warehouse is None:
        raise HTTPException(status_code=404, detail="Warehouse not found")
    return warehouse


@router.get("/{warehouse_id}/sections", response_model=List[section_schemas.Section])
def read_warehouse_sections(warehouse_id: int, db: Session = Depends(get_db)):
    """
    Получить все секции, относящиеся к конкретному складу
    """
    # Проверяем, существует ли склад
    warehouse = (
        db.query(models.Warehouse).filter(models.Warehouse.id == warehouse_id).first()
    )
    if warehouse is None:
        raise HTTPException(status_code=404, detail="Warehouse not found")

    # Получаем все секции этого склада
    sections = (
        db.query(section_models.Section)
        .filter(section_models.Section.warehouse_id == warehouse_id)
        .all()
    )

    return sections


@router.put("/{warehouse_id}", response_model=schemas.Warehouse)
def update_warehouse(
    warehouse_id: int, warehouse: schemas.WarehouseCreate, db: Session = Depends(get_db)
):
    db_warehouse = (
        db.query(models.Warehouse).filter(models.Warehouse.id == warehouse_id).first()
    )
    if db_warehouse is None:
        raise HTTPException(status_code=404, detail="Warehouse not found")

    for key, value in warehouse.dict().items():
        setattr(db_warehouse, key, value)

    db.commit()
    db.refresh(db_warehouse)
    return db_warehouse


@router.delete("/{warehouse_id}")
def delete_warehouse(warehouse_id: int, db: Session = Depends(get_db)):
    db_warehouse = (
        db.query(models.Warehouse).filter(models.Warehouse.id == warehouse_id).first()
    )
    if db_warehouse is None:
        raise HTTPException(status_code=404, detail="Warehouse not found")

    db.delete(db_warehouse)
    db.commit()
    return {"message": "Warehouse deleted"}
