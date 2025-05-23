from sqlalchemy import (
    Column,
    Integer,
    String,
    ForeignKey,
    DateTime,
    Boolean,
    Float,
)
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func

from ..database import Base


class Part(Base):
    __tablename__ = "parts"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    article_number = Column(String, unique=True, index=True)
    barcode = Column(String, unique=True, index=True)
    qr_code = Column(String, unique=True, index=True, nullable=True)
    text_identifier = Column(String, unique=True, index=True, nullable=True)
    unit = Column(String)
    full_name = Column(String)
    note = Column(String)
    size = Column(String)
    original_code = Column(String)
    created_at = Column(DateTime(timezone=True), default=func.now())
    updated_at = Column(
        DateTime(timezone=True), default=func.now(), onupdate=func.now()
    )
    is_active = Column(Boolean, default=True)
    selling_price = Column(Float, nullable=True)
    purchase_price = Column(Float, nullable=True)

    # Foreign keys
    brand_id = Column(Integer, ForeignKey("brands.id"))
    subgroup_id = Column(Integer, ForeignKey("part_subgroups.id"))
    car_id = Column(Integer, ForeignKey("cars.id"))
    created_by_user_id = Column(Integer, ForeignKey("users.id"))
    updated_by_user_id = Column(Integer, ForeignKey("users.id"))

    # Relationships
    inventory = relationship("Inventory", back_populates="part")
    brand = relationship("Brand", back_populates="parts")
    subgroup = relationship("PartSubgroup", back_populates="parts")
    car = relationship("Car", back_populates="parts")
    created_by = relationship("User", foreign_keys=[created_by_user_id])
    updated_by = relationship("User", foreign_keys=[updated_by_user_id])
