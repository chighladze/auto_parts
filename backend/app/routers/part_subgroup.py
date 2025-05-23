from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

from ..database import get_db
from ..models import part_subgroup as models
from ..schemas import part_subgroup as schemas

router = APIRouter()


@router.post("/", response_model=schemas.PartSubgroup)
def create_part_subgroup(
    part_subgroup: schemas.PartSubgroupCreate, db: Session = Depends(get_db)
):
    db_part_subgroup = models.PartSubgroup(**part_subgroup.dict())
    db.add(db_part_subgroup)
    db.commit()
    db.refresh(db_part_subgroup)
    return db_part_subgroup


@router.get("/", response_model=List[schemas.PartSubgroup])
def read_part_subgroups(
    skip: int = 0, limit: int = 100, group_id: int = None, db: Session = Depends(get_db)
):
    query = db.query(models.PartSubgroup)
    if group_id:
        query = query.filter(models.PartSubgroup.group_id == group_id)
    part_subgroups = query.offset(skip).limit(limit).all()
    return part_subgroups


@router.get("/{part_subgroup_id}", response_model=schemas.PartSubgroup)
def read_part_subgroup(part_subgroup_id: int, db: Session = Depends(get_db)):
    db_part_subgroup = (
        db.query(models.PartSubgroup)
        .filter(models.PartSubgroup.id == part_subgroup_id)
        .first()
    )
    if db_part_subgroup is None:
        raise HTTPException(status_code=404, detail="Part subgroup not found")
    return db_part_subgroup


@router.put("/{part_subgroup_id}", response_model=schemas.PartSubgroup)
def update_part_subgroup(
    part_subgroup_id: int,
    part_subgroup: schemas.PartSubgroupCreate,
    db: Session = Depends(get_db),
):
    db_part_subgroup = (
        db.query(models.PartSubgroup)
        .filter(models.PartSubgroup.id == part_subgroup_id)
        .first()
    )
    if db_part_subgroup is None:
        raise HTTPException(status_code=404, detail="Part subgroup not found")

    for key, value in part_subgroup.dict().items():
        setattr(db_part_subgroup, key, value)

    db.commit()
    db.refresh(db_part_subgroup)
    return db_part_subgroup


@router.delete("/{part_subgroup_id}")
def delete_part_subgroup(part_subgroup_id: int, db: Session = Depends(get_db)):
    db_part_subgroup = (
        db.query(models.PartSubgroup)
        .filter(models.PartSubgroup.id == part_subgroup_id)
        .first()
    )
    if db_part_subgroup is None:
        raise HTTPException(status_code=404, detail="Part subgroup not found")

    db.delete(db_part_subgroup)
    db.commit()
    return {"message": "Part subgroup deleted"}
