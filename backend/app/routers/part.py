from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session, joinedload
from typing import List, Optional
from sqlalchemy import or_

from ..database import get_db
from ..models import part as models
from ..schemas import part as schemas

router = APIRouter()  # Remove tags and prefix to match other routers


@router.post("/", response_model=schemas.Part)
def create_part(part: schemas.PartCreate, db: Session = Depends(get_db)):
    # Check for duplicates before creating
    for field in ["barcode", "article_number", "qr_code", "text_identifier"]:
        value = getattr(part, field, None)
        if value:
            existing = (
                db.query(models.Part)
                .filter(getattr(models.Part, field) == value)
                .first()
            )
            if existing:
                raise HTTPException(
                    status_code=400,
                    detail=f"Part with this {field.replace('_', ' ')} already exists",
                )

    try:
        # Convert empty strings to None for unique nullable fields
        part_dict = part.dict()
        for field in ["barcode", "qr_code", "text_identifier"]:
            if field in part_dict and not part_dict[field]:
                part_dict[field] = None

        db_part = models.Part(**part_dict)
        db.add(db_part)
        db.commit()
        db.refresh(db_part)
        return db_part
    except Exception as e:
        db.rollback()
        if "UNIQUE constraint failed" in str(e):
            field = str(e).split(".")[-1]
            raise HTTPException(
                status_code=400,
                detail=f"Part with this {field.replace('_', ' ')} already exists",
            )
        raise


@router.get("/", response_model=List[schemas.Part])
def read_parts(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    parts = (
        db.query(models.Part)
        .options(joinedload(models.Part.inventory))
        .offset(skip)
        .limit(limit)
        .all()
    )
    return parts


@router.get("/search/", response_model=Optional[schemas.Part])
def search_part(query: str, db: Session = Depends(get_db)):
    """
    Поиск запчастей по штрихкоду, QR-коду, артикулу или текстовому идентификатору
    """
    part = (
        db.query(models.Part)
        .filter(
            or_(
                models.Part.barcode == query,
                models.Part.qr_code == query,
                models.Part.article_number == query,
                models.Part.text_identifier == query,
                models.Part.name.contains(query),
            )
        )
        .first()
    )

    if part is None:
        return None

    return part


@router.get("/{part_id}", response_model=schemas.Part)
def read_part(part_id: int, db: Session = Depends(get_db)):
    part = (
        db.query(models.Part)
        .options(joinedload(models.Part.inventory))
        .filter(models.Part.id == part_id)
        .first()
    )
    if part is None:
        raise HTTPException(status_code=404, detail="Part not found")
    return part


@router.get("/barcode/{barcode}", response_model=schemas.Part)
def read_part_by_barcode(barcode: str, db: Session = Depends(get_db)):
    part = (
        db.query(models.Part)
        .options(joinedload(models.Part.inventory))
        .filter(models.Part.barcode == barcode)
        .first()
    )
    if part is None:
        raise HTTPException(status_code=404, detail="Part not found")
    return part


@router.get("/qr-code/{qr_code}", response_model=schemas.Part)
def read_part_by_qr_code(qr_code: str, db: Session = Depends(get_db)):
    part = db.query(models.Part).filter(models.Part.qr_code == qr_code).first()
    if part is None:
        raise HTTPException(status_code=404, detail="Part not found")
    return part


@router.put("/{part_id}", response_model=schemas.Part)
def update_part(
    part_id: int, part_update: schemas.PartUpdate, db: Session = Depends(get_db)
):
    db_part = db.query(models.Part).filter(models.Part.id == part_id).first()

    if db_part is None:
        raise HTTPException(status_code=404, detail="Part not found")

    # Check for duplicates before updating
    for field in ["barcode", "article_number", "qr_code", "text_identifier"]:
        value = getattr(part_update, field, None)
        if value:
            existing = (
                db.query(models.Part)
                .filter(getattr(models.Part, field) == value, models.Part.id != part_id)
                .first()
            )
            if existing:
                raise HTTPException(
                    status_code=400,
                    detail=f"Part with this {field.replace('_', ' ')} already exists",
                )

    try:
        for key, value in part_update.dict(exclude_unset=True).items():
            if value == "":  # Convert empty strings to None for optional fields
                value = None
            setattr(db_part, key, value)

        db.commit()
        db.refresh(db_part)
        return db_part
    except Exception as e:
        db.rollback()
        if "UNIQUE constraint failed" in str(e):
            field = str(e).split(".")[-1]
            raise HTTPException(
                status_code=400,
                detail=f"Part with this {field.replace('_', ' ')} already exists",
            )
        raise


@router.delete("/{part_id}")
def delete_part(part_id: int, db: Session = Depends(get_db)):
    db_part = db.query(models.Part).filter(models.Part.id == part_id).first()

    if db_part is None:
        raise HTTPException(status_code=404, detail="Part not found")

    db.delete(db_part)
    db.commit()
    return {"message": "Part deleted"}
