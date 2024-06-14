from datetime import timedelta
from enum import Enum
from typing import Optional
from pydantic import BaseModel, condecimal


class Level(str, Enum):
    BEGINNER = "Начинающий"
    INTERMEDIATE = "Средний"
    ADVANCED = "Продвинутый"

class Specialization(str, Enum):
    IT = "ИТ"
    BANKING = "Банк и Финансы"
    LAW = "Закон"


class JobCreateSchema(BaseModel):
    title: str
    company: int
    details: str
    duration: timedelta
    level: Level
    price: condecimal(max_digits=10, decimal_places=2)
    specialization: Specialization


class PartnerCreateSchema(BaseModel):
    name: str


class JobGetSchema(BaseModel):
    job_id: int
    image_filename: Optional[str]
    title: str
    details: str
    duration: timedelta
    level: str
    price: float
    company_name: str
    specialization: str

    class Config:
        from_attributes = True