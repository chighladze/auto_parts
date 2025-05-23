from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship

from ..database import Base

class Warehouse(Base):
    __tablename__ = "warehouses"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    location = Column(String)

    sections = relationship("Section", back_populates="warehouse")