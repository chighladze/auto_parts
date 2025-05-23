from pydantic import BaseModel
from typing import Optional


class PartBase(BaseModel):
    name: str
    article_number: str
    barcode: Optional[str] = None
    qr_code: Optional[str] = None
    text_identifier: Optional[str] = None
    unit: Optional[str] = None
    full_name: Optional[str] = None
    note: Optional[str] = None
    size: Optional[str] = None
    original_code: Optional[str] = None
    brand_id: Optional[int] = None
    subgroup_id: Optional[int] = None
    car_id: Optional[int] = None


class PartCreate(PartBase):
    pass


class PartUpdate(BaseModel):
    name: Optional[str] = None
    article_number: Optional[str] = None
    barcode: Optional[str] = None
    qr_code: Optional[str] = None
    text_identifier: Optional[str] = None
    unit: Optional[str] = None
    full_name: Optional[str] = None
    note: Optional[str] = None
    size: Optional[str] = None
    original_code: Optional[str] = None
    brand_id: Optional[int] = None
    subgroup_id: Optional[int] = None
    car_id: Optional[int] = None


class PartInventory(BaseModel):
    quantity: int = 0
    price: float = 0.0

    class Config:
        from_attributes = True


class Part(PartBase):
    id: int
    inventory: Optional[list[PartInventory]] = []

    class Config:
        from_attributes = True

    @property
    def total_quantity(self) -> int:
        return sum(inv.quantity for inv in self.inventory) if self.inventory else 0

    @property
    def average_price(self) -> float:
        quantities = [inv.quantity for inv in self.inventory if inv.quantity > 0]
        prices = [inv.price for inv in self.inventory if inv.quantity > 0]
        if not quantities or not prices:
            return 0.0
        return sum(q * p for q, p in zip(quantities, prices)) / sum(quantities)
