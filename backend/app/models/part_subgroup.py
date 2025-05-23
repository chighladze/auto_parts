from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship

from ..database import Base


class PartSubgroup(Base):
    __tablename__ = "part_subgroups"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    group_id = Column(Integer, ForeignKey("part_groups.id"), nullable=False)

    group = relationship("PartGroup", back_populates="subgroups")
    parts = relationship("Part", back_populates="subgroup")
