from pydantic import BaseModel


class PartSubgroupBase(BaseModel):
    name: str
    group_id: int


class PartSubgroupCreate(PartSubgroupBase):
    pass


class PartSubgroup(PartSubgroupBase):
    id: int

    class Config:
        from_attributes = True
