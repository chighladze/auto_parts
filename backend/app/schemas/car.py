from pydantic import BaseModel
from typing import Optional


class CarBase(BaseModel):
    make: str
    engine_info: Optional[str] = None


class CarCreate(CarBase):
    pass


class Car(CarBase):
    id: int

    class Config:
        from_attributes = True
