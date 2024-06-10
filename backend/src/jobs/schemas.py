from datetime import timedelta
from enum import Enum
from typing import Optional
from pydantic import BaseModel, condecimal


class Level(str, Enum):
    BEGINNER = "Начинающий"
    INTERMEDIATE = "Средний"
    ADVANCED = "Продвинутый"


class JobCreateSchema(BaseModel):
    title: str
    company: str
    details: str
    duration: timedelta
    level: Level
    price: condecimal(max_digits=10, decimal_places=2)


class PartnerCreateSchema(BaseModel):
    name: str