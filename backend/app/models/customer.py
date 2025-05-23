from sqlalchemy import (
    Column,
    Integer,
    String,
    DateTime,
    ForeignKey,
)
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func

from ..database import Base


class Customer(Base):
    __tablename__ = "customers"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=True)  # Имя может быть не указано
    phone = Column(String)  # Телефон для связи, если нужно
    created_at = Column(DateTime(timezone=True), default=func.now())
    created_by_user_id = Column(Integer, ForeignKey("users.id"))

    # Basic relationships
    created_by = relationship("User", foreign_keys=[created_by_user_id])


# Relationships will be added by other models using backref
# sales_orders = relationship("SalesOrder", backref="customer")
# return_requests = relationship("ReturnRequest", backref="customer")
