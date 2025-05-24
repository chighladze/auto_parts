from pydantic import BaseModel
from typing import Optional


class InventoryBase(BaseModel):
    section_id: int
    part_id: int
    quantity: int
    price: Optional[float] = 0.0


class InventoryCreate(InventoryBase):
    pass


class Inventory(InventoryBase):
    id: int

    class Config:
        from_attributes = True
