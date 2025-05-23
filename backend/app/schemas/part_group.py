from pydantic import BaseModel


class PartGroupBase(BaseModel):
    name: str


class PartGroupCreate(PartGroupBase):
    pass


class PartGroup(PartGroupBase):
    id: int

    class Config:
        from_attributes = True
