from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List, Optional
from pydantic import BaseModel

from ..database import get_db
from ..models import inventory as models
from ..schemas import inventory as schemas

router = APIRouter(prefix="/inventory", tags=["inventory"])


# Создаем специальную схему для обновления только количества
class QuantityUpdate(BaseModel):
    quantity: int


@router.post("/", response_model=schemas.Inventory)
def create_inventory(inventory: schemas.InventoryCreate, db: Session = Depends(get_db)):
    db_inventory = models.Inventory(**inventory.dict())
    db.add(db_inventory)
    db.commit()
    db.refresh(db_inventory)
    return db_inventory


@router.get("/", response_model=List[schemas.Inventory])
def read_inventory(
    section_id: Optional[int] = None,
    part_id: Optional[int] = None,
    threshold: Optional[int] = None,
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_db),
):
    query = db.query(models.Inventory)

    if section_id:
        query = query.filter(models.Inventory.section_id == section_id)
    if part_id:
        query = query.filter(models.Inventory.part_id == part_id)
    if threshold is not None:
        query = query.filter(models.Inventory.quantity < threshold)

    inventory = query.offset(skip).limit(limit).all()
    return inventory


@router.get("/{inventory_id}", response_model=schemas.Inventory)
def read_inventory_item(inventory_id: int, db: Session = Depends(get_db)):
    inventory = (
        db.query(models.Inventory).filter(models.Inventory.id == inventory_id).first()
    )
    if inventory is None:
        raise HTTPException(status_code=404, detail="Inventory item not found")
    return inventory


@router.put("/{inventory_id}", response_model=schemas.Inventory)
def update_inventory(
    inventory_id: int, inventory: schemas.InventoryCreate, db: Session = Depends(get_db)
):
    db_inventory = (
        db.query(models.Inventory).filter(models.Inventory.id == inventory_id).first()
    )
    if db_inventory is None:
        raise HTTPException(status_code=404, detail="Inventory item not found")

    for key, value in inventory.dict().items():
        setattr(db_inventory, key, value)

    db.commit()
    db.refresh(db_inventory)
    return db_inventory


@router.put("/{inventory_id}/quantity", response_model=schemas.Inventory)
def update_quantity(
    inventory_id: int, quantity_update: QuantityUpdate, db: Session = Depends(get_db)
):
    """
    Быстрое обновление только количества товара в инвентаре
    """
    db_inventory = (
        db.query(models.Inventory).filter(models.Inventory.id == inventory_id).first()
    )
    if db_inventory is None:
        raise HTTPException(status_code=404, detail="Inventory item not found")

    db_inventory.quantity = quantity_update.quantity

    db.commit()
    db.refresh(db_inventory)
    return db_inventory


@router.delete("/{inventory_id}")
def delete_inventory(inventory_id: int, db: Session = Depends(get_db)):
    db_inventory = (
        db.query(models.Inventory).filter(models.Inventory.id == inventory_id).first()
    )
    if db_inventory is None:
        raise HTTPException(status_code=404, detail="Inventory item not found")

    db.delete(db_inventory)
    db.commit()
    return {"message": "Inventory item deleted"}
