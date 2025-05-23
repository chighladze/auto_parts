from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

from ..database import get_db
from ..models import part_group as models
from ..schemas import part_group as schemas

router = APIRouter()


@router.post("/", response_model=schemas.PartGroup)
def create_part_group(
    part_group: schemas.PartGroupCreate, db: Session = Depends(get_db)
):
    db_part_group = models.PartGroup(**part_group.dict())
    db.add(db_part_group)
    db.commit()
    db.refresh(db_part_group)
    return db_part_group


@router.get("/", response_model=List[schemas.PartGroup])
def read_part_groups(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    part_groups = db.query(models.PartGroup).offset(skip).limit(limit).all()
    return part_groups


@router.get("/{part_group_id}", response_model=schemas.PartGroup)
def read_part_group(part_group_id: int, db: Session = Depends(get_db)):
    db_part_group = (
        db.query(models.PartGroup).filter(models.PartGroup.id == part_group_id).first()
    )
    if db_part_group is None:
        raise HTTPException(status_code=404, detail="Part group not found")
    return db_part_group


@router.put("/{part_group_id}", response_model=schemas.PartGroup)
def update_part_group(
    part_group_id: int,
    part_group: schemas.PartGroupCreate,
    db: Session = Depends(get_db),
):
    db_part_group = (
        db.query(models.PartGroup).filter(models.PartGroup.id == part_group_id).first()
    )
    if db_part_group is None:
        raise HTTPException(status_code=404, detail="Part group not found")

    for key, value in part_group.dict().items():
        setattr(db_part_group, key, value)

    db.commit()
    db.refresh(db_part_group)
    return db_part_group


@router.delete("/{part_group_id}")
def delete_part_group(part_group_id: int, db: Session = Depends(get_db)):
    db_part_group = (
        db.query(models.PartGroup).filter(models.PartGroup.id == part_group_id).first()
    )
    if db_part_group is None:
        raise HTTPException(status_code=404, detail="Part group not found")

    db.delete(db_part_group)
    db.commit()
    return {"message": "Part group deleted"}
