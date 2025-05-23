from pydantic import BaseModel
from typing import Optional

class SectionBase(BaseModel):
    code: str
    warehouse_id: int

class SectionCreate(SectionBase):
    pass

class Section(SectionBase):
    id: int

    class Config:
        orm_mode = True