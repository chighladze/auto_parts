from sqlalchemy import Column, Integer, ForeignKey, Float, DateTime
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func

from ..database import Base


class Inventory(Base):
    __tablename__ = "inventory"

    id = Column(Integer, primary_key=True, index=True)
    section_id = Column(Integer, ForeignKey("sections.id"))
    part_id = Column(Integer, ForeignKey("parts.id"))
    quantity = Column(Integer, default=0)
    minimum_quantity = Column(Integer, default=0)
    maximum_quantity = Column(Integer, default=0)
    price = Column(Float, default=0.0)
    created_at = Column(DateTime(timezone=True), default=func.now())
    updated_at = Column(
        DateTime(timezone=True), default=func.now(), onupdate=func.now()
    )
    last_modified_by_user_id = Column(Integer, ForeignKey("users.id"))

    section = relationship("Section", back_populates="inventory")
    part = relationship("Part", back_populates="inventory")
    last_modified_by = relationship("User", foreign_keys=[last_modified_by_user_id])
