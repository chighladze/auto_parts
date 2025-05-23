from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List, Optional

from ..database import get_db
from ..models import section as models
from ..schemas import section as schemas

router = APIRouter(tags=["sections"])


@router.post("/", response_model=schemas.Section)
def create_section(section: schemas.SectionCreate, db: Session = Depends(get_db)):
    db_section = models.Section(**section.dict())
    db.add(db_section)
    db.commit()
    db.refresh(db_section)
    return db_section


@router.get("/", response_model=List[schemas.Section])
def read_sections(
    warehouse_id: int = None,
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_db),
):
    query = db.query(models.Section)
    if warehouse_id:
        query = query.filter(models.Section.warehouse_id == warehouse_id)
    sections = query.offset(skip).limit(limit).all()
    return sections


@router.get("/{section_id}", response_model=schemas.Section)
def read_section(section_id: int, db: Session = Depends(get_db)):
    section = db.query(models.Section).filter(models.Section.id == section_id).first()
    if section is None:
        raise HTTPException(status_code=404, detail="Section not found")
    return section


@router.put("/{section_id}", response_model=schemas.Section)
def update_section(
    section_id: int, section: schemas.SectionCreate, db: Session = Depends(get_db)
):
    db_section = (
        db.query(models.Section).filter(models.Section.id == section_id).first()
    )
    if db_section is None:
        raise HTTPException(status_code=404, detail="Section not found")

    for key, value in section.dict().items():
        setattr(db_section, key, value)

    db.commit()
    db.refresh(db_section)
    return db_section


@router.delete("/{section_id}")
def delete_section(section_id: int, db: Session = Depends(get_db)):
    db_section = (
        db.query(models.Section).filter(models.Section.id == section_id).first()
    )
    if db_section is None:
        raise HTTPException(status_code=404, detail="Section not found")

    db.delete(db_section)
    db.commit()
    return {"message": "Section deleted"}
