from pydantic import BaseModel, EmailStr, Field
from typing import Optional
from datetime import datetime


# Base User schema with common attributes
class UserBase(BaseModel):
    email: EmailStr
    full_name: str


# Schema for creating a new user
class UserCreate(UserBase):
    password: str


# Schema for updating a user
class UserUpdate(BaseModel):
    email: Optional[EmailStr] = None
    full_name: Optional[str] = None
    password: Optional[str] = None
    is_admin: Optional[bool] = None
    is_active: Optional[bool] = None


# Schema for returning user information (without password)
class User(UserBase):
    id: int
    is_admin: bool
    is_active: bool
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True  # Обновленный параметр вместо orm_mode


# Login schema
class Token(BaseModel):
    access_token: str
    token_type: str


class TokenData(BaseModel):
    email: Optional[str] = None


class LoginForm(BaseModel):
    email: EmailStr
    password: str
