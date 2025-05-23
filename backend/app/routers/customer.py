from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List, Optional
from sqlalchemy import or_

from ..database import get_db
from ..models.customer import Customer as CustomerModel
from ..schemas.customer import Customer, CustomerCreate, CustomerUpdate
from ..services.auth import get_current_active_user, get_admin_user
from ..models.user import User

router = APIRouter(prefix="/customers", tags=["customers"])


@router.post("/", response_model=Customer)
def create_customer(
    customer: CustomerCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user),
):
    db_customer = CustomerModel(**customer.dict())
    db_customer.created_by_user_id = current_user.id
    db_customer.updated_by_user_id = current_user.id

    db.add(db_customer)
    db.commit()
    db.refresh(db_customer)
    return db_customer


@router.get("/", response_model=List[Customer])
def read_customers(
    skip: int = 0,
    limit: int = 100,
    search: Optional[str] = None,
    db: Session = Depends(get_db),
    _: User = Depends(get_current_active_user),
):
    query = db.query(CustomerModel)

    if search:
        query = query.filter(
            or_(
                CustomerModel.name.ilike(f"%{search}%"),
                CustomerModel.email.ilike(f"%{search}%"),
                CustomerModel.phone.ilike(f"%{search}%"),
                CustomerModel.company_name.ilike(f"%{search}%"),
            )
        )

    customers = query.offset(skip).limit(limit).all()
    return customers


@router.get("/{customer_id}", response_model=Customer)
def read_customer(
    customer_id: int,
    db: Session = Depends(get_db),
    _: User = Depends(get_current_active_user),
):
    customer = db.query(CustomerModel).filter(CustomerModel.id == customer_id).first()
    if customer is None:
        raise HTTPException(status_code=404, detail="Customer not found")
    return customer


@router.put("/{customer_id}", response_model=Customer)
def update_customer(
    customer_id: int,
    customer: CustomerUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user),
):
    db_customer = (
        db.query(CustomerModel).filter(CustomerModel.id == customer_id).first()
    )
    if db_customer is None:
        raise HTTPException(status_code=404, detail="Customer not found")

    update_data = customer.dict(exclude_unset=True)
    update_data["updated_by_user_id"] = current_user.id

    for key, value in update_data.items():
        setattr(db_customer, key, value)

    db.commit()
    db.refresh(db_customer)
    return db_customer


@router.delete("/{customer_id}")
def delete_customer(
    customer_id: int,
    db: Session = Depends(get_db),
    _: User = Depends(get_admin_user),
):
    customer = db.query(CustomerModel).filter(CustomerModel.id == customer_id).first()
    if customer is None:
        raise HTTPException(status_code=404, detail="Customer not found")

    db.delete(customer)
    db.commit()
    return {"message": "Customer deleted"}
