from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship

from ..database import Base


class PartGroup(Base):
    __tablename__ = "part_groups"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, unique=True, nullable=False)

    subgroups = relationship("PartSubgroup", back_populates="group")
